import { FILTERS } from "../../../lib/filters";
import type { PokemonFiltersListEntity } from "../entities/PokemonFiltersList.entity";
import type { PokemonFiltersListResultsApiResponse } from "../entities/response/PokemonFiltersListApiResponse";

export function fromPokemonFiltersApiReponseToPokemonListEntityMapper(response: {
  color: PokemonFiltersListResultsApiResponse[];
  type: PokemonFiltersListResultsApiResponse[];
  gender: PokemonFiltersListResultsApiResponse[];
}): PokemonFiltersListEntity {
  const { color, type, gender } = response;

  const _getFilterNames = (filter: PokemonFiltersListResultsApiResponse) => {
    return filter?.name || "";
  };

  return {
    [FILTERS.COLOR]: color.map(_getFilterNames),
    [FILTERS.GENDER]: gender.map(_getFilterNames),
    [FILTERS.TYPE]: type.map(_getFilterNames),
  };
}
