import React from "react";
import { Outlet } from "react-router-dom";
import WalletBar from "../components/WalletBar";


const VerticalLayout = () => {
  return (
    <div>
      <WalletBar/>
      <main style={{marginLeft:'260px'}}>
        <div style={{ minHeight:'100vh', padding:'30px'}}>
          <Outlet/>
        </div>
      </main>
    </div>
  );
};

export default VerticalLayout;
