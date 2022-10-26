class Pokemon {
  constructor(name, hp, type, number, height, weight, move1, move2, entry) {
    this.Name = name;
    this.HP = hp;
    this.Type = type;
    this.Number = number;
    this.Height = height;
    this.Weight = weight;
    this.Move1 = move1;
    this.Move2 = move2;
    this.Entry = entry;
  }
}

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
  let promise = getPokemonData(pokeName);
  let data = await promise;
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

  let sData = await getPokemonSpeciesData(pokeName);
  let entry = sData.flavor_text_entries[0].flavor_text;
  let poke = new Pokemon(name, hp, type, number, height, weight, m1, m2, entry);
  return poke;
}

async function printPokemonData(pokeName) {
  let promise = getPokemonData(pokeName);
  let data = await promise;
  element = document.getElementById("pokemon_name");
  element.innerHTML = data.name;
  console.log(data.name);
}

async function main() {
  console.log(await getPokemonCardData("ditto"));
}
main();