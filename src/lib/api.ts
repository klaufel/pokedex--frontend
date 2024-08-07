import { FILTERS_DICTIONARY } from "./filters";

export const API_BASE_URL = "https://pokeapi.co/api/v2" as const;

export const API_ROUTES = {
  POKEMON: {
    LIST: "pokedex/national",
    FILTERS: {
      [FILTERS_DICTIONARY.TYPE]: {
        LIST: "type",
        DETAIL: "type/{{id}}",
      },
      [FILTERS_DICTIONARY.COLOR]: {
        LIST: "pokemon-color",
        DETAIL: "pokemon-color/{{id}}",
      },
      [FILTERS_DICTIONARY.GENDER]: {
        LIST: "gender",
        DETAIL: "gender/{{id}}",
      },
    },
  },
} as const;

export const API_ROUTES_FILTERS = {
  [FILTERS_DICTIONARY.TYPE]: `${API_BASE_URL}/${API_ROUTES.POKEMON.FILTERS.TYPE.DETAIL}`,
  [FILTERS_DICTIONARY.COLOR]: `${API_BASE_URL}/${API_ROUTES.POKEMON.FILTERS.COLOR.DETAIL}`,
  [FILTERS_DICTIONARY.GENDER]: `${API_BASE_URL}/${API_ROUTES.POKEMON.FILTERS.GENDER.DETAIL}`,
} as const;
