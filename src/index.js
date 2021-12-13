/*global CustomElement*/
import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
// import "./custom-element-v2.css";
import App from "./App";
if (process.env.NODE_ENV === "production") {
  CustomElement.init((element, _context) => {
    const data = element.value ? JSON.parse(element.value) : null;

    ReactDOM.render(
      <App
        context={_context}
        data={data}
        config={element.config}
        disabled={element.disabled}
        customElement={CustomElement}
      />,
      document.getElementById("root")
    );
  });
  // CustomElement.setHeight(350);
} else {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );
}
