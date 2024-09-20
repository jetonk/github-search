<template>
  <AutoComplete
    placeholder="Search language"
    v-model="language"
    :suggestions="filteredItems"
    optionLabel="name"
    @complete="handleSearch"
    @item-select="onItemSelect"
    class="custom-autocomplete"
  />
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";

// components
import AutoComplete from "primevue/autocomplete";
import languages from "../utils/languages";

import { useRepository } from "../composables/useRepository";

const store = useStore();
const language = useRepository("language", "setLanguageValue");

const filteredItems = ref();

const handleSearch = (event) => {
  if (!event.query.trim().length) {
    filteredItems.value = [...languages.value];
  } else {
    filteredItems.value = languages.filter((lang) => {
      return lang.name.toLowerCase().startsWith(event.query.toLowerCase());
    });
  }
};

const onItemSelect = (event) => {
  const selectedItem = event.value;
  store.dispatch("repositories/addLanguage", selectedItem.name);
};
</script>
<style scoped>
.custom-autocomplete {
  --input-width: 100%;
}

.custom-autocomplete ::v-deep .p-inputtext {
  width: var(--input-width);
}
</style>
