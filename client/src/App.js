import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [apiResponse, setApiResponse] = useState("");

  const callAPI = () => {
    fetch("http://localhost:9000/testAPI")
      .then((res) => res.text())
      .then((res) => setApiResponse(res));
  };

  useEffect(() => {
    callAPI();
  }, []);

  return (
    <div className="App">
      <p>Api response: {apiResponse}</p>
    </div>
  );
}

export default App;
