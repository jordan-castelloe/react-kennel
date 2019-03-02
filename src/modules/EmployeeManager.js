const remoteURL = "http://localhost:5002"

const EmployeeManager = {
    getAll(){
        return fetch(`${remoteURL}/employees`)
        .then(r => r.json())
    },
    deleteEmployee(id) {
        return fetch(`${remoteURL}/employees/${id}`, {
            method: "DELETE"
        })
        .then(() => {
            return this.getAll();
        })
    }
}

export default EmployeeManager;


  
