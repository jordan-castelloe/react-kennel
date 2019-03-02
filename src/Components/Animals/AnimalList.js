import React, { Component } from "react";
import dog from "./DogIcon.png";
import "./Animal.css";
import { Link } from "react-router-dom";

export default class AnimalList extends Component {
  render() {
    return (
      <React.Fragment>
          <button
            type="button"
            className="btn btn-success animalButton"
            onClick={() => {
              this.props.history.push("/animals/new");
            }}
          >
            Admit Animal
          </button >
        <section className="animals">
          {this.props.animals.map(animal => (
            <div key={animal.id} className="card">
              <div className="card-body">
                <h5 className="card-title">
                  <img src={dog} alt="dog icon" className="icon--dog" />
                  {animal.name}
                  <Link className="nav-link" to={`/animals/${animal.id}`}>
                    Details
                  </Link>
                  <button
                    onClick={() =>
                      this.props.deleteAndList(animal.id, "animals")
                    }
                    className="card-link"
                  >
                    Delete
                  </button>
                </h5>
              </div>
            </div>
          ))}
        </section>
      </React.Fragment>
    );
  }
}
