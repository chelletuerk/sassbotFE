const clickedUserButton =

$('.document').ready(() => {
  getUsers()
  getSassies()
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

const renderUsers = (res) => {
  res.data.map(obj => {
    $('.user-container').append(`
      <button
        class="user-button"
        id=${obj.id}>${obj.name}
      </button>
      `)
    })
  }

  const renderSassie = (sass) => {
    const comment = sass
    $('.sass-container').append(`<p>${comment}</p>`)
    console.log(comment)
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
})

$('.user-container').on('click', '.user-button', (e) => {
  const clickedUserButton = e.target.id
  $('.sass-container').children().remove()
  getSassies(clickedUserButton)
})
