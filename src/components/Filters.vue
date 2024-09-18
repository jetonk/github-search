<template>
  <div class="filter-chips">
    <h3>Filters</h3>
    <Chip
      v-for="(value, key) in filters"
      :key="key"
      :label="key"
      removable
      @remove="handleChipRemove"
      class="custom-chip"
    />
  </div>
  <div class="filter-container">
    <SearchBar />
    <DatePicker v-model="startDate" placeholder="Date from" />
    <DatePicker v-model="endDate" placeholder="Date to" />
    <InputText type="number" v-model="stars" placeholder="Stars" />
    <Button class="btn-search" label="Search" @click="search" />
  </div>
</template>
<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import InputText from "primevue/inputtext";

import SearchBar from "../components/SearchBar.vue";
import Chip from "primevue/chip";
import DatePicker from "primevue/datepicker";
import Button from "primevue/button";

const store = useStore();
const startDate = ref();
const endDate = ref();
const stars = ref();

const filters = computed(() => store.getters["repositories/filters"]);

const handleChipRemove = (filter) => {
  store.dispatch("repositories/removeFilter", filter);
};

function search() {
  store.dispatch("repositories/fetchRepositories", {
    startDate: startDate.value,
    endDate: endDate.value,
    stars: stars.value,
  });
}
</script>
<style scoped>
.filter-chips {
  padding: 15px;
}
.filter-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px;
}

.filter-container * {
  margin-top: 5px;
}

.custom-chip {
  flex-shrink: 0;
  flex-grow: 0;
  flex-basis: auto;
}

.btn-search {
  margin-top: 10px;
}
</style>
