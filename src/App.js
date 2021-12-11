import "./App.css";
import React, { useState } from "react";
function App() {
  const [transcript, setTranscript] = useState("");

  const handleChange = (e) => {
    setTranscript(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(transcript);
  };
  return (
    <div className="App">
      <h1>AWS POLLY</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Transcript:
          <textarea type="text" value={transcript} onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default App;
