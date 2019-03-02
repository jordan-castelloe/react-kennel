import { Route } from "react-router-dom";
import React, { Component } from "react";
import AnimalList from "./Animals/AnimalList";
import AnimalDetail from "./Animals/AnimalDetail";
import AnimalForm from "./Animals/AnimalForm";
import LocationList from "./Locations/LocationList";
import EmployeeList from "./Employees/EmployeeList";
import EmployeeDetail from "./Employees/EmployeeDetail";
import Ownerlist from "./Owners/OwnerList";
import SearchResults from "./SearchResults/SearchResults";
import APIManager from "../modules/APIManager";

class ApplicationViews extends Component {
  state = {
    employees: [],
    locations: [],
    animals: [],
    owners: []
  };

  componentDidMount() {
    const newState = {};
    APIManager.getAll("animals")
      .then(animals => {
        newState.animals = animals;
        return APIManager.getAll("owners");
      })
      .then(owners => {
        newState.owners = owners;
        return APIManager.getAll("employees");
      })
      .then(employees => {
        newState.employees = employees;
        return APIManager.getAll("owners");
      })
      .then(locations => {
        newState.locations = locations;
        this.setState(newState);
      });
  }

  deleteAndList = (id, collection) => {
    const newState = this.state;
    APIManager.deleteAndList(id, collection).then(data => {
      newState[collection] = data;
      this.setState(newState);
    });
  };

  postAndList = (id, collection) => {
    const newState = this.state;
    APIManager.postAndList(id, collection).then(data => {
      newState[collection] = data;
      this.setState(newState);
    });
  }

  render() {
    return (
      <div className="app-views">
        <Route
          exact
          path="/"
          render={props => {
            return <LocationList locations={this.state.locations} />;
          }}
        />
        <Route
          exact
          path="/animals"
          render={props => {
            return (
              <AnimalList
                {...props}
                deleteAndList={this.deleteAndList}
                animals={this.state.animals}
              />
            );
          }}
        />
        <Route
          path="/animals/new"
          render={props => {
            return (
              <AnimalForm
                {...props}
                postAndList={this.postAndList}
                employees={this.state.employees}
              />
            );
          }}
        />
        <Route
          exact
          path="/employees"
          render={props => {
            return (
              <EmployeeList
                employees={this.state.employees}
                deleteAndList={this.deleteAndList}
              />
            );
          }}
        />
        <Route
          path="/owners"
          render={props => {
            return (
              <Ownerlist
                owners={this.state.owners}
                deleteAndList={this.deleteAndList}
              />
            );
          }}
        />
        <Route
          path="/searchResults"
          render={props => {
            return <SearchResults searchTerm={props} />;
          }}
        />
        <Route
          path="/animals/:animalId(\d+)"
          render={props => {
            return (
              <AnimalDetail
                {...props}
                deleteAndList={this.deleteAndList}
                animals={this.state.animals}
              />
            );
          }}
        />
        <Route
          path="/employees/:employeeId(\d+)"
          render={props => {
            return (
              <EmployeeDetail
                {...props}
                deleteAndList={this.deleteAndList}
                employees={this.state.employees}
              />
            );
          }}
        />
      </div>
    );
  }
}

export default ApplicationViews;
