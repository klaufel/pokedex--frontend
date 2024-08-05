import {
  getPokemonListService,
  type PokemonListEntity,
} from "../services/pokemon/getPokemonList.service";

import Layout from "./layout";
import { Card } from "./components/card";

type AppState = {
  page: number;
  limit: number;
  count: number;
  results: PokemonListEntity[];
};

const initialState: AppState = {
  page: 1,
  limit: 1,
  count: 0,
  results: [],
};

const App = {
  state: { ...initialState },
  template() {
    return Layout({
      content: () => {
        const sliceLimit = this.state.page * this.state.limit;
        return `
         <h1 id="counter">${this.state.page}</h1>
         <button class="button" id="reset">RESET</button>
         <div class="grid">
          ${this.state.results
            .slice(0, sliceLimit)
            .map((pokemon) => Card({ pokemon }))
            .join("")}
          </div>
          <button class="button" id="button">Increase</button>
      `;
      },
    });
  },
  async dispatch(action: "GET_POKEMON_LIST" | "NEXT_PAGE" | "RESET") {
    switch (action) {
      case "GET_POKEMON_LIST": {
        const data = await getPokemonListService();
        this.state.results = data?.results || [];
        break;
      }
      case "NEXT_PAGE": {
        this.state.page++;
        break;
      }
      case "RESET": {
        this.state = { ...initialState };
        await this.dispatch("GET_POKEMON_LIST");
        break;
      }
      default: {
        break;
      }
    }
    await this.updateUI();
  },
  render() {
    const appElement = document.getElementById("app");
    if (appElement) {
      appElement.innerHTML = this.template();
    }
  },
  initialize() {
    this.dispatch("GET_POKEMON_LIST");
  },
  updateUI() {
    this.render();
    const button = document.getElementById("button");
    const buttonReset = document.getElementById("reset");
    if (buttonReset) {
      buttonReset.addEventListener("click", () => App.dispatch("RESET"));
    }
    if (button) {
      button.addEventListener("click", () => App.dispatch("NEXT_PAGE"));
    }
  },
};

App.initialize();
