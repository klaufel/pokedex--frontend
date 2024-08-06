export type PokemonListEntriesApiResponse = {
  entry_number: number;
  pokemon_species: {
    name: string;
    url: string;
  };
};

export type PokemonListApiResponse = {
  pokemon_entries: PokemonListEntriesApiResponse[];
};
