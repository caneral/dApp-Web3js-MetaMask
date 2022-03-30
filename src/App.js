import React from "react";
import Web3 from "web3";
import { Web3ReactProvider } from "@web3-react/core";
import Router from "./router/Router";

const getLibrary = (provider) => {
  return new Web3(provider);
};

const App = () => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <div style={{backgroundColor:'#f8f8f8'}}>
        <Router />
      </div>
    </Web3ReactProvider>
  );
};

export default App;
