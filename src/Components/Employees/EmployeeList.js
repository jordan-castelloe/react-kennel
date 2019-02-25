import React, { Component } from 'react'

export default class EmployeeList extends Component {
    render() {
        return (
            <article>
                <h3>Employees</h3>
                {this.props.employees.map(employee => {
                    return <div key={employee.id}>
                    <p>{employee.name}</p>
                    </div>
                })}
            </article>
        );
    }
}