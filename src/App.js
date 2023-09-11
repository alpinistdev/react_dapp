import logo from "./logo.svg";
import "./App.css";
import { ethers } from "ethers";
import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";
import Token from "./artifacts/contracts/Token.sol/Token.json";
import { useState } from "react";

function App() {
  const [greet, setGreet] = useState();
  const [address, setAddress] = useState();
  const [amount, setAmount] = useState();
  async function fetchGreeting() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        process.env.REACT_APP_GREETER_ADDRESS,
        Greeter.abi,
        provider
      );
      try {
        const data = await contract.greet();
        setGreet(data);
        console.log("data ", data);
      } catch (e) {
        console.log(e);
      }
    }
  }

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function setGreeting() {
    if (!greet) return;
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        process.env.REACT_APP_GREETER_ADDRESS,
        Greeter.abi,
        signer
      );
      const transaction = await contract.setGreeting(greet);
      await transaction.wait();
      fetchGreeting();
    }
  }

  async function fetchAmount() {
    if (typeof window.ethereum !== "undefined") {
      const [account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("account", account);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        process.env.REACT_APP_TOKEN_ADDRESS,
        Token.abi,
        provider
      );
      try {
        const data = await contract.balanceOf(account);
        setAmount(data.toString());
        console.log("data ", data.toString());
      } catch (e) {
        console.log(e);
      }
    }
  }

  async function sendAmount() {
    if (!amount) return;
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        process.env.REACT_APP_TOKEN_ADDRESS,
        Token.abi,
        signer
      );
      const transaction = await contract.transfer(address, amount);
      await transaction.wait();
      fetchAmount();
    }
  }
  return (
    <div className="App">
      <div>
        <h1>{greet}</h1>
        <button onClick={fetchGreeting}>Greet!</button>
      </div>
      <div>
        <input
          type="text"
          name="txt_greeting"
          onChange={(e) => setGreet(e.target.value)}
        />
        <button onClick={setGreeting}>Set Greeting</button>
      </div>

      <div>
        <h1>{amount}</h1>
        <button onClick={fetchAmount}>Get Token Amount</button>
      </div>

      <div>
        <input
          type="text"
          name="txt_address"
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="text"
          name="txt_amount"
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={sendAmount}>Send Token</button>
      </div>
    </div>
  );
}

export default App;
