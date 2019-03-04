import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import SearchResults from "./SearchResults/SearchResults";
import APIManager from "../modules/APIManager";
import Login from "./Authentication/Login";
import ResourceList from "./Reusables/ResourceList";
import DetailCard from "./Reusables/DetailCard";
import Form from "./Reusables/Form";

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
    this.setState({ isLoggedIn: true });
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
        return APIManager.getAll("locations");
      })
      .then(locations => {
        newState.locations = locations;
        this.setState(newState);
      });
  }

  //TODO: refactor search so that you can search directly from the search results page

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

  editAndList = (editedObject, collection) => {
    const newState = this.state;
    APIManager.editAndList(editedObject, collection).then(data => {
      newState[collection] = data;
      this.setState(newState);
    });
  };



  render() {
    return (
      <div className="app-views">
        <Route exact path="/" render={props => <Login {...props} />} />
        <Route
          exact
          path="/locations"
          render={props => {
            if (this.isAuthenticated()) {
              return (
                <ResourceList
                  postAndList={this.postAndList}
                  resources={this.state.locations}
                  collection="locations"
                  {...props}
                />
              );
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />
        <Route
          path="/locations/new"
          render={props => {
            if (this.isAuthenticated()) {
              return (
                <Form
                  {...props}
                  collection="locations"
                  postAndList={this.postAndList}
                  resourceTemplate={{ name: "", address: "" }}
                  labels={{
                    formHeading: "Add a New Location"
                  }}
                />
              );
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />
        <Route
          exact
          path="/locations/:id(\d+)"
          render={props => {
            if (this.isAuthenticated()) {
              return (
                <DetailCard
                  resources={this.state.locations}
                  collection="locations"
                  deleteAndList={this.deleteAndList}
                  {...props}
                />
              );
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />
        <Route
          path="/locations/:id(\d+)/edit"
          render={props => {
            return (
              <Form
                {...props}
                editAndList={this.editAndList}
                collection="locations"
                labels={{
                  formHeading: "Edit Your Location"
                }}
              />
            );
          }}
        />
        <Route
          exact
          path="/animals"
          render={props => {
            if (this.isAuthenticated()) {
              return (
                <ResourceList
                  postAndList={this.postAndList}
                  resources={this.state.animals}
                  collection="animals"
                  {...props}
                />
              );
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />
        <Route
          exact
          path="/animals/:id(\d+)"
          render={props => {
            if (this.isAuthenticated()) {
              return (
                <DetailCard
                  resources={this.state.animals}
                  collection="animals"
                  deleteAndList={this.deleteAndList}
                  {...props}
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
            if (this.isAuthenticated()) {
              return (
                <Form
                  {...props}
                  collection="animals"
                  postAndList={this.postAndList}
                  resourceTemplate={{ name: "", breed: "", employeeId: "" }}
                  labels={{
                    formHeading: "Register a New Pet",
                    dropdownLabel: "Choose a Caretaker"
                  }}
                  dropdownResource={this.state.employees}
                />
              );
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />
        <Route
          path="/animals/:id(\d+)/edit"
          render={props => {
            return (
              <Form
                {...props}
                dropdownResource={this.state.employees}
                editAndList={this.editAndList}
                collection="animals"
                labels={{
                  formHeading: "Edit Your Pet",
                  dropdownLabel: "Choose a Caretaker"
                }}
              />
            );
          }}
        />
        <Route
          exact
          path="/employees"
          render={props => {
            if (this.isAuthenticated()) {
              return (
                <ResourceList
                  postAndList={this.postAndList}
                  resources={this.state.employees}
                  collection="employees"
                  {...props}
                />
              );
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />
        <Route
          exact
          path="/employees/:id(\d+)"
          render={props => {
            if (this.isAuthenticated()) {
              return (
                <DetailCard
                  resources={this.state.employees}
                  collection="employees"
                  deleteAndList={this.deleteAndList}
                  {...props}
                />
              );
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />
        <Route
          path="/employees/new"
          render={props => {
            if (this.isAuthenticated()) {
              return (
                <Form
                  {...props}
                  collection="employees"
                  postAndList={this.postAndList}
                  resourceTemplate={{ name: "" }}
                  labels={{
                    formHeading: "Add a New Employee"
                  }}
                />
              );
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />
        <Route
          path="/employees/:id(\d+)/edit"
          render={props => {
            return (
              <Form
                {...props}
                editAndList={this.editAndList}
                collection="employees"
                labels={{
                  formHeading: "Edit An Employee Information"
                }}
              />
            );
          }}
        />
        <Route
          exact
          path="/owners"
          render={props => {
            if (this.isAuthenticated()) {
              return (
                <ResourceList
                  postAndList={this.postAndList}
                  resources={this.state.owners}
                  collection="owners"
                  {...props}
                />
              );
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />
        <Route
          exact
          path="/owners/:id(\d+)"
          render={props => {
            if (this.isAuthenticated()) {
              return (
                <DetailCard
                  resources={this.state.owners}
                  collection="owners"
                  deleteAndList={this.deleteAndList}
                  {...props}
                />
              );
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />
        <Route
          path="/owners/new"
          render={props => {
            if (this.isAuthenticated()) {
              return (
                <Form
                  {...props}
                  collection="owners"
                  postAndList={this.postAndList}
                  resourceTemplate={{ name: "" }}
                  labels={{
                    formHeading: "Register a New Owner"
                  }}
                />
              );
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />
        <Route
          path="/owners/:id(\d+)/edit"
          render={props => {
            return (
              <Form
                {...props}
                editAndList={this.editAndList}
                collection="owners"
                labels={{
                  formHeading: "Edit Owner Information"
                }}
              />
            );
          }}
        />
        <Route
          exact
          path="/search"
          render={props => {
            if (this.isAuthenticated()) {
              return <SearchResults searchResults={this.props.searchResults} />;
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
