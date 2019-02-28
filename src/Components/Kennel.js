import React, { Component } from "react";
import "./Kennel.css";
import NavBar from "./Nav/NavBar"
import ApplicationViews from "./ApplicationViews"

export default class Kennel extends Component {
  state = {
    searchTerm: ""
  };

  handleSearchKeyPress = event => {
    if (event.key === "Enter") {
      this.setState({ searchTerm: event.target.value });
    }
}
  render() {
    return (
      <div className="kennel">
        <React.Fragment>
          <NavBar handleSearch={this.handleSearchKeyPress} />
          <ApplicationViews searchTerm={this.state.searchTerm}/>
        </React.Fragment>
      </div>
    );
  }
}
