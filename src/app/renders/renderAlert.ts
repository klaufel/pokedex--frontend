import { IMAGES_DICTIONARY } from "../../lib/multimedia";

export function renderAlert() {
  const image = IMAGES_DICTIONARY.DETAIL.replace("{{id}}", "201");

  return `
    <div class="alert">
      <img class="alert__image" src="${image}" alt="Pokémon Unown" width="160" height="160" />
      <p class="alert__title">There are no "unown" pokemon with those filters</p>
    </div>
  `;
}
