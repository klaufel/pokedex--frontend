export type PokemonFiltersResultsApiResponse = {
  name: string;
  url: string;
};

export type PokemonFiltersApiResponse = {
  results: PokemonFiltersResultsApiResponse[];
};
