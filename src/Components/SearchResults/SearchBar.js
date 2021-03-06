import React, { Component } from "react";
import {withRouter} from 'react-router-dom'

class SearchBar extends Component {
  state = {
    searchTerm: ""
  };

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  handleSubmit = evt => {
    evt.preventDefault();
    this.props.handleSearch(this.state.searchTerm);
  }


  render() {
    return (
      <form className="form-inline my-2 my-lg-0" onSubmit={this.handleSubmit}>
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          id="searchTerm"
          onChange={this.handleFieldChange}
        />
      </form>
    );
  }
}

export default withRouter(SearchBar);
