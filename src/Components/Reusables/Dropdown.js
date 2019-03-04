import React, { Component } from "react";

export default class Dropdown extends Component {
  render() {
    return (
      <div className="form-group">
        <label htmlFor={this.props.id}>{this.props.heading}</label>
        <select
          name={this.props.id}
          id={this.props.id}
          onChange={this.props.handleFieldChange}
        >
          {this.props.resources.map(r => {
            // TODO: refactor into ternary statements
            debugger;
            if (r.id === +this.props.defaultValue) {
              return (
                <option selected key={r.id} id={r.id} value={r.id}>
                  {r.name}
                </option>
              );
            } else {
              return (
                <option key={r.id} id={r.id} value={r.id}>
                  {r.name}
                </option>
              );
            }
          })}
        </select>
      </div>
    );
  }
}
