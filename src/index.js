let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function renderOneToy(toy) {
  let toyCard = document.createElement('div')
  toyCard.className = 'card'
  toyCard.innerHTML = `
  <h2>${toy.name}</h2>
  <img src='${toy.image}' class='toy-avatar'>
  <p>${toy.likes} Likes</p>
  <button class='like-btn' id=${toy.id}>Like ❤️</button>
  `
  document.querySelector('#toy-collection').appendChild(toyCard)
  toyCard.querySelector('.like-btn').addEventListener('click', () => {
    toy.likes += 1
    toyCard.querySelector('p').textContent = toy.likes + ' Likes'
    uppdateLikes(toy)
  })
}

function getToyCollection() {
  fetch('http://localhost:3000/toys')
  .then((resp) => resp.json())
  .then((data) => {
    data.forEach((element) => {
      renderOneToy(element)
    });
  })
}

function addNewToy() {
  document.querySelector('form').addEventListener('submit', (e) =>{
    e.preventDefault()
    const toyName = e.target.name.value
    const toyImg = e.target.image.value
    const configObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        'name': toyName,
        'image': toyImg,
        'likes': 0
      })
    }
    fetch('http://localhost:3000/toys/', configObj)
    .then((resp) => resp.json())
    .then((data) => {
      renderOneToy(data)
    })
  })
}

function uppdateLikes(toy) {
  const configObj = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({'likes': `${toy.likes}`})
    }
    fetch(`http://localhost:3000/toys/${toy.id}`, configObj)
    .then((resp) => resp.json())
}

function startToyTale() {
  getToyCollection()
  addNewToy()  
}

startToyTale()