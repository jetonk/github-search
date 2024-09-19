import { computed } from "vue";
import { useStore } from "vuex";

export function useRepository(stateProp, action) {
  const module = "repositories";
  const store = useStore();

  return computed({
    get() {
      return store.state[module][stateProp];
    },
    set(value) {
      store.dispatch(`${module}/${action}`, value);
    },
  });
}
