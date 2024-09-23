<template>
  <div class="filter-chips">
    <h3>Filters</h3>
    <Chip
      v-for="language in languages"
      :key="language"
      :label="language"
      removable
      @remove="handleChipRemove(language)"
      class="custom-chip"
    />
  </div>
  <div class="filter-container">
    <SearchBar />
    <span class="error" v-if="$v.language.$error">Language is required</span>

    <DatePicker v-model="startDate" placeholder="Date from" />
    <span class="error" v-if="$v.startDate.$error">Start date is required</span>

    <DatePicker v-model="endDate" placeholder="Date to" />
    <span class="error" v-if="$v.endDate.$error">End date is required</span>

    <InputText type="number" v-model="stars" placeholder="Stars" />
    <span class="error" v-if="$v.stars.$error">Stars are required</span>
    <span class="error" v-if="!$v.stars.minValue"
      >Stars must be at least 0</span
    >

    <Button class="btn-search" label="Search" @click="search" />
  </div>
</template>
<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useVuelidate } from "@vuelidate/core";
import { required, minValue } from "@vuelidate/validators";

import InputText from "primevue/inputtext";

import SearchBar from "../components/SearchBar.vue";
import Chip from "primevue/chip";
import DatePicker from "primevue/datepicker";
import Button from "primevue/button";

import { useRepository } from "../composables/useRepository";

const store = useStore();

const languages = computed(() => store.state.repositories.languages);
const language = computed(() => store.state.repositories.language);

const startDate = useRepository("startDate", "setStartDate");
const endDate = useRepository("endDate", "setEndDate");
const stars = useRepository("stars", "setStars");

const requiredIfNoLanguages = () => {
  return (value) => {
    return languages.value.length > 0 || required(value);
  };
};

const rules = {
  language: { required: requiredIfNoLanguages() },
  startDate: { required },
  endDate: { required },
  stars: { required, minValue: minValue(1) },
};

const $v = useVuelidate(rules, { language, startDate, endDate, stars });

const handleChipRemove = (language) => {
  store.dispatch("repositories/removeFilter", language);
};

function search() {
  $v.value.$touch();

  if (!$v.value.$invalid) {
    store.dispatch("repositories/fetchAllRepositories");
  }
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
