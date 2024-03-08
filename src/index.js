const pokedex = document.getElementById("Pokemon")
const getPokemon = () => {
  const promises = []
  for (let i = 1; i <= 40; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`
    promises.push(fetch(url).then(res => res.json()))
  }
  Promise.all(promises).then(result => {
    const pokemon = result.map(data => ({
      id: data.id,
      name: data.name,
      type:data.types.map(type=>type.name).join(","),
      image: data.sprites["front_default"],
    }))
    displayPokemon(pokemon)
  })
}
const displayPokemon = pokemon => {
  const pokemonString = pokemon
    .map(
      singlePokemon => `
    <li>
      <img src="${singlePokemon.image}" />
      <h3>${singlePokemon.id}. ${singlePokemon.name}</h3>
      <p> Type :${singlePokemon.type}</p>
    </li>`
    )
    .join("")
  pokedex.innerHTML = pokemonString
}
getPokemon()