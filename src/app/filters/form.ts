import { INITIAL_FILTERS } from "../../lib/filters";
import type { PokemonFiltersListEntity } from "../../services/pokemon/entities/PokemonFiltersList.entity";

export function getFiltersValues(form: HTMLFormElement): {
  filters: PokemonFiltersListEntity;
} {
  const formData = new FormData(form);

  const filters = Array.from(formData.entries()).reduce((acc, [key, value]) => {
    const stringValue = value as string;
    if (stringValue.trim() !== "") {
      return {
        ...acc,
        [key]: acc[key] ? [...acc[key], stringValue] : [stringValue],
      };
    }
    return acc;
  }, {} as { [key: string]: string[] });

  return { filters: { ...INITIAL_FILTERS, ...filters } };
}
