import { Route 
} from "react-router-dom";
import React, { Component } from "react";
import AnimalList from "./Animals/AnimalList";
import LocationList from "./Locations/LocationList";
import EmployeeList from "./Employees/EmployeeList";
import Ownerlist from "./Owners/OwnerList";
import SearchResults from "./SearchResults/SearchResults";

class ApplicationViews extends Component {
  state = {
    employees: [],
    locations: [],
    animals: [],
    owners: [],
    animalOwners: []
  };

  componentDidMount() {
    const newState = {};

    fetch("http://localhost:5002/animals")
      .then(r => r.json())
      .then(animals => (newState.animals = animals))
      .then(() => fetch("http://localhost:5002/employees").then(r => r.json()))
      .then(employees => (newState.employees = employees))
      .then(() => fetch("http://localhost:5002/locations").then(r => r.json()))
      .then(locations => (newState.locations = locations))
      .then(() => fetch("http://localhost:5002/owners").then(r => r.json()))
      .then(owners => (newState.owners = owners))
      .then(() =>
        fetch("http://localhost:5002/animalOwners").then(r => r.json())
      )
      .then(animalOwners => (newState.animalOwners = animalOwners))
      .then(() => this.setState(newState));
  }
  render() {
    return (
      <React.Fragment>
        <Route
          exact
          path="/"
          render={props => {
            return <LocationList locations={this.state.locations} />;
          }}
        />
        <Route
          path="/animals"
          render={props => {
            return (
              <AnimalList
                animals={this.state.animals}
                owners={this.state.owners}
                animalOwners={this.state.animalOwners}
              />
            );
          }}
        />
        <Route
          path="/employees"
          render={props => {
            return <EmployeeList employees={this.state.employees} />;
          }}
        />
        <Route
          path="/owners"
          render={props => {
            return <Ownerlist owners={this.state.owners} />;
          }}
        />
       <Route
          path="/searchResults"
          render={(props) => {
            return (
              <SearchResults searchTerm={props}/>
            );
          }}
        />
      </React.Fragment>
    );
  }
}

export default ApplicationViews;
