import React, { Component } from "react";
import Dropdown from "./Dropdown";
import StringManipulator from "../../modules/StringManipulator";
import APIManager from "../../modules/APIManager";

export default class Form extends Component {
  // Set initial state
  state = {};

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  addNewEntry = evt => {
    // TODO: print error message if they haven't selected anything from the dropdown
    evt.preventDefault();
    const objectToPost = this.state;
    this.props.postAndList(objectToPost, this.props.collection);
    this.props.history.push(`/${this.props.collection}`);
  };

  editEntry = evt => {
    evt.preventDefault();
    const editedObject = this.state;
    editedObject.id = this.props.match.params.id;
    this.props.editAndList(editedObject, this.props.collection);
    this.props.history.push(`/${this.props.collection}`);
  };

  componentDidMount() {
    if (this.props.match.url.includes("/edit")) {
      APIManager.getOne(this.props.match.params.id, this.props.collection).then(
        response => {
          this.setState(response);
        }
      );
    }
  }

  render() {
    const resourceTemplate = this.props.match.url.includes("/edit")
      ? this.state
      : this.props.resourceTemplate;
    return (
      <React.Fragment>
        <h3>{this.props.labels.formHeading}</h3>
        <form className="form">
          {Object.keys(resourceTemplate).map(singleKey => {
            if (singleKey.includes("Id")) {
              return (
                <Dropdown
                key={singleKey}
                  resources={this.props.dropdownResource}
                  id={singleKey}
                  handleFieldChange={this.handleFieldChange}
                  defaultValue={resourceTemplate[singleKey] || this.props.labels.dropdownLabel}
                  heading={this.props.labels.dropdownLabel}
                />
              );
            } else if (singleKey !== "id"){
              return (
                <div className="form-group">
                  <label htmlFor={singleKey}>
                    {StringManipulator.firstLetterToUppercase(singleKey)}
                  </label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    value={this.state[singleKey]}
                    onChange={this.handleFieldChange}
                    id={singleKey}
                  />
                </div>
              );
            }
          })}

          <button
            type="submit"
            onClick={this.props.match.url.includes("/edit") ? this.editEntry : this.addNewEntry}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}
