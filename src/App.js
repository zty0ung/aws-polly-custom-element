import "./App.css";
import React, { useState } from "react";
import axios from "axios";
function App(props) {
  console.log(props);
  const [transcript, setTranscript] = useState("");

  const handleChange = (e) => {
    setTranscript(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(transcript);
    axios
      .post("https://aws-polly-backend.herokuapp.com/", {
        transcript: transcript,
        title: transcript.split(" ")[0],
      })
      .then((res) => {
        console.log(res);
        console.log(res.data.data);
      })

      .catch((err) => console.log(err));
  };
  return (
    <div className="App">
      <h1>AWS POLLY</h1>
      <h2>URL: {s3Url}</h2>
      {s3Url && <audio controls src={s3Url}></audio>}
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
