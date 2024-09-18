<template>
  <div>
    <AutoComplete
      placeholder="Search language"
      v-model="value"
      :suggestions="filteredItems"
      optionLabel="name"
      @complete="handleSearch"
      @item-select="onItemSelect"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";

// components
import AutoComplete from "primevue/autocomplete";
import languages from "../utils/languages";

const store = useStore();
const value = ref("");
const filteredItems = ref();

const handleSearch = (event) => {
  setTimeout(() => {
    if (!event.query.trim().length) {
      filteredItems.value = [...languages.value];
    } else {
      filteredItems.value = languages.filter((lang) => {
        return lang.name.toLowerCase().startsWith(event.query.toLowerCase());
      });
    }
  }, 250);
};

const onItemSelect = (event) => {
  const selectedItem = event.value;
  store.dispatch("repositories/setLanguage", { language: selectedItem.name });
};
</script>
