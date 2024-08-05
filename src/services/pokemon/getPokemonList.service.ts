import { httpClient } from "../common/httpClient";

type PokemonListApiResponse = {
  pokemon_entries: {
    entry_number: number;
    pokemon_species: {
      name: string;
      url: string;
    };
  }[];
};

export type PokemonListEntity = {
  id: number;
  name: string;
  image: string;
};

export async function getPokemonListService(): Promise<{
  results: PokemonListEntity[];
} | null> {
  try {
    const { data: response } = await httpClient().get<{
      data: PokemonListApiResponse;
    }>("/pokedex/national");

    const results = response.pokemon_entries.map(
      (pokemon): PokemonListEntity => ({
        id: pokemon.entry_number,
        name: pokemon.pokemon_species.name,
        image: `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemon.entry_number
          .toString()
          .padStart(3, "0")}.png`,
      })
    );

    return { results };
  } catch (e) {
    console.log(e);
    return null;
  }
}
