import { getPokemonFilteredService } from "../../pokemon/getPokemonFiltered.service";
import {
  getPokemonFilteredPokemonListQuery,
  getPokemonFilteredPokemonsList,
} from "./fixtures/getPokemonFiltered.service.fixture";

declare let global: any; // eslint-disable-line @typescript-eslint/no-explicit-any

global.fetch = jest.fn();

describe("[@services] - getPokemonFilteredService()", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("when the pokemon list are empty", () => {
    it("should return the empty pokemon filtered list without params", async () => {
      // @ts-expect-error for testing purposes
      const response = await getPokemonFilteredService();
      expect(response).toEqual([]);
    });

    it("should return the empty pokemon filtered list without pokemon list params", async () => {
      const response = await getPokemonFilteredService({
        // @ts-expect-error for testing purposes
        filters: { color: ["red"] },
      });
      expect(response).toEqual([]);
    });
  });

  describe("when the query param", () => {
    it("should return the pokemon list with query param", async () => {
      const response = await getPokemonFilteredService({
        query: "bulba",
        pokemons: getPokemonFilteredPokemonsList,
      });
      expect(response).toEqual(getPokemonFilteredPokemonListQuery);
    });

    it("should return the pokemon list with query param id", async () => {
      const response = await getPokemonFilteredService({
        query: "1",
        pokemons: getPokemonFilteredPokemonsList,
      });
      expect(response).toEqual(getPokemonFilteredPokemonListQuery);
    });
  });
});
