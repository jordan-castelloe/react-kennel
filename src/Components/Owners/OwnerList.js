import React, { Component } from 'react'

export default class OwnerList extends Component {
    render() {
        return (
            <section>
                <h3>Owners</h3>
                {this.props.owners.map(owner => {
                    return <div key={owner.id}>
                        <h3>{owner.name}</h3>
                        <button onClick={() => this.props.deleteAndList(owner.id)}>Delete</button>
                    </div>
                })}
            </section>

        )
    }
}