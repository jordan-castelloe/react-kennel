import React, { Component } from "react";

class ResultsList extends Component {
    render() { 
        return ( 
            <React.Fragment key={this.props.iterator}>
                {this.props.results.map((singleResult, i) => {
                    return <p key={i}>{singleResult.name}</p>
                })}
            </React.Fragment>
        );
    }
}
 
export default ResultsList;