<template>
  <h3>Filters</h3>
  <Chip
    v-for="(value, key) in filters"
    :key="key"
    :label="filters[key].language"
    removable
    @remove="handleChipRemove"
  />
  <SearchBar />

  <div>From: <DatePicker v-model="startDate" /></div>
  <div>To: <DatePicker v-model="endDate" /></div>
  <div>Stars: <input type="number" v-model="stars" /></div>
  <Button label="Search" @click="search" />
</template>
<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";

import SearchBar from "../components/SearchBar.vue";
import Chip from "primevue/chip";
import DatePicker from "primevue/datepicker";
import Button from "primevue/button";

const store = useStore();
const startDate = ref();
const endDate = ref();
const stars = ref();

const filters = computed(() => store.getters["repositories/filters"]);
const language = computed(() => store.getters["repositories/language"]);

const handleChipRemove = (filter) => {
  store.dispatch("repositories/removeFilter", filter);
};

function search() {
  console.log("startDate", startDate);

  store.dispatch("repositories/fetchRepositories", {
    startDate: startDate.value,
    endDate: endDate.value,
    stars: stars.value,
  });
}
</script>
