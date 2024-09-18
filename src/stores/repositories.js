export default {
  namespaced: true,
  state: {
    repositories: [],
    loading: false,
    error: null,
  },
  mutations: {
    SET_REPOSITORIES(state, repositories) {
      state.repositories = repositories;
    },
    SET_LOADING(state, loading) {
      console.log("loading", loading);
      state.loading = loading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
  },
  actions: {
    async fetchRepositories({ commit }, filters) {
      commit("SET_LOADING", true);
      commit("SET_ERROR", null); // Reset error state before fetching
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

        commit("SET_REPOSITORIES", items);
      } catch (error) {
        commit("SET_ERROR", error.message);
      } finally {
        commit("SET_LOADING", false);
      }
    },
  },
  getters: {
    repositories: (state) => state.repositories,
    loading: (state) => state.loading,
    error: (state) => state.error,
  },
};
