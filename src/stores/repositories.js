import { formatDateString } from "../utils/date";
import languages from "../utils/languages";

export default {
  namespaced: true,
  state: {
    language: "",
    startDate: "",
    endDate: "",
    stars: "",
    filters: {},
    filtersSelected: false,
    languages: [],
    loading: false,
    error: null,
    page: 1,
    resultsPerPage: 10,
  },
  mutations: {
    SET_REPOSITORIES(state, { repositories, filter }) {
      const { language } = state;

      state.filters[language.name] = {
        ...filter,
        repositories: repositories,
      };
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
    SET_LANGUAGE(state, language) {
      state.language = language;
      if (language.name) {
        state.languages = [...state.languages, language.name];
        state.filters[language.name] = {
          language: language.name,
        };
      }
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
    SET_FILTER(state, { filter }) {
      state.filters[filter] = {
        language: state.language,
        from: "",
        to: "",
        stars: 0,
      };
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
      const { language, startDate, endDate, stars, page, resultsPerPage } =
        state;

      commit("SET_LOADING", true);
      commit("SET_ERROR", null);

      const startDateFormatted = formatDateString(startDate);
      const endDateFormatted = formatDateString(endDate);
      const url = `https://api.github.com/search/repositories?q=language:${language.name}+stars:>=${stars}+created:${startDateFormatted}..${endDateFormatted}&sort=stars&order=desc&page=${page}&per_page=${resultsPerPage}`;

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

        commit("SET_REPOSITORIES", { repositories: items });
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
