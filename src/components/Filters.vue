<template>
  <div class="filter-chips">
    <h3>Filters</h3>
    <Chip
      v-for="language in languages"
      :key="language"
      :label="language"
      removable
      @remove="handleChipRemove"
      class="custom-chip"
    />
  </div>
  <div class="filter-container">
    <SearchBar :validateLanguage="validateLanguage" />
    <span class="error" v-if="errors.language">{{ errors.language }}</span>
    <DatePicker v-model="startDate" placeholder="Date from" />
    <span class="error" v-if="errors.stars">{{ errors.startDate }}</span>
    <DatePicker v-model="endDate" placeholder="Date to" />
    <span class="error" v-if="errors.stars">{{ errors.endDate }}</span>
    <InputText type="number" v-model="stars" placeholder="Stars" />
    <span class="error" v-if="errors.stars">{{ errors.stars }}</span>
    <Button class="btn-search" label="Search" @click="search" />
  </div>
</template>
<script setup>
import { computed, reactive } from "vue";
import { useStore } from "vuex";
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

const errors = reactive({
  language: "",
  stars: "",
  startDate: "",
  endDate: "",
});

const validateLanguage = computed(() => {
  if (!language.value) {
    errors.language = "Language is required.";
    return false;
  } else {
    errors.language = "";
    return true;
  }
});

const validateStars = computed(() => {
  if (!stars.value) {
    errors.stars = "Stars is required.";
    return false;
  } else {
    errors.stars = "";
    return true;
  }
});

const validateStartDate = computed(() => {
  if (!startDate.value) {
    errors.startDate = "Start date is required.";
    return false;
  } else {
    errors.startDate = "";
    return true;
  }
});

const validateEndDate = computed(() => {
  if (!endDate.value) {
    errors.endDate = "End date is required.";
    return false;
  } else {
    errors.endDate = "";
    return true;
  }
});

const handleChipRemove = (filter) => {
  store.dispatch("repositories/removeFilter", filter);
};

function search() {
  const isLanguageValid = validateLanguage.value;
  const isStarsValid = validateStars.value;
  const isStartDateValid = validateStartDate.value;
  const isEndDateValid = validateEndDate.value;

  if (isLanguageValid && isStarsValid && isStartDateValid && isEndDateValid) {
    store.dispatch("repositories/fetchRepositories", {
      startDate: startDate.value,
      endDate: endDate.value,
      stars: stars.value,
    });
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
