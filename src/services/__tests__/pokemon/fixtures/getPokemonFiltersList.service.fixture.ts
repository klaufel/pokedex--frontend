export const getPokemonFiltersListServiceTypeApiResponse = {
  results: [
    { name: "normal", url: "https://pokeapi.co/api/v2/type/1/" },
    { name: "fighting", url: "https://pokeapi.co/api/v2/type/2/" },
  ],
};

export const getPokemonFiltersListServiceColorApiResponse = {
  results: [
    { name: "black", url: "https://pokeapi.co/api/v2/pokemon-color/1/" },
    { name: "blue", url: "https://pokeapi.co/api/v2/pokemon-color/2/" },
  ],
};

export const getPokemonFiltersListServiceGenderApiResponse = {
  results: [
    { name: "female", url: "https://pokeapi.co/api/v2/gender/1/" },
    { name: "male", url: "https://pokeapi.co/api/v2/gender/2/" },
  ],
};

export const getPokemonFiltersListServiceEmptyApiResponse = {
  results: [],
};

export const getPokemonFiltersListServiceResponse = {
  type: ["normal", "fighting"],
  color: ["black", "blue"],
  gender: ["female", "male"],
};
