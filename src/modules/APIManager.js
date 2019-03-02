
export default Object.create(null, {
    collection: {
        value: "",
        writable: true,
        enumerable: true,
    },
    remoteURL: {
        value: "http://localhost:5002",
        writable: true,
        enumerable: true
    },
    getOne: {
        value: function (id) {
            return fetch(`${this.remoteURL}/${this.collection}/${id}`).then(e => e.json())
        }
    },
    getAll: {
        value: function () {
            return fetch(`${this.remoteURL}/${this.collection}`).then(e => e.json())
        }
    },
    deleteAndList: {
        value: function(id){
            return fetch(`${this.remoteURL}/${this.collection}/${id}`, {method: "DELETE"}).then(() => this.getAll())
        }
    },
    addAndList: {
        value: function(id){
            return fetch(`${this.remoteURL}/${this.collection}/${id}`, {method: "POST"}).then(() => this.getAll())
        }
    }
})
