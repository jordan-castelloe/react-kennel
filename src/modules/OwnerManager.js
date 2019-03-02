const remoteURL = "http://localhost:5002"

const OwnerManager = {
    getAll(){
        return fetch(`${remoteURL}/owners`)
        .then(r => r.json())
    },
    deleteOwner(id){
        return fetch(`${remoteURL}/owners/${id}`, {
        method: "DELETE"
    })
    .then(() => {
        return this.getAll();
    })
    }
    
}

export default OwnerManager;



