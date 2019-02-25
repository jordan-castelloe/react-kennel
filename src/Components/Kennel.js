import React, { Component } from 'react'
import EmployeeList from "./Employees/EmployeeList"  // Import EmployeeList component
import LocationList from "./Locations/LocationList"  // Import LocationList component
import "./Kennel.css"
import AnimalList from './Animals/AnimalList';


export default class Kennel extends Component {
    employeesFromAPI = [
        { id: 1, name: "Jessica Younker" },
        { id: 2, name: "Jordan Nelson" },
        { id: 3, name: "Zoe LeBlanc" },
        { id: 4, name: "Blaise Roberts" }
    ]

    // This will eventually get pulled from the API
    locationsFromAPI = [
        { id: 1, name: "Nashville North", address: "500 Circle Way" },
        { id: 2, name: "Nashville South", address: "10101 Binary Court" }
    ]

    animalsFromAPI = [
        {id: 1, name: "Wiggles"},
        {id: 2, name: "Sam"},
        {id: 3, name: "Frodo"}
    ]

    ownersFromAPI = [
        { id: 1, name: "Ryan Tanay" },
        { id: 2, name: "Emma Beaton" },
        { id: 3, name: "Dani Adkins" },
        { id: 4, name: "Adam Oswalt" },
        { id: 5, name: "Fletcher Bangs" },
        { id: 6, name: "Angela Lee" }
    ]

    animalOwners = [
        {id: 1, animalId: 1, ownerId: 2},
        {id: 2, animalId: 2, ownerId: 2},
        {id: 3, animalId: 3, ownerId: 1},
        {id: 4, animalId: 3, ownerId: 6},
    ]

    state = {
        employees: this.employeesFromAPI,
        locations: this.locationsFromAPI,
        animals: this.animalsFromAPI,
        owners: this.ownersFromAPI,
        animalOwners: this.animalOwners 
    }
    render() {
        return (
            <div className="kennel">
                <EmployeeList employees={this.state.employees}/>
                <LocationList locations={this.state.locations}/> 
                <AnimalList animals={this.state.animals} animalOwners={this.state.animalOwners} owners={this.state.owners} />
            </div>
        );
    }
}