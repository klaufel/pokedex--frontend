import { getPokemonListService } from "../../pokemon/getPokemonList.service";
import {
  getPokemonListServiceApiResponse,
  getPokemonListServiceEmptyApiResponse,
  getPokemonListServiceResponse,
} from "./fixtures/getPokemonList.service.fixture";

declare var global: any;

global.fetch = jest.fn();

describe("[@services] - getPokemonListService()", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return the pokemon list", async () => {
    const mock = {
      status: 200,
      json: jest.fn().mockResolvedValue(getPokemonListServiceApiResponse),
    };
    (fetch as jest.Mock).mockResolvedValue(mock);
    const response = await getPokemonListService();
    expect(response).toEqual(getPokemonListServiceResponse);
  });

  it("should return the empty pokemon list", async () => {
    const mock = {
      status: 200,
      json: jest.fn().mockResolvedValue(getPokemonListServiceEmptyApiResponse),
    };
    (fetch as jest.Mock).mockResolvedValue(mock);
    const response = await getPokemonListService();
    expect(response).toEqual([]);
  });

  describe("when server errors", () => {
    it("should handle a 404 error", async () => {
      const mock = { ok: false, status: 404 };
      (fetch as jest.Mock).mockResolvedValue(mock);
      const response = await getPokemonListService();
      expect(response).toEqual([]);
    });

    it("should handle a 500 error", async () => {
      const mock = { ok: false, status: 500 };
      (fetch as jest.Mock).mockResolvedValue(mock);
      const response = await getPokemonListService();
      expect(response).toEqual([]);
    });
  });
});
