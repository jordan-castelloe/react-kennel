import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class EmployeeList extends Component {
  render() {
    return (
      <article>
        <h3>Employees</h3>
        {this.props.employees.map(employee => {
          return (
            <div key={employee.id}>
              <p>{employee.name}</p>
              <Link className="nav-link" to={`/employees/${employee.id}`}>Details</Link>
              <button onClick={() => this.props.deleteAndList(employee.id, "employees")}>
                Delete
              </button>
            </div>
          );
        })}
      </article>
    );
  }
}
