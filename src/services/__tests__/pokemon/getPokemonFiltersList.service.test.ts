import { getPokemonFiltersListService } from "../../pokemon/getPokemonFiltersList.service";
import {
  getPokemonFiltersListServiceColorApiResponse,
  getPokemonFiltersListServiceEmptyApiResponse,
  getPokemonFiltersListServiceGenderApiResponse,
  getPokemonFiltersListServiceResponse,
  getPokemonFiltersListServiceTypeApiResponse,
} from "./fixtures/getPokemonFiltersList.service.fixture";

declare var global: any;

global.fetch = jest.fn();

describe("[@services] - getPokemonFiltersListService()", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return the pokemon filters list", async () => {
    const mockResponses = [
      {
        status: 200,
        json: jest
          .fn()
          .mockResolvedValue(getPokemonFiltersListServiceTypeApiResponse),
      },
      {
        status: 200,
        json: jest
          .fn()
          .mockResolvedValue(getPokemonFiltersListServiceColorApiResponse),
      },
      {
        status: 200,
        json: jest
          .fn()
          .mockResolvedValue(getPokemonFiltersListServiceGenderApiResponse),
      },
    ];
    mockResponses.forEach((mock) => {
      (fetch as jest.Mock).mockImplementationOnce(() => Promise.resolve(mock));
    });
    const response = await getPokemonFiltersListService();
    expect(response).toEqual(getPokemonFiltersListServiceResponse);
  });

  it("should return the empty pokemon filters list", async () => {
    const mockResponses = [
      {
        status: 200,
        json: jest
          .fn()
          .mockResolvedValue(getPokemonFiltersListServiceEmptyApiResponse),
      },
      {
        status: 200,
        json: jest
          .fn()
          .mockResolvedValue(getPokemonFiltersListServiceEmptyApiResponse),
      },
      {
        status: 200,
        json: jest
          .fn()
          .mockResolvedValue(getPokemonFiltersListServiceEmptyApiResponse),
      },
    ];
    mockResponses.forEach((mock) => {
      (fetch as jest.Mock).mockImplementationOnce(() => Promise.resolve(mock));
    });
    const response = await getPokemonFiltersListService();
    expect(response).toEqual({ type: [], color: [], gender: [] });
  });

  describe("when server errors", () => {
    it("should handle a 404 error", async () => {
      const mockResponses = [
        { ok: false, status: 404 },
        { ok: false, status: 404 },
        { ok: false, status: 404 },
      ];
      mockResponses.forEach((mock) => {
        (fetch as jest.Mock).mockImplementationOnce(() =>
          Promise.resolve(mock)
        );
      });
      const response = await getPokemonFiltersListService();
      expect(response).toEqual({ type: [], color: [], gender: [] });
    });

    it("should handle a 500 error", async () => {
      const mockResponses = [
        { ok: false, status: 500 },
        { ok: false, status: 500 },
        { ok: false, status: 500 },
      ];
      mockResponses.forEach((mock) => {
        (fetch as jest.Mock).mockImplementationOnce(() =>
          Promise.resolve(mock)
        );
      });
      const response = await getPokemonFiltersListService();
      expect(response).toEqual({ type: [], color: [], gender: [] });
    });
  });
});
