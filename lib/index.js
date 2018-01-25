const clickedUserButton =

$('.document').ready(() => {
  getUsers()
  //getGiphy()
})

const getUsers = () => {
  $.ajax({
    url: 'http://localhost:8888/api/v1/users',
    type: 'GET',
    dataType: 'json',
    success: (res) => {
      renderUsers(res)
    }
  })
}

const getSassies = (clickedUserButton) => {
  $.ajax({
    url: 'http://localhost:8888/api/v1/sassies',
    type: 'GET',
    dataType: 'json',
    success: (res) => {
      findAssocSass(res, clickedUserButton)
    }
  })
}

const getGiphy = (sassComment) => {
  $.ajax({
    url: `http://api.giphy.com/v1/gifs/search?q=${sassComment}&api_key=dc6zaTOxFJmzC&limit=1`,
    type: 'GET',
    dataType: 'json',
    success: (res) => {
      renderGiphy(res.data[0].images.downsized.url)
    }
  })
}

const addUser = (name, email) => {
  $.ajax({
    url: 'http://localhost:8888/api/v1/users',
    type: 'POST',
    data: {name, email},
    dataType: "html"
  })
}

const deleteUser = (userId) => {
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
        <p
          class="delete-user"
          id=${obj.id}>x
        </p>
      </button>
      `)
    })
  }

const renderSassie = (sass, sassId) => {
  const comment = sass
  $('.sass-container').append(`<p class="sassie" id=${sassId}>${comment}</p>`)
}

const renderGiphy = (gif) => {
  $('.sass-container').append(`<img class="giphy" src=${gif} />`)
}

const findAssocSass = (res, clickedUserButton) => {
  if (clickedUserButton) {
    const match = res.data.filter(obj => {
      return clickedUserButton == obj.user_id
    })
    const sass = match.map(obj => {
      renderSassie(obj.sass_comment, obj.id)
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

$('.user-container').on('click', '.delete-user', (e) => {
  const userId = e.target.id
  deleteUser(userId)
  $(e.target).parent().remove()
})

$('.user-container').on('click', '.user-button', (e) => {
  const clickedUserButton = e.target.id
  $('.sass-container').children().remove()
  getSassies(clickedUserButton)
})

$('.sass-container').on('click', '.sassie', (e) => {
  sassComment = e.target.innerText
  getGiphy(sassComment)
  $('.sass-container').children().remove()

})
