import type { PokemonListEntity } from "../../services/pokemon/entities/PokemonList.entity";

export function renderCard(pokemon: PokemonListEntity): string {
  return `
    <div class="card">
      <span class="card__number"># ${pokemon.id}</span> 
      <img class="card__image" src="${pokemon.image}" alt="${pokemon.name}" width="144" height="144" />
      <h2 class="card__name">${pokemon.name}</h2>
    </div>
  `;
}

export function renderCardSkeleton(): string {
  return `
    <div class="card-skeleton">
      <span class="card-skeleton__image"></span>
      <span class="card-skeleton__name"></span>
    </div>
  `;
}
