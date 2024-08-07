import { API_ROUTES_FILTERS } from "../../lib/api";

import type { PokemonListEntity } from "./entities/PokemonList.entity";
import type { PokemonFiltersListEntity } from "./entities/PokemonFiltersList.entity";
import type {
  PokemonFilteredTypeApiResponse,
  PokemonFilteredColorApiResponse,
  PokemonFilteredGenderApiResponse,
} from "./entities/response/PokemonFilteredApiResponse";

const _getPokemonByType = async (id: string): Promise<string[]> => {
  const apiUrl = API_ROUTES_FILTERS.TYPE.replace("{{id}}", id);
  const response = await fetch(apiUrl, { cache: "force-cache" });
  const data = (await response.json()) as PokemonFilteredTypeApiResponse;
  return data.pokemon.map(({ pokemon }) => pokemon.name);
};

const _getPokemonByColor = async (id: string): Promise<string[]> => {
  const apiUrl = API_ROUTES_FILTERS.COLOR.replace("{{id}}", id);
  const response = await fetch(apiUrl, { cache: "force-cache" });
  const data = (await response.json()) as PokemonFilteredColorApiResponse;
  return data.pokemon_species.map(({ name }) => name);
};

const _getPokemonByGender = async (id: string): Promise<string[]> => {
  const apiUrl = API_ROUTES_FILTERS.GENDER.replace("{{id}}", id);
  const response = await fetch(apiUrl, { cache: "force-cache" });
  const data = (await response.json()) as PokemonFilteredGenderApiResponse;
  return data.pokemon_species_details.map(
    ({ pokemon_species }) => pokemon_species.name
  );
};

const _getPokemonByQuery = (
  query: string,
  pokemons: PokemonListEntity[] = []
): PokemonListEntity[] => {
  console.log("aquo", query);
  if (!query) return pokemons;

  return pokemons.filter(({ id, name }) => {
    return name.toLowerCase().includes(query) || id.toString().includes(query);
  });
};

const _getCommonPokemons = (arrays: string[][]): string[] => {
  if (arrays.length === 0) return [];

  return arrays.reduce((acc, currentArray) => {
    return currentArray.length > 0
      ? acc.filter((value) => currentArray.includes(value))
      : acc;
  }, arrays[0]);
};

export async function getPokemonFilteredService(params: {
  filters: PokemonFiltersListEntity;
  query?: string;
  pokemons: PokemonListEntity[];
}): Promise<PokemonListEntity[]> {
  const { filters, query, pokemons = [] } = params;

  if (!filters.color.length && !filters.type.length && !filters.gender.length) {
    return query ? _getPokemonByQuery(query, pokemons) : pokemons;
  }

  try {
    const fetchPokemons = async (
      filter: string[],
      fetchFunction: (filter: string) => Promise<string[]>
    ) => {
      return filter.length ? Promise.all(filter.map(fetchFunction)) : [];
    };

    const response = await Promise.all([
      fetchPokemons(filters.type, _getPokemonByType),
      fetchPokemons(filters.color, _getPokemonByColor),
      fetchPokemons(filters.gender, _getPokemonByGender),
    ]);

    const data = response
      .map((filter) => filter.flat())
      .filter((filter) => filter.length > 0);

    const commonPokemons = _getCommonPokemons(data);
    const pokemonFiltered = pokemons.filter((pokemon) =>
      commonPokemons.includes(pokemon.name)
    );

    return query ? _getPokemonByQuery(query, pokemonFiltered) : pokemonFiltered;
  } catch {
    return [];
  }
}
