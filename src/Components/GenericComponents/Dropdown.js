import React, { Component } from "react";

export default class Dropdown extends Component {
  render() {
    return (
      <div className="form-group">
        <label htmlFor={this.props.id}>{this.props.heading}</label>
        <select
          defaultValue=""
          name={this.props.id}
          id={this.props.id}
          onChange={this.handleFieldChange}
        >
          <option value="">{this.props.heading}</option>
          {this.props.resources.map(r=> (
            <option key={r.id} id={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>
      </div>
    );
  }
}
