const URL = "http://localhost:8000/heroes";
const formPostHero = document.getElementById("formPostHero");
const searchbar = document.getElementById("searchbar");
var heroes = [];
const formOrder = document.getElementById("order")

//Header fixed on scroll

window.addEventListener("scroll", () => {
  let header = document.getElementById("header")
  if (window.pageYOffset > 0) {
      header.classList.add("header-active");
  } else {
      header.classList.remove("header-active")
  }
})

// Function get all heroes

function getAllHeroes() {
  axios
    .get(URL + "?_sort=id&_order=asc")
    .then((apiRes) => {
      heroes = apiRes.data
      displayAllHeroes(heroes)
    })
    .catch((apiErr) => console.error(apiErr))
}

// function display heroes

function displayAllHeroes(list) {
  const ul = document.getElementById("listHeroes");
  ul.innerHTML = "";
  list.forEach((hero) => {
    const li = document.createElement("li");
    li.classList.add("hero");
    li.setAttribute("data-hero-id", hero.id);
    // setup li's markup
    li.innerHTML = `
            <h2>${hero.name}</h2>
            <figure class="carte"><img src="${hero.image.url}" alt="${hero.name}"></figure>
            <div class="buttons">
                <button class="btn remove">remove</button>
                <button class="btn details">details</button>
            </div>
        `;
    // get the btn as an element object
    const btnDetails = li.querySelector(".btn.details");
    const btnRemove = li.querySelector(".btn.remove");

    // setup event listeners on the btn
    btnDetails.onclick = () => {
      getOneHero(hero.id);
    };

    btnRemove.onclick = () => {
      deleteOneHero(hero.id);
    };

    ul.appendChild(li);
  });
}

// Function post new hero

async function postNewHeroe() {
  const name = document.getElementById("name").value;
  


  try {
    await axios.post(URL, {
      name,
     
    });
    console.log(name)
    getAllHeroes();

  } catch (err) {
    console.error(err);
  }

}

function getOneHeroe(id) {
  axios
    .get(`${URL}/${id}`)
    .then((apiRes) => {
      const heroe = apiRes.data;
      displayOneHeroe(heroe);
    })
    .catch((apiErr) => console.error(apiErr));
}


//Function detail
// function afficherDetail(evt,heroes){
//   const id = evt.target.getAttribute("id") 
//   const modal = document.createElement("div")
//   modal.classList.add("modal") 
//   const body = document.querySelector("body")
//   body.appendChild(modal)
//   const heroe = heroes.find(heroe => heroe.id == id) 
//   console.log(heroe) 
//   modal.innerHTML = `
//   ${heroe.name} 
//   ${heroe.id}
//   ${heroe.biography.publisher}
//   `
  
//   }

// Function remove

async function deleteOneHero(id) {
  console.log(id);
  try {
    await axios.delete(`${URL}/${id}`);
    removeHeroFromDocument(id);
  } catch (err) {
    console.error(err);
  }
}

function removeHeroFromDocument(idHero) {
  const cardToRemove = document.querySelector(`[data-user-id="${idHero}"]`);
  cardToRemove.remove();

}

// Function filtre by name

searchbar.addEventListener("keyup", (element) => {
  const input = element.target.value;
  const filteredHeroes = heroes.filter((hero) => {
    return (
      hero.name.toLowerCase().includes(input.toLowerCase())
    )
  })
  displayAllHeroes(filteredHeroes)
})

// Function filtre by order
function selectedorder() {
  console.log(formOrder.value)
  const order = formOrder.value

  if (order === "desc") {
    axios
      .get(URL + "?_sort=id&_order=desc")
      .then((apiRes) => {
        heroes = apiRes.data
        displayAllHeroesWithoutPicture(heroes)
      })
      .catch((apiErr) => console.error(apiErr))
    console.log("ohmygod")
  }else{
    axios
      .get(URL + "?_sort=id&_order=asc")
      .then((apiRes) => {
        heroes = apiRes.data
        displayAllHeroes(heroes)
      })
      .catch((apiErr) => console.error(apiErr))
    console.log("good")
  }

}

function displayAllHeroesWithoutPicture(list) {
  const ul = document.getElementById("listHeroes");
  ul.innerHTML = "";
  list.forEach((hero) => {
    const li = document.createElement("li");
    li.classList.add("hero");
    li.setAttribute("data-hero-id", hero.id);
    // setup li's markup
    li.innerHTML = `
            <h2>${hero.name}</h2>
            <div class="buttons">
                <button class="btn remove">remove</button>
                <button class="btn details">details</button>
            </div>
        `;
    // get the btn as an element object
    const btnDetails = li.querySelector(".btn.details");
    const btnRemove = li.querySelector(".btn.remove");

    // setup event listeners on the btn
    btnDetails.onclick = () => {
      getOneHero(hero.id);
    };

    btnRemove.onclick = () => {
      deleteOneHero(hero.id);
    };

    ul.appendChild(li);
  });
}
formOrder.onchange = selectedorder


getAllHeroes()
formPostHero.querySelector(".btn").onclick = postNewHeroe;