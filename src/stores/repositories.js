import { formatDateString } from "../utils/date";

export default {
  namespaced: true,
  state: {
    language: "",
    startDate: "",
    endDate: "",
    stars: "",
    filters: {},
    languages: [],
    loading: false,
    error: null,
    page: 1,
    resultsPerPage: 10,
  },
  mutations: {
    SET_REPOSITORIES(state, { repositories, filter }) {
      const { language } = state;
      state.filters[language] = {
        ...filter,
        repositories: repositories,
      };
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
    SET_LANGUAGE(state, language) {
      console.log("SET_LANGUAGE", language);

      state.language = language;
      state.languages = [...state.languages, language];
    },
    SET_START_DATE(state, date) {
      state.startDate = formatDateString(date);
    },
    SET_END_DATE(state, date) {
      state.endDate = formatDateString(date);
    },
    SET_FILTER(state, { filter }) {
      state.filters[filter] = {
        language: state.language,
        from: "",
        to: "",
        stars: 100,
      };
    },
    SET_STARS(state, stars) {
      state.stars = stars;
    },
    REMOVE_FILTER(state, { filter }) {
      state.filters = { ...state.filters };
      state.languages = state.languages.filter(
        (language) => language !== filter
      );
      state.language = "";
      state.startDate = "";
      state.endDate = "";
      state.stars = "";
      state.page = 1;
    },
  },
  actions: {
    async fetchRepositories({ commit, state }, filter) {
      const { language, startDate, endDate, page, resultsPerPage } = state;
      commit("SET_LOADING", true);
      commit("SET_ERROR", null);
      const url = `https://api.github.com/search/repositories?q=language:${language}+stars:>=${filter.stars}+created:${startDate}..${endDate}&sort=stars&order=desc&page=${page}&per_page=${resultsPerPage}`;

      try {
        commit("SET_PAGE");
        const response = await fetch(url, {
          headers: {
            Accept: "application/vnd.github+json",
            Authorization: `Bearer ${import.meta.env.VITE_GITHUB_PAT}`,
            "X-GitHub-Api-Version": "2022-11-28",
          },
        });

        const { items } = await response.json();
        commit("SET_REPOSITORIES", { repositories: items, filter });
      } catch (error) {
        commit("SET_ERROR", error.message);
      } finally {
        commit("SET_LOADING", false);
      }
    },
    setLanguage({ commit }, language) {
      commit("SET_LANGUAGE", language);
    },
    setFilter({ commit }, language) {
      commit("SET_FILTER", language);
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
    removeFilter({ commit }, filter) {
      commit("REMOVE_FILTER", filter);
    },
  },
  getters: {
    repositories: (state) => state.repositories,
    filters: (state) => state.filters,
    loading: (state) => state.loading,
    error: (state) => state.error,
  },
};
