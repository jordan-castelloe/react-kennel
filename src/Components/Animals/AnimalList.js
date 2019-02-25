import React, { Component } from 'react';
class AnimalList extends Component {


    animalsWithOwners = this.props.animals.map(animal => {

        // Filters the animalOwners array for entries with the current animal's id
        const matchingAnimalOwners = this.props.animalOwners.filter(animalOwner => animalOwner.animalId === animal.id);
        
        // Maps over the array of matching entries from the join table and finds the owner's name from the owners table
        const matchingOwnerNames = matchingAnimalOwners.map(animalOwner=> {
            const ownerObject = this.props.owners.find(owner => owner.id === animalOwner.ownerId);
            return ownerObject.name
        })
        
        // Return a new data structure with the animal name and an array of owner names
        return {
            id: animal.id,
            name: animal.name,
            ownerNames: matchingOwnerNames
        }
    })
    render() {
        return (<section>
            <h3>Animals</h3>
            {this.animalsWithOwners.map(animal => {
                return <div key={animal.id}>
                    <p>{animal.name}</p>
                    <p>Owners: {animal.ownerNames.join(", ")}</p>
                </div>
            })}
        </section>);
    }
}

export default AnimalList;