import React, { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";

const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "#4A90E2", // Bright blue color
  color: "#FFFFFF", // White text
  borderRadius: "5px", // Slightly rounded corners
  border: "none", // No border
  cursor: "pointer", // Pointer cursor
  fontSize: "16px", // Font size
  outline: "none", // No outline
  margin: "10px",
};

export default function Connect() {
  const { address, isConnecting, isDisconnected } = useAccount();
  const [account, setAccount] = useState(address)
  const navigate = useNavigate();

  const uploadClick = (address) => {
    navigate(`/user/${address}}`);
  };

  const accessClick = (address) => {
    console.log(`the address is ${address}`)
    navigate(`/access/${address}`);
  };

  return (
    <center
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div>
        <ConnectButton />
      </div>
      <div style={{ marginTop: "20px" }}>
        <button style={buttonStyle} onClick={() => uploadClick(account)}>
          Upload
        </button>
        <button style={buttonStyle} onClick={() => accessClick(account)}>
          Access
        </button>
      </div>
    </center>
  );
}
