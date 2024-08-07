export type PokemonFilteredTypeApiResponse = {
  pokemon: { pokemon: { name: string } }[];
};

export type PokemonFilteredColorApiResponse = {
  pokemon_species: { name: string }[];
};

export type PokemonFilteredGenderApiResponse = {
  pokemon_species_details: { pokemon_species: { name: string } }[];
};
