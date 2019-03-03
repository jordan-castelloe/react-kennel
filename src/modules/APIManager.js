const remoteURL = "http://localhost:5002";
const APIManager = {
  getAll(collection) {
    return fetch(`${remoteURL}/${collection}`).then(e => e.json());
  },
  getOne(id, collection) {
    return fetch(`${remoteURL}/${collection}/${id}`).then(e => e.json());
  },
  deleteAndList(id, collection) {
    return fetch(`${remoteURL}/${collection}/${id}`, { method: "DELETE" }).then(
      () => this.getAll(collection)
    );
  },
  editAndList(editedObject, collection) {
    return fetch(`${remoteURL}/${collection}/${editedObject.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedObject)
    }).then(() => this.getAll(collection));
  },
  postAndList(objectToPost, collection) {
    return fetch(`${remoteURL}/${collection}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(objectToPost)
    }).then(() => this.getAll(collection));
  },
  searchCollection(searchTerm, collection) {
    const queryString = `q=${searchTerm}`;
    return fetch(`${remoteURL}/${collection}?${queryString}`).then(r => r.json());
  }
};

export default APIManager;
