import { Route, Redirect } from "react-router-dom";
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
import Login from "./Authentication/Login";

class ApplicationViews extends Component {
  state = {
    employees: [],
    locations: [],
    animals: [],
    owners: [],
    isLoggedIn: false
  };

  isAuthenticated = () => sessionStorage.getItem("credentials") !== null;

  login = () => {
    this.setState({isLoggedIn: true})
  }
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
        return APIManager.getAll("locations");
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
  };

  render() {
    return (
      <div className="app-views">
      <Route path="/login" render={props => <Login {...props} />} />
        <Route
          exact
          path="/"
          render={props => {
            if(this.isAuthenticated()){
              return <LocationList locations={this.state.locations} />;
            } else {
              return <Redirect to="/login" />;
            }
            
          }}
        />
        <Route
          exact
          path="/animals"
          render={props => {
            if(this.isAuthenticated()){
              return (
                <AnimalList
                  {...props}
                  deleteAndList={this.deleteAndList}
                  animals={this.state.animals}
                />
              );
            } else {
              return <Redirect to="/login" />;
            }
      
          }}
        />
        <Route
          path="/animals/new"
          render={props => {
            if(this.isAuthenticated()){
              return (
                <AnimalForm
                  {...props}
                  postAndList={this.postAndList}
                  employees={this.state.employees}
                />
              );
            } else {
              return <Redirect to="/login" />;
            } 
          }}
        />
        <Route
          exact
          path="/employees"
          render={props => {
            if (this.isAuthenticated()) {
              return (
                <EmployeeList
                  deleteAndList={this.deleteAndList}
                  employees={this.state.employees}
                />
              );
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />
        <Route
          exact
          path="/owners"
          render={props => {
            if(this.isAuthenticated()){
              return (
                <Ownerlist
                  owners={this.state.owners}
                  deleteAndList={this.deleteAndList}
                /> );
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />
        <Route
          exact 
          path="/searchResults"
          render={props => {
            if(this.isAuthenticated()){
              return <SearchResults searchTerm={props} />;
            } else {
              return <Redirect to="/login" />;
            }
            
          }}
        />
        <Route
          path="/animals/:animalId(\d+)"
          render={props => {
            if(this.isAuthenticated()){
              return (
                <AnimalDetail
                  {...props}
                  deleteAndList={this.deleteAndList}
                  animals={this.state.animals}
                />
              );
            } else {
              return <Redirect to="/login" />;
            }
          
          }}
        />
        <Route
          path="/employees/:employeeId(\d+)"
          render={props => {
            if(this.isAuthenticated()){
              return (
                <EmployeeDetail
                  {...props}
                  deleteAndList={this.deleteAndList}
                  employees={this.state.employees}
                />
              );
            } else {
              return <Redirect to="/login" />;
            }
          
          }}
        />
      </div>
    );
  }
}

export default ApplicationViews;
