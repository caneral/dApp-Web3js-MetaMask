import React from "react";

const WalletButton = ({walletFunc, title, className}) => {
  return (
    <button className={className} onClick={walletFunc}>
      {title}
    </button>
  );
};

export default WalletButton;
