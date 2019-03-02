import { Route 
} from "react-router-dom";
import React, { Component } from "react";
import AnimalList from "./Animals/AnimalList";
import LocationList from "./Locations/LocationList";
import EmployeeList from "./Employees/EmployeeList";
import Ownerlist from "./Owners/OwnerList";
import SearchResults from "./SearchResults/SearchResults";
import APIManager from "../modules/APIManager"

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
      newState.animals = animals
      return APIManager.getAll("owners")
    })
    .then(owners => {
      newState.owners = owners;
      return APIManager.getAll("employees")
    })
    .then(employees => {
      newState.employees = employees
      return APIManager.getAll("owners")
    })
    .then(locations => {
      newState.locations = locations
      this.setState(newState)
    })
  }
  

  deleteAndList = (id, collection) => {
    const newState = this.state;
    APIManager.deleteAndList(id, collection).then((data) => {
      newState[collection] = data;
      this.setState(newState);
    })
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
                deleteAndList={this.deleteAndList}
              />
            );
          }}
        />
        <Route
          path="/employees"
          render={props => {
            return <EmployeeList 
            employees={this.state.employees} 
            deleteAndList={this.deleteAndList}
            
            />;
          }}
        />
        <Route
          path="/owners"
          render={props => {
            return <Ownerlist owners={this.state.owners}
            deleteAndList={this.deleteAndList}
            />;
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
