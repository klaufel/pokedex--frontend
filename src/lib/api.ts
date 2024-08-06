export const API_BASE_URL = "https://pokeapi.co/api/v2" as const;

export const API_ROUTES = {
  POKEMON: {
    LIST: "/pokedex/national",
    FILTERS: {
      TYPE: { LIST: "/type", DETAIL: "/type/{{id}}" },
      COLOR: { LIST: "/pokemon-color", DETAIL: "/pokemon-color/{{id}}" },
      GENDER: { LIST: "/gender", DETAIL: "/gender/{{id}}" },
    },
  },
} as const;
