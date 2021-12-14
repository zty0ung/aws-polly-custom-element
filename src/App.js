import "./App.css";
import React, { useState, useEffect } from "react";
import "./custom-element-v2.css";
import axios from "axios";
function App(props) {
  const [transcript, setTranscript] = useState(props?.data?.transcript || "");
  const [s3Url, setS3Url] = useState(
    props?.data?.s3Url ||
      "https://kochnewsaudio.s3.amazonaws.com/Why%20clemency%20reform%20is%20next%20for%20criminal%20justice-1639507449675.mp3"
  );
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
    if (transcript.length > 0) {
      axios
        .post("https://aws-polly-backend.herokuapp.com/azure", {
          transcript: transcript,
          title: `${title}-${Date.now()}`,
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
    } else {
      alert("Please enter a transcript");
    }
  };
  return (
    <div className="App">
      <div className="preview">
        <p className="u-spacing-l action-large p-white">Preview</p>
        <audio controls src={s3Url ? s3Url : null}></audio>
      </div>

      <div className="url">
        <p className="u-spacing-l action-large p-white">URL</p>
        <div className="content-item-element__content p-grey">{s3Url}</div>
      </div>

      <form onSubmit={handleSubmit}>
        <p className="u-spacing-l action-large">Transcript</p>
        <textarea
          type="text"
          value={transcript}
          onChange={handleChange}
          disabled={props?.disabled ? props.disabled : false}
        />
        <input
          className="btn btn--primary"
          disabled={transcript.length > 0 ? false : true}
          type="submit"
          value="Convert"
        />
      </form>
    </div>
  );
}

export default App;
