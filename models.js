import axios from 'axios'
const api = axios.create({
  baseURL: 'http://localhost:3000'
})
class User {
  
  list() {
    return api.get('/users').then(res => res.data)
  }

  find(id) {
    return api.get(`/users/${id}`).then(res => res.data)
  }

  get(ids) {
    const idparam = `id=${ids.join('&id=')}`
    return api.get(`users/?${idparam}`).then(res => res.data)
  }

  create(data) {
    data.friends = data.friends 
      ? data.friends.map(id => ({ id })) 
      : []
  
    return api.post('/users', data).then(res => res.data)
  }
}

class Project {

  list() {
    return api.get('/projects').then(res => res.data)
  }

  find(id) {
    return api.get(`/projects/${id}`).then(res => res.data)
  }

  get(ids) {
    const idparam = `id=${ids.join('&id=')}`
    return api.get(`projects/?${idparam}`).then(res => res.data)
  }

  create(data) {
    data.maintainers = data.maintainers ? data.maintainers.map(id => ({ id })) : [];
    data.owner = data.owner ? { id: data.owner } : null;
    return api.post('/projects', data).then(res => res.data)
  }
}

class Attribute {
  list() {
    return api.get('/attributes').then(res => res.data)
  }

  find(id) {
    return api.get(`/attributes/${id}`).then(res => res.data)
  }

  get(ids) {
    const idparam = `id=${ids.join('&id=')}`
    return api.get(`attributes/?${idparam}`).then(res => res.data)
  }

  create(data) {
    return api.post('/attributes', data).then(res => res.data)
  }
}

class Language {
  list() {
    return api.get('/languages').then(res => res.data)
  }

  find(id) {
    return api.get(`/languages/${id}`).then(res => res.data)
  }

  get(ids) {
    const idparam = `id=${ids.join('&id=')}`
    return api.get(`languages/?${idparam}`).then(res => res.data)
  }

  create(data) {
    data.attributes = data.attributes ? data.attributes.map(id => ({ id })) : [];
    return api.post('/languages', data).then(res => res.data)
  }
}

export const userModel = new User();
export const projectModel = new Project();
export const attributeModel = new Attribute();
export const languageModel = new Language();