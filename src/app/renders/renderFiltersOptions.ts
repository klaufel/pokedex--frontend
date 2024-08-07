import { getPokemonFiltersListService } from "../../services/pokemon/getPokemonFiltersList.service";
import { renderInput } from "./renderInput";

import { FILTERS } from "../../lib/filters";

export async function renderFiltersOptions(elements: {
  filterTypeElement: HTMLSelectElement;
  filterColorElement: HTMLSelectElement;
  filterGenderElement: HTMLSelectElement;
}): Promise<void> {
  const { filterTypeElement, filterColorElement, filterGenderElement } =
    elements;

  const { type, color, gender } = await getPokemonFiltersListService();

  const filtersTypeTemplate = `<div class="input-group input-group--2-cols">${[
    ...type.map((filter) => renderInput(FILTERS.TYPE, "checkbox", filter)),
  ].join("")}</div>`;

  const filtersColorTemplate = `<div class="input-group input-group--5-cols">${[
    ...color.map((filter) =>
      renderInput(FILTERS.COLOR, "checkbox", filter, "color")
    ),
  ].join("")}</div>`;

  const filtersGenderTemplate = `<div class="input-group input-group--2-cols">${[
    renderInput(FILTERS.GENDER, "radio", { label: "all", checked: true }),
    ...gender.map((filter) => renderInput(FILTERS.GENDER, "radio", filter)),
  ].join("")}</div>`;

  filterTypeElement.insertAdjacentHTML("beforeend", filtersTypeTemplate);
  filterColorElement.insertAdjacentHTML("beforeend", filtersColorTemplate);
  filterGenderElement.insertAdjacentHTML("beforeend", filtersGenderTemplate);
}
