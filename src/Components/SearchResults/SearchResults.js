import React, { Component } from "react";
import ResultsList from "./SearchResultsList"

class SearchResults extends Component {
  render() {
    

    return (
      <React.Fragment>
        <h2>Search Results</h2>
        {Object.keys(this.props.searchResults).map((singleKey, i)=> {
            const results = this.props.searchResults[singleKey]
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
