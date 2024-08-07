export const getPokemonListServiceApiResponse = {
  pokemon_entries: [
    {
      entry_number: 1,
      pokemon_species: {
        name: "bulbasaur",
        url: "https://pokeapi.co/api/v2/pokemon-species/1/",
      },
    },
    {
      entry_number: 2,
      pokemon_species: {
        name: "ivysaur",
        url: "https://pokeapi.co/api/v2/pokemon-species/2/",
      },
    },
  ],
};

export const getPokemonListServiceEmptyApiResponse = {
  pokemon_entries: [],
};

export const getPokemonListServiceResponse = [
  {
    id: 1,
    name: "bulbasaur",
    image: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png",
  },
  {
    id: 2,
    name: "ivysaur",
    image: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/002.png",
  },
];
