import React, { Component } from "react";
import ResultsList from "./SearchResultsList"

class SearchResults extends Component {
  state = {
    searchResults: {
      animals: [],
      owners: [],
      employees: [],
      locations: []
    }
  };
  componentDidMount() {
      console.log("it mounted!")
    const newState = {};
    const searchTerm = this.props.searchTerm.location.state.searchTerm;
    const dbUrl = "http://localhost:5002";
    const queryString = `q=${searchTerm}`;
    fetch(`${dbUrl}/employees?${queryString}`)
      .then(r => r.json())
      .then(parsedEmployees => {
        newState.employees = parsedEmployees;
        return fetch(`${dbUrl}/animals?${queryString}`);
      })
      .then(r => r.json())
      .then(parsedAnimals => {
        newState.animals = parsedAnimals;
        return fetch(`${dbUrl}/owners?${queryString}`);
      })
      .then(r => r.json())
      .then(parsedOwners => {
        newState.owners = parsedOwners;
        return fetch(`${dbUrl}/locations?${queryString}`);
      })
      .then(r => r.json())
      .then(parsedLocations => {
        newState.locations = parsedLocations;
        this.setState({searchResults: newState});
      });
  }
  render() {
    const keys = Object.keys(this.state.searchResults)

    return (
      <React.Fragment>
        <h2>Search Results</h2>
        {keys.map((singleKey, i)=> {
            const results = this.state.searchResults[singleKey]
            return <div key={i}>
                <h4> Matching {singleKey}</h4>
                <ResultsList iterator={i} results={results}/>
            </div>
            
    
        })}
      </React.Fragment>
    );
  }
}

export default SearchResults;
