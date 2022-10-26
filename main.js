function getPokemonData(pokeName) {
  return new Promise((resolve) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
      .then((response) => response.json())
      .then((data) => resolve(data));
  });
}

function getPokemonSpeciesData(pokeName) {
  return new Promise((resolve) => {
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokeName}`)
      .then((response) => response.json())
      .then((data) => resolve(data));
  });
}

async function getPokemonCardData(pokeName) {
  // Next two lines get the pokemon's data
  let promise = getPokemonData(pokeName);
  let data = await promise;

  // Next 13 lines get all the nessasary stuff for a pokemon
  let name = data.name;
  let hp = data.stats[0].base_stat; // Not the correct stat yet... cant find consistent spot for hp
  let type = data.types[0].type.name;
  let number = data.id;
  let height = data.height;
  let weight = data.weight;
  let m1 = null;
  let m2 = null;
  if (data.moves[0] != null) {
    m1 = data.moves[0].move.name;
  }
  if (data.moves[1] != null) {
    m2 = data.moves[1].move.name;
  }

  // Do another api call for specific pokedex entry
  let sData = await getPokemonSpeciesData(pokeName);
  let entry = sData.flavor_text_entries[0].flavor_text;

  // Build the new model
  let poke = new Pokemon(name, hp, type, number, height, weight, m1, m2, entry);

  // return the new model
  return poke;
}

async function printPokemonData(pokeName) {
  let promise = getPokemonData(pokeName);
  let data = await promise;
  element = document.getElementById("pokemon_name");
  element.innerHTML = data.name;
  console.log(data.name);
}

// Use as you would a main function
async function main() {
  console.log(await getPokemonCardData("ditto"));
}
main();