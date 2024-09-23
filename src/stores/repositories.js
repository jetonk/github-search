import { getRepositories } from "../api/index";

export default {
  namespaced: true,
  state: {
    language: "",
    startDate: "2020-01-13",
    endDate: "2024-09-13",
    stars: "123",
    repositories: {},
    fetched: false,
    languages: [],
    loading: {},
    error: {},
    pagination: {},
    totalPages: {},
    resultsPerPage: 10,
  },
  mutations: {
    SET_LOADING(state, { language, isLoading }) {
      if (!state.loading[language]) {
        state.loading[language] = isLoading;
      } else {
        state.loading[language] = isLoading;
      }
    },
    SET_ERROR(state, { language, error }) {
      if (!state.error[language]) {
        state.error[language] = error;
      } else {
        state.error[language] = error;
      }
    },
    SET_PAGINATION(state, { language, page }) {
      state.pagination[language] = page;
    },
    SET_TOTAL_PAGES(state, { language, totalPages }) {
      state.totalPages[language] = totalPages;
    },
    SET_REPOSITORIES(state, { language, repositories }) {
      if (state.repositories[language]) {
        state.repositories[language] = [
          ...state.repositories[language],
          ...repositories,
        ];
      } else {
        state.repositories[language] = repositories;
      }
      state.fetched = true;
    },
    RESET_REPOSITORIES(state, { language }) {
      state.repositories[language] = [];
      state.pagination[language] = 0;
      state.totalPages[language] = null;
      state.error[language] = null;
    },
    SET_LANGUAGE_VALUE(state, language) {
      state.language = language;
    },
    ADD_LANGUAGE(state, language) {
      state.languages = [...state.languages, language];
      state.language = "";
    },
    SET_START_DATE(state, date) {
      state.startDate = date;
    },
    SET_END_DATE(state, date) {
      state.endDate = date;
    },
    SET_STARS(state, stars) {
      state.stars = stars;
    },
    REMOVE_FILTER(state, language) {
      state.languages = [
        ...state.languages.filter((lang) => lang !== language),
      ];
      state.language = "";
      state.fetched = false;
    },
  },
  actions: {
    async fetchRepositories({ commit, state }, { language }) {
      if (state.loading[language]) {
        return;
      }

      commit("SET_LOADING", { language, isLoading: true });
      commit("SET_ERROR", { language, error: null });

      try {
        const currentPage = state.pagination[language] || 0;
        const nextPage = currentPage + 1;

        const { items, totalCount } = await getRepositories(
          language,
          state,
          nextPage
        );

        commit("SET_REPOSITORIES", {
          language,
          repositories: items,
        });

        commit("SET_PAGINATION", { language, page: nextPage });

        if (!state.totalPages[language]) {
          const totalPages = Math.ceil(totalCount / state.resultsPerPage);
          commit("SET_TOTAL_PAGES", { language, totalPages });
        }
      } catch (error) {
        commit("SET_ERROR", { language, error: error.message });
      } finally {
        commit("SET_LOADING", { language, isLoading: false });
      }
    },
    async fetchAllRepositories({ dispatch, state }) {
      const fetchPromises = state.languages.map((language) => {
        dispatch("fetchRepositories", { language });
      });

      await Promise.all(fetchPromises);
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
      commit("RESET_REPOSITORIES", language);
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
