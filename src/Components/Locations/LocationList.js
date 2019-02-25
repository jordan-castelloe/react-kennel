import React, { Component } from 'react'

export default class LocationList extends Component {
    render() {
        return (
            <section>
                <h3>Location</h3>
                {this.props.locations.map(location => {
                    return <div key={location.id}>
                        <h3>{location.name}</h3>
                        <p>{location.address}</p>
                    </div>
                })}
            </section>

        )
    }
}