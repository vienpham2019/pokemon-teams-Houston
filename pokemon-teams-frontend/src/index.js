const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


const display_data = (trainer_arr) => {
    trainer_arr.forEach(trainer => {
        add_trainer(trainer)
    });
}

const add_trainer = (trainer) => {
    let  main = document.querySelector("main")

    let div = document.createElement("div")
    div.className = "card"
    div.setAttribute("data-id", trainer.id)

    let p = document.createElement("p")
    p.innerText = trainer.name

    let add_btn = document.createElement("button")
    add_btn.setAttribute("trainer-data-id",trainer.id)
    add_btn.innerText = "Add Pokemon"

    add_btn.addEventListener("click", () => {
        fetch(POKEMONS_URL,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "trainer_id": trainer.id
            })
        }) 
        .then(res => res.json())
        .then(pokemon => { 
            if(pokemon.error){
                alert(pokemon.error)
            }else{
                ul.append(add_pokemon(pokemon))
            }
        })
    })

    let ul = document.createElement("ul")

    trainer.pokemons.forEach(pokemon => {
        ul.append(add_pokemon(pokemon))
    });

    div.append(p,add_btn,ul)
    main.append(div)
}

 const add_pokemon = (pokemon) => {
    let li = document.createElement("li")
    li.innerText = `${pokemon.nickname} (${pokemon.species})`

    let release_btn = document.createElement("button")
    release_btn.className = "release"
    release_btn.setAttribute("data-pokemon-id",pokemon.id)
    release_btn.innerText = "Release"

    release_btn.addEventListener("click", () => {
        fetch(`${POKEMONS_URL}/${pokemon.id}`,{
            method: "DELETE"
        })
        .then(res => res.json())
        .then(pk => li.remove())
    })

    li.append(release_btn)
    return li 
 }

fetch(TRAINERS_URL)
.then(res => res.json())
.then(trainer_arr => display_data(trainer_arr))