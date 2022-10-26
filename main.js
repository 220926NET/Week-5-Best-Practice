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

function getPokemonMoveFlavorText(moveName) {
  return new Promise((resolve) => {
    fetch(`https://pokeapi.co/api/v2/move/${moveName}`)
      .then((response) => response.json())
      .then((data) => resolve(data.flavor_text_entries[0].flavor_text));
  });
}

async function getPokemonCardData(pokeName) {
  // Next two lines get the pokemon's data
  let promise = getPokemonData(pokeName);
  let data = await promise;

  // Next 13 lines get all the nessasary stuff for a pokemon
  let name = data.name;
  let hp = Math.floor(Math.random() * (340 - 30)) + 30; // Can be a number between 30 and 340
  hp = hp - (hp % 10); // Number must be a multiple of 10
  let type = data.types[0].type.name;
  let number = data.id;
  let height = data.height;
  let weight = data.weight;
  let m1 = null;
  let m1t = null
  let m2 = null;
  let m2t = null;
  if (data.moves[0] != null) {
    m1 = data.moves[0].move.name;
    m1t = await getPokemonMoveFlavorText(m1);
  }
  if (data.moves[1] != null) {
    m2 = data.moves[1].move.name;
    m2t = await getPokemonMoveFlavorText(m2)
  }

  // Do another api call for specific pokedex entry
  let sData = await getPokemonSpeciesData(pokeName);
  let entry = sData.flavor_text_entries[0].flavor_text;
  let image = data.sprites.front_default;
  // Build the new model
  let poke = new Pokemon(name, hp, type, number, height, weight, m1, m1t, m2, m2t, entry, image);

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
  let name = document.getElementById("pokeInput").value;
  console.log(name);
  let poke = await getPokemonCardData(name);
  setPokemonFields(poke);
}

function setPokemonFields(pokeData) {
  document.getElementById("pokemonName").innerHTML = pokeData.Name;
  document.getElementById("pokemonType").innerHTML = pokeData.Type;
  document.getElementById("theImage").src = pokeData.Image;
  document.getElementById("pokeDesc").innerHTML = `NO: ${pokeData.Number} HT: ${pokeData.Height}  WT: ${pokeData.Weight} lbs.`;
  document.getElementById("move1Name").innerHTML = pokeData.Move1;
  document.getElementById("move1Description").innerHTML = pokeData.MoveText1;
  document.getElementById("move2Name").innerHTML = pokeData.Move2;
  document.getElementById("move2Description").innerHTML = pokeData.MoveText2;
  document.getElementById("PokeFlavorText").innerHTML = pokeData.Entry;
  document.getElementById("pokemonHP").innerHTML = `HP ${pokeData.HP} `;
  // document.getElementById("cardBorder").style.backgroundColor = "blue";
  pokeData.Type = pokeData.Type.toLowerCase();
  if (pokeData.Type == 'fire') {
    document.getElementById("cardBorder").style.backgroundImage = "linear-gradient(to bottom right, red, yellow)";
  } else if (pokeData.Type == 'normal') {
    document.getElementById("cardBorder").style.backgroundImage = "linear-gradient(to bottom right, brown, tan)";
  } else if (pokeData.Type == 'water') {
    document.getElementById("cardBorder").style.backgroundImage = "linear-gradient(to bottom right, blue, lightblue)";
  } else if (pokeData.Type == 'grass') {
    document.getElementById("cardBorder").style.backgroundImage = "linear-gradient(to bottom right, darkgreen, lightgreen)";
  } else if (pokeData.Type == 'electric') {
    document.getElementById("cardBorder").style.backgroundImage = "linear-gradient(to bottom right, yellow, lightyellow)";
  } else if (pokeData.Type == 'ice') {
    document.getElementById("cardBorder").style.backgroundImage = "linear-gradient(to bottom right, lightblue, white)";
  } else if (pokeData.Type == 'fighting') {
    // machamp
    document.getElementById("cardBorder").style.backgroundImage = "linear-gradient(to bottom right, #C22E28, white)";
  } else if (pokeData.Type == 'poison') {
    // arbok
    document.getElementById("cardBorder").style.backgroundImage = "linear-gradient(to bottom right, #A33EA1, white)";
  } else if (pokeData.Type == 'ground') {
    // diglett
    document.getElementById("cardBorder").style.backgroundImage = "linear-gradient(to bottom right, #E2BF65, white)";
  } else if (pokeData.Type == 'flying') {
    // starly
    document.getElementById("cardBorder").style.backgroundImage = "linear-gradient(to bottom right, #A98FF3, white)";
  } else if (pokeData.Type == 'psychic') {
    // abra
    document.getElementById("cardBorder").style.backgroundImage = "linear-gradient(to bottom right, #F95587, white)";
  } else if (pokeData.Type == 'bug') {
    // weedle
    document.getElementById("cardBorder").style.backgroundImage = "linear-gradient(to bottom right, #A6B91A, white)";
  } else if (pokeData.Type == 'rock') {
    document.getElementById("cardBorder").style.backgroundImage =  "linear-gradient(to bottom right, brown, burlywood)";
  }else if(pokeData.Type == 'ghost'){
    document.getElementById("cardBorder").style.backgroundImage =  "linear-gradient(to bottom right, purple, plum)";
  }else if(pokeData.Type == 'dark'){
    document.getElementById("cardBorder").style.backgroundImage =  "linear-gradient(to bottom right, #333, #888)";
  }else if(pokeData.Type == 'dragon'){
    document.getElementById("cardBorder").style.backgroundImage =  "linear-gradient(to bottom right, purple, lavender)";
  }else if(pokeData.Type == 'steel'){
    document.getElementById("cardBorder").style.backgroundImage =  "linear-gradient(to bottom right, grey, white)";
  }else if(pokeData.Type == 'fairy'){
    document.getElementById("cardBorder").style.backgroundImage =  "linear-gradient(to bottom right, pink, white)";
  }else{
    document.getElementById("cardBorder").style.backgroundImage =  "linear-gradient(to bottom right, grey, white)";
  }

}

