import React, { useState, useEffect } from "react";
import "./Profile.css";
import Web3 from "web3";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  let navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({});
  const [signatures, setSignatures] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userAccount"));
    setUserInfo(userData)
    if(userData === null){
      navigate('/')
    }
  },[])

  const detectProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    } else {
      window.alert(
        "MetaMask could not be detected! Please install MetaMask and refresh page."
      );
      if (window.confirm("Click OK to go to the Metamask download page.")) {
        window.open("https://metamask.io/download/", "_blank");
      }
    }
    return provider;
  };

  const signMessage = async ({ setError, message }) => {
    try {
      const provider = detectProvider();
      if (provider) {
        if (provider !== window.ethereum) {
          console.log(
            "Non-Ethereum browser detected. You should consider trying MetaMask!"
          );
        }
        await provider.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(provider);
        const userAccount = await web3.eth.getAccounts();
        const account = userAccount[0];
        await web3.eth.personal.sign(message, account)

        return {
          message,
          address: account,
        };
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSign = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setError();
    const sig = await signMessage({
      setError,
      message: data.get("username"),
    });
    if (sig) {
      setSignatures([...signatures, sig]);
    }
  };

  return (
    <div>
      <h1>Profile</h1>
      <form onSubmit={handleSign}>
        <div className="row">
          <div className="form-group">
            <div className="col-2">
              <p>Username:</p>
            </div>
            <div className="col-10">
              <input
                type={"text"}
                name="username"
                className="custombutton"
                placeholder="Please type your username"
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="form-group">
            <div className="col-2">
              <p>Wallet Address:</p>
            </div>
            <div className="col-10">
              <input
                type={"text"}
                name="wallet"
                className="custombutton"
                placeholder="Please type your wallet address"
                defaultValue={userInfo?.account}
                disabled={true}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <input className="custombutton" type="submit" value="Save" />
        </div>
      </form>
      {signatures.map((sig, idx) => {
        return (
          <div className="p-2" key={sig}>
            <div className="my-3">
              <p>
                Message {idx + 1}: {sig.message}
              </p>
              <p>Signer: {sig.address}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Profile;
