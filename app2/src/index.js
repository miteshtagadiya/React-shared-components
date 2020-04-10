import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Dashboard from "./Components/Dashboard";

class App extends Component {
  componentWillMount() {
    var head = document.head;
    var link = document.createElement("link");

    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = `${process.env.REACT_APP_SHARED_UI_URL}/index.css`;

    head.appendChild(link);
  }

  render() {
    return <Dashboard />;
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
