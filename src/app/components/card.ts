import type { PokemonListEntity } from "../../services/pokemon/getPokemonList.service";

interface CardProps {
  pokemon: PokemonListEntity;
}

export function Card(props: CardProps) {
  const { pokemon } = props ?? {};

  if (!pokemon) return null;

  return `
    <div class="card">
        <img class="card__image" src="${pokemon.image}" width="200" height="200" />
        <span class="card__name">${pokemon.name}</span>
    </div>
  `;
}
