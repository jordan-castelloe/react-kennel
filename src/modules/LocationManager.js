const remoteURL = "http://localhost:5002"

const LocationManager = {
    getAll(){
        return fetch(`${remoteURL}/locations`)
        .then(r => r.json())
    }

  
}

export default LocationManager;