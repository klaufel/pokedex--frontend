import { API_BASE_URL, API_ROUTES } from "../../lib/api";
import { FILTERS } from "../../lib/filters";

import type { PokemonFiltersEntity } from "./entities/PokemonFilters.entity";
import type { PokemonFiltersApiResponse } from "./entities/response/PokemonFiltersApiResponse";

import { fromPokemonFiltersApiReponseToPokemonListEntityMapper } from "./mappers/fromPokemonFiltersToPokemonFiltersEntity.mapper";

export async function getPokemonFiltersService(): Promise<PokemonFiltersEntity> {
  try {
    const response = await Promise.all([
      fetch(`${API_BASE_URL}/${API_ROUTES.POKEMON.FILTERS.GENDER.LIST}`),
      fetch(`${API_BASE_URL}/${API_ROUTES.POKEMON.FILTERS.COLOR.LIST}`),
      fetch(`${API_BASE_URL}/${API_ROUTES.POKEMON.FILTERS.TYPE.LIST}`),
    ]);

    const [{ results: gender }, { results: color }, { results: type }] =
      await Promise.all(
        response.map((response) => {
          return response.json() as unknown as PokemonFiltersApiResponse;
        })
      );

    const filters = fromPokemonFiltersApiReponseToPokemonListEntityMapper({
      color,
      gender,
      type,
    });

    return filters;
  } catch {
    return { [FILTERS.COLOR]: [], [FILTERS.GENDER]: [], [FILTERS.TYPE]: [] };
  }
}
