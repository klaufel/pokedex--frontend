import { API_BASE_URL, API_ROUTES } from "../../lib/api";

import { fromPokemonListApiReponseToPokemonListEntityMapper } from "./mappers/fromPokemonListApiReponseToPokemonListEntity.mapper";

import type { PokemonListApiResponse } from "./entities/response/PokemonListApiResponse";
import type { PokemonListEntity } from "./entities/PokemonList.entity";

export async function getPokemonListService(): Promise<PokemonListEntity[]> {
  try {
    const apiUrl = `${API_BASE_URL}/${API_ROUTES.POKEMON.LIST}`;
    const response = await fetch(apiUrl);
    const data = (await response.json()) as PokemonListApiResponse;

    const results = data.pokemon_entries.map(
      fromPokemonListApiReponseToPokemonListEntityMapper
    );

    return results;
  } catch {
    return [];
  }
}
