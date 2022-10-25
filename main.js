fetch('https://pokeapi.co/api/v2/pokemon-species/ditto')
  .then((response) => response.json())
  .then((data) => console.log(data.flavor_text_entries[0].flavor_text));


fetch('https://pokeapi.co/api/v2/pokemon-species/ditto')
  .then((response) => response.json())
  .then((data) => console.log(data.name));