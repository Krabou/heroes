const URL = "http://localhost:8000/heroes"

function getAllHeroes(){
    axios
    .get(URL+ "?_sort=id&_order=asc")
    .then((apiRes) => {
        const heroes = apiRes.data
        displayAllHeroes(heroes)
    })
    .catch((apiErr) => console.error(apiErr))
}

function displayAllHeroes(list){
const ul = document.getElementById("listHeroes");
ul.innerHTML="";
list.forEach((hero) => {
    const li = document.createElement("li");
    li.classList.add("hero");
    li.setAttribute("data-hero-id", hero.id);
    // setup li's markup
    li.innerHTML = `
            <h2>${hero.name}</h2>
            <figure><img src="${hero.image.url}" alt="${hero.name}"></figure>
            <div class="buttons">
                <button class="btn remove">remove</button>
                <button class="btn details">details</button>
            </div>
        `;


    // remove
    async function deleteOneUser(id) {
      console.log(id);
      try {
        await axios.delete(`${URL}/${id}`);
        removeUserFromDocument(id);
      } catch (err) {
        console.error(err);
      }
    }
    
    function removeUserFromDocument(idHero) {
      // https://developer.mozilla.org/fr/docs/Web/CSS/S%C3%A9lecteurs_d_attribut
      const cardToRemove = document.querySelector(`[data-user-id="${idHero}"]`);
      cardToRemove.remove();
    }
    // get the btn as an element object
    const btnDetails = li.querySelector(".btn.details");
    const btnRemove = li.querySelector(".btn.remove");

    // setup event listeners on the btn
    btnDetails.onclick = () => {
      getOneUser(hero.id);
    };

    btnRemove.onclick = () => {
      deleteOneUser(hero.id);
    };

    ul.appendChild(li);
  });
}


getAllHeroes()