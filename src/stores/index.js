import { createStore } from "vuex";
import repositories from "./repositories";

const store = createStore({
  modules: {
    repositories,
  },
});

export default store;
