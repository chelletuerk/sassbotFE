$('.document').ready(() => {
  loadUsers()
  loadSassies()
})


const loadUsers = () => {
  fetch(`http://localhost:8888/api/v1/users`, {
    method: 'GET',
    mode: 'no-cors'
  })
  .then(response => response.json())
  .then(data => data)
  .catch(err => err)
}

const loadSassies = () => {
  fetch(`http://localhost:8888/api/v1/sassies`, {
    method: 'GET',
    mode: 'no-cors'
  })
  .then(response => response.json())
  .then(data => data)
  .catch(err => err)
}
