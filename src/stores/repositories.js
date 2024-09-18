export default {
  namespaced: true,
  state: {
    language: "",
    filters: {},
    loading: false,
    error: null,
  },
  mutations: {
    SET_REPOSITORIES(state, { repositories, filter }) {
      const { language } = state;
      state.filters[language] = {
        ...filter,
        repositories: repositories,
      };
      console.log("SET_REPOSITORIES state", state);
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    SET_LANGUAGE(state, { language }) {
      state.language = language;
    },
    SET_FILTER(state, { filter }) {
      state.filters[filter] = {
        language: state.language,
        from: "",
        to: "",
        stars: 100,
      };
    },
    REMOVE_FILTER(state, { filter }) {
      state.filters = { ...state.filters };
      delete state.filters[filter];
    },
  },
  actions: {
    async fetchRepositories({ commit }, filter) {
      console.log("fetchRepositories filter", filter);

      // commit("SET_FILTER", filter);
      commit("SET_LOADING", true);
      commit("SET_ERROR", null);
      const url =
        "https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc";

      try {
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
