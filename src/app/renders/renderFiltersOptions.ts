import { getPokemonFiltersService } from "../../services/pokemon/getPokemonFilters.service";
import { renderInput } from "./renderInput";

import { FILTERS_KEYS } from "../../lib/filters";

export async function renderFiltersOptions(elements: {
  filterTypeElement: HTMLSelectElement;
  filterColorElement: HTMLSelectElement;
  filterGenderElement: HTMLSelectElement;
}): Promise<void> {
  const { filterTypeElement, filterColorElement, filterGenderElement } =
    elements;

  const { type, color, gender } = await getPokemonFiltersService();

  const filtersTypeTemplate = `<div class="input-group input-group--2-cols">${[
    ...type.map((filter) => renderInput(FILTERS_KEYS.TYPE, "checkbox", filter)),
  ].join("")}</div>`;

  const filtersColorTemplate = `<div class="input-group input-group--5-cols">${[
    ...color.map((filter) =>
      renderInput(FILTERS_KEYS.COLOR, "checkbox", filter, "color")
    ),
  ].join("")}</div>`;

  const filtersGenderTemplate = `<div class="input-group input-group--2-cols">${[
    renderInput(FILTERS_KEYS.GENDER, "radio", { label: "all", checked: true }),
    ...gender.map((filter) =>
      renderInput(FILTERS_KEYS.GENDER, "radio", filter)
    ),
  ].join("")}</div>`;

  filterTypeElement.insertAdjacentHTML("beforeend", filtersTypeTemplate);
  filterColorElement.insertAdjacentHTML("beforeend", filtersColorTemplate);
  filterGenderElement.insertAdjacentHTML("beforeend", filtersGenderTemplate);
}
