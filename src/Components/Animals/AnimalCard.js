import React, { Component } from "react";
import { Link } from "react-router-dom";
import dog from "./DogIcon.png";
import "./Animal.css";

export default class AnimalCard extends Component {
  render() {
    return (
      <div key={this.props.animal.id} className="card">
        <div className="card-body">
          <h5 className="card-title">
            <img src={dog} className="icon--dog" />
            {this.props.animal.name}
            <Link className="nav-link" to={`/animals/${this.props.animal.id}`}>
              Details
            </Link>
            <a
              href="#"
              onClick={() =>
                this.props.deleteAndList(this.props.animal.id, "animals")
              }
              className="card-link"
            >
              Discharge
            </a>
            <button
              type="button"
              className="btn btn-success"
              onClick={() => {
                this.props.history.push(
                  `/animals/${this.props.animal.id}/edit`
                );
              }}
            >
              Edit
            </button>
          </h5>
        </div>
      </div>
    );
  }
}
