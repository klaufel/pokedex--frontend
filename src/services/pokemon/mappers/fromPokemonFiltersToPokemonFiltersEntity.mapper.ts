import { FILTERS } from "../../../lib/filters";
import type { PokemonFiltersEntity } from "../entities/PokemonFilters.entity";
import type { PokemonFiltersResultsApiResponse } from "../entities/response/PokemonFiltersApiResponse";

export function fromPokemonFiltersApiReponseToPokemonListEntityMapper(response: {
  color: PokemonFiltersResultsApiResponse[];
  type: PokemonFiltersResultsApiResponse[];
  gender: PokemonFiltersResultsApiResponse[];
}): PokemonFiltersEntity {
  const { color, type, gender } = response;

  const _getFilterNames = (filter: PokemonFiltersResultsApiResponse) => {
    return filter?.name || "";
  };

  return {
    [FILTERS.COLOR]: color.map(_getFilterNames),
    [FILTERS.GENDER]: gender.map(_getFilterNames),
    [FILTERS.TYPE]: type.map(_getFilterNames),
  };
}
