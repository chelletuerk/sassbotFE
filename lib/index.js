$('.back-to-users').hide()
const clickedUserButton =


$('.document').ready(() => {
  getUsers()
  $('.user-name').focus()
  $('.drawer').drawer()
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
      if (!res.data[0]) {
        alert('No image matches that mess!  Try using your big boy words this time.')
      }
      renderGiphy(res.data[0].images.downsized.url)
    }
  })
}

const addUser = (name, email) => {
  $.ajax({
    url: 'http://localhost:8888/api/v1/users',
    type: 'POST',
    data: {name, email},
    dataType: 'html'
  }).then((res) => {
    const newUserId = parseInt(res.split(' ')[5].split('#')[1])
    getUsers()
    $sassComment = $('.sass-comment').val()
    addSassie(newUserId, $sassComment)
    $('.sass-comment').val('')
  })
}

const addSassie = (userId, sassComment) => {
  $.ajax({
    url: 'http://localhost:8888/api/v1/sassies',
    type: 'POST',
    data: {user_id: userId, sass_comment: sassComment},
    dataType: 'html'
  })
}

const postUrl = (url) => {
  fetch(`/api/v1/urls`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ folderId: clickedFolder, url })
  })
  .then(response => response.json()).then(data => {
    currentUrls = data
    renderUrls([data[data.length-1]])
  })
  .catch(err => 'err')
}

const deleteUser = (userId) => {
  $.ajax({
      url: 'http://localhost:8888/api/v1/users' + '/' + userId,
      type: 'DELETE',
  })
}

const renderUsers = (res) => {
  search(res.data)
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
  $('.sass-container').append(`<div class="sassie" id=${sassId}>${comment}</div>`)
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

const validateEmail = (email) => {
  var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email)
}

$('.submit-button').on('click', () => {
  const $userName = $('.user-name').val()
  const $userEmail = $('.user-email').val()
  const $sass = $('.sass-comment').val()
  const isValid = validateEmail($userEmail)
    if(!isValid) {
      alert("Your email isn't valid.")
      $('.user-name').val('')
      $('.user-email').val('')
      $('.sass-comment').val('')
      return
    }
  addUser($userName, $userEmail)
  $('.user-name').val('')
  $('.user-email').val('')
  $('.user-button').remove()
})

$(document).bind('keypress', function(e) {
  if (e.keyCode==13) {
    const $userName = $('.user-name').val()
    const $userEmail = $('.user-email').val()
    const isValid = validateEmail($userEmail)
      if(!isValid) {
        alert("Your email isn't valid.")
        $('.user-name').val('')
        $('.user-email').val('')
        $('.sass-comment').val('')
        return
      }
    addUser($userName, $userEmail)
    $('.user-name').val('')
    $('.user-email').val('')
    $('.user-button').remove()
   }
})

const search = (userName) => {
  const expandButton = $('.user-button-wrap__toggle')
  $('#search').on('keyup', (e) => {
    $('.user-container').hide()
    $('.search-container').show()
    expandButton.hide()
    if ($('.search-input').val() === '') {
      $('.search-container').hide()
      expandButton.show()
      $('.user-container').show()
    }
    $('.search-container').children().remove()
    $searchText = $('.search-input').val().toLowerCase()
    const matches = userName.filter((user) => {
      return user.name.toLowerCase().includes($searchText)
    })
    if (true) {
      const allMatches = matches.map((match) => {
        $('.search-container').append(`
          <button
            class="user-button"
            id=${match.id}>${match.name}
            <p
              class="delete-user"
              id=${match.id}>x
            </p>
          </button>
          `)
      })
    }
  })
}

$('.user-container, .search-container').on('click', '.delete-user', (e) => {
  e.stopPropagation()
  const userId = e.target.id
  deleteUser(userId)
  $(e.target).parent().remove()
  $('.user-button-wrap__toggle').show()
})

$('.user-container, .search-container').on('click', '.user-button', (e) => {
  const clickedUserButton = e.target.id
  $('.sass-container').show()
  $('.search-input').val('')
  $('.sass-container').children().remove()
  getSassies(clickedUserButton)
  $('.user-button-wrap__toggle').hide()
  $('.back-to-users').show()
  $('.user-button').not(this).each(function() {
    $(this).hide()
  })
})

$('.sass-container').on('click', '.sassie', (e) => {
  sassComment = e.target.innerText
  getGiphy(sassComment)
  $('.user-container').hide()
  $('.sass-container').children().remove()
  $('.back-to-users').show()
})

$('.back-to-users').on('click', () => {
  $('.user-button').show()
  $('.user-container').show()
  $('.giphy').remove()
  $('.sassie').hide()
  $('.back-to-users').hide()
  $('.user-button-wrap__toggle').show()
  $('.search-container').hide()
})

$('.user-button-wrap__toggle').click(() => {
  $('.user-container').children().remove()
  getUsers()
  $(this).text((i, text) => {
    return text === 'Show Me Some Sass!' ? 'Too Much Sass!  Show Less!' : 'Show Me Some Sass!'
  })
})
