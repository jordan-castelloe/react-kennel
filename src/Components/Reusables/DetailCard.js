import React, { Component } from "react";
import dog from "./DogIcon.png";

export default class DetailCard extends Component {
  render() {
    const resource =
      this.props.resources.find(
        r => r.id === parseInt(this.props.match.params.id)
      ) || {};

    return (
      <section className="card--detail">
        <div key={resource.id} className="card">
          <div className="card-body">
            <img src={dog} className="icon--dog" />
            {Object.keys(resource).map(singleKey => {
              // Print all the properties in the object except for foreign and primary keys
              if (!singleKey.toLowerCase().includes("id")) {
                return (
                  <section key={singleKey}>
                    <h5>
                      {singleKey.charAt(0).toUpperCase() + singleKey.slice(1)}
                    </h5>
                    <p>{resource[singleKey]}</p>
                  </section>
                );
              }
            })}
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                this.props.deleteAndList(resource.id, this.props.collection);
                this.props.history.push(`/${this.props.collection}`);
              }}
            >
              Delete
            </button>

            <button
              type="button"
              className="btn btn-success"
              onClick={() => {
                this.props.history.push(
                  `/${this.props.collection}/${resource.id}/edit`
                );
              }}
            >
              Edit
            </button>
          </div>
        </div>
      </section>
    );
  }
}
