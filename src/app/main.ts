import type { PokemonListEntity } from "../services/pokemon/entities/PokemonList.entity";
import { getPokemonFilteredService } from "../services/pokemon/getPokemonFiltered.service";
import { getFiltersValues } from "./filters/form";
import { getPokemonListService } from "../services/pokemon/getPokemonList.service";
import { renderAlert } from "./renders/renderAlert";

import { renderCard, renderCardSkeleton } from "./renders/renderCard";
import { renderFiltersOptions } from "./renders/renderFiltersOptions";
import { renderTitle } from "./renders/renderTitle";

const CLASS_ACTIVE = "is-active";

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

const filtersForm = document.getElementById("filtersForm") as HTMLFormElement;
const openFilters = document.getElementById("openFilters") as HTMLButtonElement;
const applyFilters = document.getElementById(
  "applyFilters"
) as HTMLButtonElement;

const pokemonList = document.getElementById("pokemonList") as HTMLDivElement;
const loadMore = document.getElementById("loadMore") as HTMLButtonElement;
const clearFilters = document.getElementById(
  "clearFilters"
) as HTMLButtonElement;

const PAGE_INITIAL = 1;
const LIMIT_INITIAL = 20;
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
  filtersForm.addEventListener("change", handleFilterChange);
  loadMore.addEventListener("click", handleLoadMore);
  clearFilters.addEventListener("click", handleResetFilters);
  openFilters.addEventListener("click", toggleFiltersMobile);
  applyFilters.addEventListener("click", toggleFiltersMobile);
}
function toggleFiltersMobile() {
  filtersForm.classList.toggle(CLASS_ACTIVE);
}

function toggleLoadMoreButton() {
  const isHidden = limit * page >= displayedPokemons.length;
  loadMore.style.display = isHidden ? "none" : "flex";
}

function handleResetFilters(event: MouseEvent) {
  event.preventDefault();
  filtersForm.reset();
  searchInput.value = "";
  filtersForm.classList.remove(CLASS_ACTIVE);
  handleFilterChange();
}

function handleLoadMore() {
  page++;
  renderPokemonList();
}

async function handleFilterChange() {
  if (!!allPokemons.length) {
    page = PAGE_INITIAL;
    showSkeletons();

    const query = searchInput.value.toLowerCase();
    const { filters } = getFiltersValues(filtersForm);

    const pokemonFilteredParams = { query, filters, pokemons: allPokemons };
    const pokemons = await getPokemonFilteredService(pokemonFilteredParams);

    displayedPokemons = pokemons;

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
