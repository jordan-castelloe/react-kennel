import { Route 
} from "react-router-dom";
import React, { Component } from "react";
import AnimalList from "./Animals/AnimalList";
import LocationList from "./Locations/LocationList";
import EmployeeList from "./Employees/EmployeeList";
import Ownerlist from "./Owners/OwnerList";
import SearchResults from "./SearchResults/SearchResults";
import AnimalManager from "../modules/AnimalManager.js"
import EmployeeManager from "../modules/EmployeeManager";
import OwnerManager from "../modules/OwnerManager";
import LocationManager from "../modules/LocationManager";

class ApplicationViews extends Component {
  state = {
    employees: [],
    locations: [],
    animals: [],
    owners: []
  };

  componentDidMount() {
    const newState = {};
    AnimalManager.getAll()
    .then(animals => {
      newState.animals = animals
      return OwnerManager.getAll()
    })
    .then(owners => {
      newState.owners = owners;
      return EmployeeManager.getAll()
    })
    .then(employees => {
      newState.employees = employees
      return LocationManager.getAll()
    })
    .then(locations => {
      newState.locations = locations
      this.setState(newState)
    })
  }
  

  deleteAndListAnimals = (id) => {
    AnimalManager.deleteAndList(id)
    .then(animals => {
      this.setState({animals: animals})
    })
  }

  deleteAndListOwners = (id) => {
    OwnerManager.deleteAndList(id)
    .then(owners => {
      this.setState({owners: owners})
    })
  }

  deleteAndListEmployees = (id) => {
    EmployeeManager.deleteAndList(id)
    .then(employees => {
      this.setState({employees: employees})
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
                deleteAndList={this.deleteAndListAnimals}
              />
            );
          }}
        />
        <Route
          path="/employees"
          render={props => {
            return <EmployeeList 
            employees={this.state.employees} 
            deleteAndList={this.deleteAndListEmployees}
            
            />;
          }}
        />
        <Route
          path="/owners"
          render={props => {
            return <Ownerlist owners={this.state.owners}
            deleteAndList={this.deleteAndListOwners}
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
