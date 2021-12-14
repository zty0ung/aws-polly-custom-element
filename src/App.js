import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
function App(props) {
  const [transcript, setTranscript] = useState("");
  const [s3Url, setS3Url] = useState(props?.data?.s3Url || null);
  const [title, setTitle] = useState;
  useEffect(() => {
    props.customElement.getElementValue("title", (value) => {
      setTitle(value);
    });
  });
  const handleChange = (e) => {
    setTranscript(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(transcript);
    axios
      .post("https://aws-polly-backend.herokuapp.com/azure", {
        transcript: transcript,
        title: title,
      })
      .then((res) => {
        console.log(res);
        setS3Url(res.data.Location);
        console.log(res.data.Location);
        props.customElement.setValue(
          JSON.stringify({
            s3Url: res.data.Location,
            transcript: transcript,
          })
        );
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
