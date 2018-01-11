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

// const loadSassies = () => {
//   jQuery.getJSON('http://localhost:8888/api/v1/sassies')
//   .success((data) => {
//     JSON.stringify(data)
//   })
// }

// const loadSassies = () => {
//   $.ajax({
//     url: 'http://localhost:8888/api/v1/sassies',
//     type: "GET",
//     dataType: 'json',
//     success: (html) => {
//       alert(html)
//     }
//   })
// }

// const addUser = (name, email) => {
//   $.ajax({
//     url: 'http://localhost:8888/api/v1/users',
//     type: "POST",
//     headers: {
//     "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
//     "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
//   },
//     data: {name, email},
//     dataType: "html"
//   })
// }

const addUser = (name, email) => {
  fetch(`http://localhost:8888/api/v1/users`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    mode: 'no-cors',
    body: JSON.stringify({name, email})
  })
  .then(response => response.json())
  .catch(err => 'err')
}

$('.submit-button').on('click', (e) => {
  e.preventDefault()
  const $userName = $('.user-name').val()
  const $userEmail = $('.user-email').val()
  addUser($userName, $userEmail)
  $('.user-name').val('')
  $('.user-email').val('')
})
