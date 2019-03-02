const remoteURL = "http://localhost:5002"

const AnimalManager = {
    getAll(){
        return fetch(`${remoteURL}/animals`)
        .then(r => r.json())
    },
    deleteAnimal(id){
        return fetch(`${remoteURL}/animals/${id}`, {
            method: "DELETE"
        })
        .then(() => {
            return this.getAll();
        })
    }
    
}
export default AnimalManager;