import React, { Component } from "react"
import personPlaceholder from "./person-placeholder.jpg"
import "./Employee.css"
import AnimalCard from "../Animals/AnimalCard"


export default class EmployeeList extends Component {
    render () {
        return (
            <section className="employees">
            {
                this.props.employees.map(employee =>
                    <div key={employee.id} className="card card--employee">
                        <div className="card-body">
                            <h5 className="card-title">
                                <img src={personPlaceholder} className="icon--employee" />
                                {employee.name}
                            <a href="#"
                                onClick={() => this.props.deleteAndList(employee.id, "employees")}
                                className="card-link">Delete</a>
                            </h5>

                            <h6 class="card-subtitle mb-2 text-muted">Caretaker For</h6>
                            <div className="animals--caretaker">
                            {
                                this.props.animals
                                    .filter(anml => anml.employeeId === employee.id)
                                    .map(anml => <AnimalCard key={anml.id} animal={anml} {...this.props} />)
                            }
                            </div>
                        </div>
                    </div>
                )
            }
            </section>
        )
    }
}