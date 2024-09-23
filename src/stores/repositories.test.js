import Vuex from "vuex";
import repositories from "./repositories";

describe("repositories Vuex module", () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        repositories,
      },
    });
  });

  test("SET_LOADING mutation sets loading state for a new language", () => {
    store.commit("repositories/SET_LOADING", {
      language: "JavaScript",
      isLoading: true,
    });
    expect(store.state.repositories.loading.JavaScript).toBe(true);
  });

  test("SET_LOADING mutation updates loading state for an existing language", () => {
    store.commit("repositories/SET_LOADING", {
      language: "JavaScript",
      isLoading: true,
    });
    store.commit("repositories/SET_LOADING", {
      language: "JavaScript",
      isLoading: false,
    });
    expect(store.state.repositories.loading.JavaScript).toBe(false);
  });

  test("SET_ERROR mutation sets error state for a new language", () => {
    const error = new Error("Test error");
    store.commit("repositories/SET_ERROR", { language: "JavaScript", error });
    expect(store.state.repositories.error.JavaScript).toBe(error);
  });

  test("SET_ERROR mutation updates error state for an existing language", () => {
    const error1 = new Error("Test error 1");
    const error2 = new Error("Test error 2");
    store.commit("repositories/SET_ERROR", {
      language: "JavaScript",
      error: error1,
    });
    store.commit("repositories/SET_ERROR", {
      language: "JavaScript",
      error: error2,
    });
    expect(store.state.repositories.error.JavaScript).toBe(error2);
  });

  test("SET_PAGINATION mutation sets pagination for a language", () => {
    store.commit("repositories/SET_PAGINATION", {
      language: "JavaScript",
      page: 2,
    });
    expect(store.state.repositories.pagination.JavaScript).toBe(2);
  });

  test("SET_TOTAL_PAGES mutation sets total pages for a language", () => {
    store.commit("repositories/SET_TOTAL_PAGES", {
      language: "JavaScript",
      totalPages: 5,
    });
    expect(store.state.repositories.totalPages.JavaScript).toBe(5);
  });
});
