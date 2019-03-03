import React, { Component } from "react";
import { Redirect, withRouter} from "react-router-dom";
import "./Kennel.css";
import NavBar from "./Nav/NavBar";
import ApplicationViews from "./ApplicationViews";
import APIManager from "../modules/APIManager";

class Kennel extends Component {
  state = {
    searchResults: {}
  };
  handleSearch = (searchTerm) => {
    const populatedSearchResults = {};
    APIManager.searchCollection(searchTerm, "owners")
      .then(owners => {
        populatedSearchResults.owners = owners;
        return APIManager.searchCollection(searchTerm, "animals");
      })
      .then(animals => {
        populatedSearchResults.animals = animals;
        return APIManager.searchCollection(searchTerm, "locations");
      })
      .then(locations => {
        populatedSearchResults.locations = locations;
        return APIManager.searchCollection(searchTerm, "employees");
      })
      .then(employees => {
        populatedSearchResults.employees = employees;
        this.setState({ searchResults: populatedSearchResults });
        this.props.history.push("/search")
      });
  };
  render() {
    return (
      <div className="kennel">
        <React.Fragment>
          <NavBar handleSearch={this.handleSearch} />
          <ApplicationViews searchResults={this.state.searchResults} />
        </React.Fragment>
      </div>
    );
  }
}

export default withRouter(Kennel);