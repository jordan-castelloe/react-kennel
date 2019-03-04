import React, { Component } from "react";
import { Link } from "react-router-dom";
import dog from "./DogIcon.png";


export default class ResourceCard extends Component {
  render() {
    return (
      <div key={this.props.resource.id} className="card">
        <div className="card-body">
          <h5 className="card-title">
            <img src={dog} className="icon--dog" />
            {this.props.resource.name}
            <Link className="nav-link" to={`/${this.props.collection}/${this.props.resource.id}`}>
              Details
            </Link>
           
          </h5>
        </div>
      </div>
    );
  }
}