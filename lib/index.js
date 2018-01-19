const clickedUserButton =

$('.document').ready(() => {
  getUsers()
})

const getUsers = () => {
  $.ajax({
    url: 'http://localhost:8888/api/v1/users',
    type: "GET",
    dataType: 'json',
    success: (res) => {
      renderUsers(res)
    }
  })
}

const getSassies = (clickedUserButton) => {
  $.ajax({
    url: 'http://localhost:8888/api/v1/sassies',
    type: "GET",
    dataType: 'json',
    success: (res) => {
      findAssocSass(res, clickedUserButton)
    }
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

// const deleteUser = (clickedUserButton) => {
//   $.ajax({
//     url: 'http://localhost:8888/users{clickedUserButton}',
//     type: "DELETE",
//     dataType: 'json',
//     // success: (res) => {
//     //   console.log(res)
//     // }
//   })
// }

const deleteUser = (userId) => {
  console.log(userId)
  $.ajax({
      url: 'http://localhost:8888/api/v1/users' + '/' + userId,
      type: 'DELETE',
      // success: callback || $.noop,
      // error: errorCallback || $.noop
  })
}

const renderUsers = (res) => {
  res.data.map(obj => {
    $('.user-container').append(`
      <button
        class="user-button"
        id=${obj.id}>${obj.name}
        <button
          class="delete-user-button"
          id=${obj.id}>X
        </button>
      </button>
      `)
    })
  }

  const renderSassie = (sass) => {
    const comment = sass
    $('.sass-container').append(`<p class="sassie">${comment}</p>`)
  }

  const findAssocSass = (res, clickedUserButton) => {
    if (clickedUserButton) {
      const match = res.data.filter(obj => {
        return clickedUserButton == obj.user_id
      })
      const sass = match.map(obj => {
        renderSassie(obj.sass_comment)
      })
    }
  }


$('.submit-button').on('click', (e) => {
  const $userName = $('.user-name').val()
  const $userEmail = $('.user-email').val()
  addUser($userName, $userEmail)
  $('.user-name').val('')
  $('.user-email').val('')
  $('.user-button').remove()
  getUsers()
})

$('.user-container').on('click', '.delete-user-button', (e) => {
  const userId = e.target.id
  deleteUser(userId)
})



$('.user-container').on('click', '.user-button', (e) => {
  const clickedUserButton = e.target.id
  $('.sass-container').children().remove()
  getSassies(clickedUserButton)
})
