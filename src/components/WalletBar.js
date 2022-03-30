import React, { useState, useEffect } from "react";
import Web3 from "web3";
import WalletButton from "./WalletButton";
import { useNavigate } from "react-router-dom";

const WalletBar = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  let navigate = useNavigate();

  const checkBalance = (userData) => {
    if (parseFloat(userData.balance) === 0) {
      navigate(userData.account, { state: userData });
    } else {
        navigate("profile", {state: userData})
    }
  };

  useEffect(() => {
    const checkConnectedWallet = () => {
      const userData = JSON.parse(localStorage.getItem("userAccount"));
      if (userData != null) {
        setUserInfo(userData);
        setIsConnected(true);
      }
    };
    checkConnectedWallet();
  }, []);

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

  const saveUserInfo = (ethBalance, account, chainId) => {
    const userAccount = {
      account: account,
      balance: ethBalance,
      connectionid: chainId,
    };
    window.localStorage.setItem("userAccount", JSON.stringify(userAccount)); //user persisted data
    const userData = JSON.parse(localStorage.getItem("userAccount"));
    setUserInfo(userData);
    setIsConnected(true);
    checkBalance(userData);
  };

  const connect = async () => {
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
        const chainId = await web3.eth.getChainId();
        const account = userAccount[0];
        let ethBalance = await web3.eth.getBalance(account);
        ethBalance = web3.utils.fromWei(ethBalance, "ether"); //Convert balance to wei
        saveUserInfo(ethBalance, account, chainId);
        if (userAccount.length === 0) {
          console.log("Please connect to meta mask");
        }
      }
    } catch (error) {
      console.log(
        "There was an error fetching your accounts. Make sure your Ethereum client is configured correctly."
      );
    }
  };

  const onDisconnect = () => {
    window.localStorage.removeItem("userAccount");
    setUserInfo({});
    setIsConnected(false);
    navigate("/");
  };

  return (
    <div className="app">
      {!isConnected && (
        <WalletButton
          walletFunc={connect}
          title={"Connect to Wallet"}
          className={"app-buttons__login"}
        />
      )}
      {isConnected && (
        <div>
          {/* <div className="app-details">
            <h2>✅ You are connected to metamask.</h2>
            <div className="app-account">
              <span>Account number:</span> <br/>
              {userInfo.account}
            </div>
            <div className="app-balance">
              <span>Balance:</span>
              {userInfo.balance}
            </div>
            <div className="app-connectionid">
              <span>Connection ID:</span>
              {userInfo.connectionid}
            </div>
          </div> */}
          <WalletButton
            walletFunc={onDisconnect}
            title={"Disconnect"}
            className={"app-buttons__logout"}
          />
        </div>
      )}
    </div>
  );
};

export default WalletBar;
