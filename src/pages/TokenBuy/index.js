import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

const TokenBuy = () => {
  let navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userAccount"));
    setUserInfo(userData)
    if(userData === null){
      navigate('/')
    }
  },[])

  return (
    <div>
      <h1>Buy Token Page</h1>
      <div>
        <p>Your Balance: {userInfo?.balance}</p>
      </div>
      <div>
        Your Wallet Address: {userInfo?.account}
      </div>
    </div>
  )
}

export default TokenBuy;