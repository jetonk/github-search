import { getRepositories } from "../api/index";

export default {
  namespaced: true,
  state: {
    language: "",
    startDate: "",
    endDate: "",
    stars: "",
    repositories: [],
    filtersSelected: false,
    languages: [],
    loading: false,
    error: null,
    page: 1,
    resultsPerPage: 10,
  },
  mutations: {
    SET_REPOSITORIES(state, { repositories }) {
      state.repositories = repositories;
      state.filtersSelected = true;
    },
    SET_PAGE(state) {
      state.page = state.page + 1;
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    SET_LANGUAGE_VALUE(state, language) {
      state.language = language;
    },
    ADD_LANGUAGE(state, language) {
      state.languages = [...state.languages, language];
      state.language = "";
      state.page = 1;
    },
    SET_START_DATE(state, date) {
      state.startDate = date;
      state.page = 1;
    },
    SET_END_DATE(state, date) {
      state.endDate = date;
      state.page = 1;
    },
    SET_STARS(state, stars) {
      state.stars = stars;
    },
    REMOVE_FILTER(state, language) {
      state.filters[language] = {};
      state.languages = [
        ...state.languages.filter((lang) => lang !== language),
      ];
      state.language = "";
      state.filtersSelected = false;
    },
  },
  actions: {
    async fetchRepositories({ commit, state }) {
      commit("SET_LOADING", true);
      commit("SET_ERROR", null);

      try {
        commit("SET_PAGE");

        const requests = [];
        state.languages.map((language) =>
          requests.push(getRepositories(language, state))
        );

        const response = await Promise.all(requests);

        commit("SET_REPOSITORIES", { repositories: response });
      } catch (error) {
        commit("SET_ERROR", error.message);
      } finally {
        commit("SET_LOADING", false);
      }
    },
    setLanguageValue({ commit }, language) {
      commit("SET_LANGUAGE_VALUE", language);
    },
    addLanguage({ commit }, language) {
      commit("ADD_LANGUAGE", language);
    },
    setStartDate({ commit }, date) {
      commit("SET_START_DATE", date);
    },
    setEndDate({ commit }, date) {
      commit("SET_END_DATE", date);
    },
    setStars({ commit }, stars) {
      commit("SET_STARS", stars);
    },
    removeFilter({ commit }, language) {
      commit("REMOVE_FILTER", language);
    },
  },
  getters: {
    languages: (state) => state.languages,
    repositories: (state) => state.repositories,
    filters: (state) => state.filters,
    loading: (state) => state.loading,
    error: (state) => state.error,
  },
};
