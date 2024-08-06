import { FILTERS_KEYS } from "../lib/filters";
import type { PokemonListEntity } from "../services/pokemon/entities/PokemonList.entity";

import { getPokemonListService } from "../services/pokemon/getPokemonList.service";
import { getPokemonByType, getPokemonByColor, getPokemonByGender } from "./api";
import { renderAlert } from "./renders/renderAlert";

import { renderCard, renderCardSkeleton } from "./renders/renderCard";
import { renderFiltersOptions } from "./renders/renderFiltersOptions";
import { renderTitle } from "./renders/renderTitle";

const searchInput = document.getElementById("searchInput") as HTMLInputElement;

const filterTypeElement = document.getElementById(
  "typeFilter"
) as HTMLSelectElement;
const filterColorElement = document.getElementById(
  "colorFilter"
) as HTMLSelectElement;
const filterGenderElement = document.getElementById(
  "filterGender"
) as HTMLSelectElement;

const pokemonList = document.getElementById("pokemonList") as HTMLDivElement;
const loadMore = document.getElementById("loadMore") as HTMLButtonElement;

const PAGE_INITIAL = 1;
const LIMIT_INITIAL = 8;
const SKELETONS = LIMIT_INITIAL;

let allPokemons: PokemonListEntity[] = [];
let displayedPokemons: PokemonListEntity[] = [];
let page: number = PAGE_INITIAL;
let limit: number = LIMIT_INITIAL;

async function initialize(): Promise<void> {
  await renderFiltersOptions({
    filterColorElement,
    filterGenderElement,
    filterTypeElement,
  });
  showSkeletons();
  allPokemons = await getPokemonListService();
  displayedPokemons = allPokemons || [];
  renderPokemonList();
  attachListeners();
}

function showSkeletons() {
  const pokemonsPagination = displayedPokemons.slice(0, limit * page);
  const skeletons = [...new Array(SKELETONS)].map(renderCardSkeleton).join("");

  const template = `
    <div class="grid">
      ${renderTitle(pokemonsPagination.length, displayedPokemons?.length)}
      <div class="grid__list">${skeletons}</div>
    </div>
  `;

  pokemonList.innerHTML = template;
}

function attachListeners(): void {
  searchInput.addEventListener("input", handleFilterChange);
  filterTypeElement.addEventListener("change", handleFilterChange);
  filterColorElement.addEventListener("change", handleFilterChange);
  filterGenderElement.addEventListener("change", handleFilterChange);

  loadMore.addEventListener("click", handleLoadMore);
}

function toggleLoadMoreButton() {
  const isHidden = limit * page >= displayedPokemons.length;
  loadMore.style.display = isHidden ? "none" : "flex";
}

function handleLoadMore() {
  page++;
  renderPokemonList();
}

function getSelectedInputValue(
  element: NodeListOf<HTMLInputElement>
): string[] {
  const selectedInput = Array.from(element).filter(({ checked }) => checked);
  return selectedInput
    ? selectedInput.map(({ value }) => value).filter(Boolean)
    : [];
}

async function handleFilterChange() {
  if (!!allPokemons.length) {
    page = PAGE_INITIAL;
    showSkeletons();

    const searchQuery = searchInput.value.toLowerCase();

    const filterType = document.getElementsByName(
      FILTERS_KEYS.TYPE
    ) as NodeListOf<HTMLInputElement>;

    const filterColor = document.getElementsByName(
      FILTERS_KEYS.COLOR
    ) as NodeListOf<HTMLInputElement>;

    const filterGender = document.getElementsByName(
      FILTERS_KEYS.GENDER
    ) as NodeListOf<HTMLInputElement>;

    const filterTypeValue = getSelectedInputValue(filterType);
    const filterColorValue = getSelectedInputValue(filterColor);
    const filterGenderValue = getSelectedInputValue(filterGender);

    let filteredPokemons = allPokemons;

    if (!!filterTypeValue.length) {
      const pokemonsType = await Promise.all(
        filterTypeValue.map(async (type) => {
          return await getPokemonByType(type);
        })
      );

      filteredPokemons = filteredPokemons.filter((pokemon) =>
        pokemonsType.flat().some(({ name }) => name === pokemon.name)
      );
    }

    if (!!filterColorValue.length) {
      const pokemonsColor = await Promise.all(
        filterColorValue.map(async (color) => {
          return await getPokemonByColor(color);
        })
      );
      filteredPokemons = filteredPokemons.filter((pokemon) =>
        pokemonsColor.flat().some(({ name }) => name === pokemon.name)
      );
    }
    if (!!filterGenderValue.length) {
      const pokemonsGender = await Promise.all(
        filterGenderValue.map(async (gender) => {
          return await getPokemonByGender(gender);
        })
      );

      filteredPokemons = filteredPokemons.filter((pokemon) =>
        pokemonsGender.flat().some(({ name }) => name === pokemon.name)
      );
    }

    if (searchQuery) {
      filteredPokemons = filteredPokemons.filter((pokemon) => {
        return (
          pokemon.name.toLowerCase().includes(searchQuery) ||
          pokemon.id.toString().includes(searchQuery)
        );
      });
    }

    displayedPokemons =
      allPokemons.filter((pokemon) =>
        filteredPokemons.some((fp) => fp.name === pokemon.name)
      ) || [];

    renderPokemonList();
    window.scrollTo(0, 0);
  }
}

function renderPokemonList() {
  toggleLoadMoreButton();
  const pokemonsPagination = displayedPokemons.slice(0, limit * page);
  const pokemonsCard = pokemonsPagination.map(renderCard).join("");

  const hasPokemons = !!displayedPokemons.length;

  const template = `
    <div class="grid">
      ${renderTitle(pokemonsPagination.length, displayedPokemons?.length)}
      ${!hasPokemons ? renderAlert() : ""}
      <div class="grid__list">
        ${hasPokemons ? pokemonsCard : ""}
      </div>
    </div>
  `;

  pokemonList.innerHTML = template;
}

initialize();
