import React, { useState } from "react";
import "./App.css";

function App() {
  const [txid, setTxid] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");

    try {
      const response = await fetch("http://91.98.42.229:3000/api/rebroadcast", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ txid }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus(`Success: ${data.message}`);
      } else {
        setStatus(`Error: ${data.message}`);
      }
    } catch (error) {
      setStatus("Network error. Please try again.");
    }
  };

  return (
    <div className="App">
      <h1>The Bit Bumper</h1>
      <p>Welcome! Accelerate your Bitcoin transactions with our multi-node rebroadcasting tool.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={txid}
          onChange={(e) => setTxid(e.target.value)}
          placeholder="Enter TXID"
          required
        />
        <button type="submit">Accelerate</button>
      </form>
      <p>{status}</p>
    </div>
  );
}

export default App;
