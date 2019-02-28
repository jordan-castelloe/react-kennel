import React, { Component } from "react";
import {withRouter} from 'react-router-dom'

class SearchBar extends Component {
  state = {
    searchQuery: ""
  };

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  handleSearch = evt => {
    evt.preventDefault();
    this.props.history.push({
        pathname: "/searchResults",
        state: {searchTerm: this.state.searchQuery}
    })
  };
  render() {
    return (
      <form className="form-inline my-2 my-lg-0" onSubmit={this.handleSearch}>
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          id="searchQuery"
          onChange={this.handleFieldChange}
        />
      </form>
    );
  }
}

export default withRouter(SearchBar);
