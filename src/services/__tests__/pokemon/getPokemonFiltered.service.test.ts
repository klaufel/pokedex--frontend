import { getPokemonFilteredService } from "../../pokemon/getPokemonFiltered.service";
import { getPokemonFiltersListService } from "../../pokemon/getPokemonFiltersList.service";
import {
  getPokemonFilteredPokemonListQuery,
  getPokemonFilteredPokemonsList,
} from "./fixtures/getPokemonFiltered.service.fixture";
import {
  getPokemonFiltersListServiceColorApiResponse,
  getPokemonFiltersListServiceEmptyApiResponse,
  getPokemonFiltersListServiceGenderApiResponse,
  getPokemonFiltersListServiceResponse,
  getPokemonFiltersListServiceTypeApiResponse,
} from "./fixtures/getPokemonFiltersList.service.fixture";

declare var global: any;

global.fetch = jest.fn();

describe("[@services] - getPokemonFilteredService()", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // it("should return the pokemon filters list", async () => {
  //   const mockResponses = [
  //     {
  //       status: 200,
  //       json: jest
  //         .fn()
  //         .mockResolvedValue(getPokemonFiltersListServiceTypeApiResponse),
  //     },
  //     {
  //       status: 200,
  //       json: jest
  //         .fn()
  //         .mockResolvedValue(getPokemonFiltersListServiceColorApiResponse),
  //     },
  //     {
  //       status: 200,
  //       json: jest
  //         .fn()
  //         .mockResolvedValue(getPokemonFiltersListServiceGenderApiResponse),
  //     },
  //   ];
  //   mockResponses.forEach((mock) => {
  //     (fetch as jest.Mock).mockImplementationOnce(() => Promise.resolve(mock));
  //   });
  //   const response = await getPokemonFiltersListService();
  //   expect(response).toEqual(getPokemonFiltersListServiceResponse);
  // });

  // it("should return the empty pokemon filters list", async () => {
  //   const mockResponses = [
  //     {
  //       status: 200,
  //       json: jest
  //         .fn()
  //         .mockResolvedValue(getPokemonFiltersListServiceEmptyApiResponse),
  //     },
  //     {
  //       status: 200,
  //       json: jest
  //         .fn()
  //         .mockResolvedValue(getPokemonFiltersListServiceEmptyApiResponse),
  //     },
  //     {
  //       status: 200,
  //       json: jest
  //         .fn()
  //         .mockResolvedValue(getPokemonFiltersListServiceEmptyApiResponse),
  //     },
  //   ];
  //   mockResponses.forEach((mock) => {
  //     (fetch as jest.Mock).mockImplementationOnce(() => Promise.resolve(mock));
  //   });
  //   const response = await getPokemonFiltersListService();
  //   expect(response).toEqual({ type: [], color: [], gender: [] });
  // });

  // it("should handle a 404 error", async () => {
  //   const mockResponses = [
  //     { ok: false, status: 404 },
  //     { ok: false, status: 404 },
  //     { ok: false, status: 404 },
  //   ];
  //   mockResponses.forEach((mock) => {
  //     (fetch as jest.Mock).mockImplementationOnce(() => Promise.resolve(mock));
  //   });
  //   const response = await getPokemonFiltersListService();
  //   expect(response).toEqual({ type: [], color: [], gender: [] });
  // });

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
