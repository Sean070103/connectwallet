import { useState } from "react";

export default function Home() {
  const [walletAddress, setWalletAddress] = useState("");
  const [balance, setBalance] = useState("");

  const connectMetaMask = async () => {
    if (!window.ethereum) {
      alert("MetaMask is not installed!");
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];
      setWalletAddress(account);

      // Fetch the wallet balance
      const balanceInWei = await window.ethereum.request({
        method: "eth_getBalance",
        params: [account, "latest"],
      });
      const balanceInEth = parseFloat(balanceInWei) / 10 ** 18; // Convert from Wei to Ether
      setBalance(balanceInEth.toFixed(4)); // Display up to 4 decimal places
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Connect with MetaMask</h1>
      <button
        onClick={connectMetaMask}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          borderRadius: "5px",
          background: "#f6851b",
          color: "#fff",
          border: "none",
        }}
      >
        Connect with MetaMask
      </button>
      {walletAddress && (
        <div style={{ marginTop: "20px" }}>
          <p>Wallet Address: {walletAddress}</p>
          <p>Balance: {balance} ETH</p>
        </div>
      )}
    </div>
  );
}
