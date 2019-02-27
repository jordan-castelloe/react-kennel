import React, { Component } from "react";
import "./Kennel.css";
import NavBar from "./Nav/NavBar"
import ApplicationViews from "./ApplicationViews"

export default class Kennel extends Component {
  render() {
    return (
      <div className="kennel">
        <React.Fragment>
          <NavBar />
          <ApplicationViews />
        </React.Fragment>
      </div>
    );
  }
}
