

const remoteURL = "http://localhost:5002"
const APIManager = {
   getAll(collection){
    return fetch(`${remoteURL}/${collection}`).then(e => e.json())
   },
   deleteAndList(id, collection){
       return fetch(`${remoteURL}/${collection}/${id}`, {method: "DELETE"}).then(() => this.getAll(collection))
   }
}

export default APIManager;
