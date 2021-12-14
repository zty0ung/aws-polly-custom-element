import "./App.css";
import React, { useState, useEffect } from "react";
import "./custom-element-v2.css";
import axios from "axios";
function App(props) {
  const [transcript, setTranscript] = useState("");
  const [s3Url, setS3Url] = useState(props?.data?.s3Url || null);
  const [title, setTitle] = useState(null);
  useEffect(() => {
    props?.customElement?.getElementValue("title", (value) => {
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
      <p class="u-spacing-l action-large">URL: </p>
      <div
        class="content-item-element__content"
        style={{ display: "inline-block" }}
      >
        {s3Url}
      </div>

      {s3Url && <audio controls src={s3Url}></audio>}
      <form onSubmit={handleSubmit}>
        <p class="u-spacing-l action-large">Transcript</p>
        <textarea type="text" value={transcript} onChange={handleChange} />
        <input class="btn btn--tertiary" type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default App;
