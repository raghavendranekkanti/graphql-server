import axios from 'axios'

class User {
  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:3000' // json-server endpoint
    })
  }

  list() {
    return this.api.get('/users').then(res => res.data)
  }

  find(id) {
    return this.api.get(`/users/${id}`).then(res => res.data)
  }

  get(ids) {
    const idparam = `id=${ids.join('&id=')}`
    return this.api.get(`users/?${idparam}`).then(res => res.data)
  }

  create(data) {
    data.friends = data.friends 
      ? data.friends.map(id => ({ id })) 
      : []
  
    return this.api.post('/users', data).then(res => res.data)
  }
}

class Project {
  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:3000' // json-server endpoint
    })
  }

  list() {
    return this.api.get('/projects').then(res => res.data)
  }

  find(id) {
    return this.api.get(`/projects/${id}`).then(res => res.data)
  }

  get(ids) {
    const idparam = `id=${ids.join('&id=')}`
    return this.api.get(`projects/?${idparam}`).then(res => res.data)
  }

  create(data) {
    data.maintainers = data.maintainers ? data.maintainers.map(id => ({ id })) : [];
    data.owner = data.owner ? { id: data.owner } : null;
    return this.api.post('/projects', data).then(res => res.data)
  }
}

export const userModel = new User();
export const projectModel = new Project();