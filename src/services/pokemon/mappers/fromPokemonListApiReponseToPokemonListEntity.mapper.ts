import { IMAGES_DICTIONARY } from "../../../lib/multimedia";

import type { PokemonListEntity } from "../entities/PokemonList.entity";
import type { PokemonListEntriesApiResponse } from "../entities/response/PokemonListApiResponse";

export function fromPokemonListApiReponseToPokemonListEntityMapper(
  pokemonListApiResponse: PokemonListEntriesApiResponse
): PokemonListEntity {
  const id = pokemonListApiResponse.entry_number;

  const pokemonEntity: PokemonListEntity = {
    id,
    name: pokemonListApiResponse.pokemon_species.name,
    image: IMAGES_DICTIONARY.DETAIL.replace(
      "{{id}}",
      id.toString().padStart(3, "0")
    ),
  };

  return pokemonEntity;
}
