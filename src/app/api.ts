export async function getPokemonByType(typeId: string): Promise<any[]> {
  const response = await fetch(`https://pokeapi.co/api/v2/type/${typeId}`);
  const data = await response.json();
  return data.pokemon.map((p: any) => p.pokemon);
}

export async function getPokemonByColor(colorId: string): Promise<any[]> {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon-color/${colorId}`
  );
  const data = await response.json();
  return data.pokemon_species.map((p: any) => ({
    name: p.name,
    url: `https://pokeapi.co/api/v2/pokemon/${p.id}`,
  }));
}

export async function getPokemonByGender(genderId: string): Promise<any[]> {
  const response = await fetch(`https://pokeapi.co/api/v2/gender/${genderId}`);
  const data = await response.json();
  return data.pokemon_species_details.map((p: any) => p.pokemon_species);
}
