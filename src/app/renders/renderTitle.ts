export function renderTitle(current: number = 0, total: number = 0): string {
  const title = `Showing ${current} of ${total} pokemons`;

  return `<h1 class="title">${title}</h1>`;
}
