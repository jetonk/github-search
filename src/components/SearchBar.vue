<template>
  <AutoComplete
    placeholder="Search language"
    v-model="languageValue"
    :suggestions="filteredItems"
    optionLabel="name"
    @complete="handleSearch"
    @item-select="onItemSelect"
    blur="validateLanguage"
    class="custom-autocomplete"
  />
</template>

<script setup>
import { computed, reactive, ref, defineProps } from "vue";
import { useStore } from "vuex";

// components
import AutoComplete from "primevue/autocomplete";
import languages from "../utils/languages";

defineProps(["validateLanguage"]);

const store = useStore();

const languageValue = computed({
  get() {
    return store.state.repositories.language;
  },
  set(value) {
    if (value.name) {
      store.dispatch("repositories/setLanguage", value.name);
    }
  },
});

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
  // languageValue.set(selectedItem);
  // store.dispatch("repositories/setLanguage", { language: selectedItem.name });
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
