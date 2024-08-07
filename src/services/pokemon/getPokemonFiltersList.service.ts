import { API_BASE_URL, API_ROUTES } from "../../lib/api";
import { FILTERS } from "../../lib/filters";

import type { PokemonFiltersListEntity } from "./entities/PokemonFiltersList.entity";
import type { PokemonFiltersListApiResponse } from "./entities/response/PokemonFiltersListApiResponse";

import { fromPokemonFiltersApiReponseToPokemonListEntityMapper } from "./mappers/fromPokemonFiltersToPokemonFiltersEntity.mapper";

export async function getPokemonFiltersListService(): Promise<PokemonFiltersListEntity> {
  try {
    const response = await Promise.all(
      [
        `${API_BASE_URL}/${API_ROUTES.POKEMON.FILTERS.TYPE.LIST}`,
        `${API_BASE_URL}/${API_ROUTES.POKEMON.FILTERS.COLOR.LIST}`,
        `${API_BASE_URL}/${API_ROUTES.POKEMON.FILTERS.GENDER.LIST}`,
      ].map((url) => fetch(url, { cache: "force-cache" }))
    );

    const [{ results: type }, { results: color }, { results: gender }] =
      await Promise.all(
        response.map((response) => {
          return response.json() as unknown as PokemonFiltersListApiResponse;
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
