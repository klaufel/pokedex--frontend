export type PokemonFiltersListResultsApiResponse = {
  name: string;
  url: string;
};

export type PokemonFiltersListApiResponse = {
  results: PokemonFiltersListResultsApiResponse[];
};
