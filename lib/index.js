
$('.document').ready(() => {
  loadInitialUsers()
})

const loadInitialUsers = () => {
  fetch(`http://localhost:8888/api/v1/users`, {
    method: 'GET',
  })
  .then(response => response.json())
  .then(data => {
    renderUsers(data)
  })
  .catch(err => err)
}
