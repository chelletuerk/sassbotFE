$('.document').ready(() => {
  loadUsers()
  loadSassies()
})

const loadUsers = () => {
  $.ajax({
    url: 'http://localhost:8888/api/v1/users',
    type: "GET",
    dataType: 'json',
    // success: (html) => {
    //   console.log(html)
    // }
  })
}

const loadSassies = () => {
  $.ajax({
    url: 'http://localhost:8888/api/v1/sassies',
    type: "GET",
    dataType: 'json',
    // success: (html) => {
    //   console.log(html)
    // }
  })
}

const addUser = (name, email) => {
  $.ajax({
    url: 'http://localhost:8888/api/v1/users',
    type: "POST",
    data: {name, email},
    dataType: "html"
  })
}

$('.submit-button').on('click', (e) => {
  e.preventDefault()
  const $userName = $('.user-name').val()
  const $userEmail = $('.user-email').val()
  addUser($userName, $userEmail)
  $('.user-name').val('')
  $('.user-email').val('')
})
