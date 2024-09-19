<template>
  <div>
    <div v-if="languages.length > 0" class="headline">
      <h3>Github Repositories</h3>
      <div>Between: {{ startDate }} and {{ endDate }}</div>
      <div>With at least {{ stars }} stars</div>
    </div>
    <div v-if="error">Error: {{ error }}</div>
    <div v-else class="card-container">
      <Card class="card" v-for="(filter, key) in filters" :key="key">
        <template #title>
          {{ key }}
        </template>
        <template #content>
          <VirtualScroller
            :items="filter.repositories"
            :itemSize="50"
            :showLoader="true"
            :loading="loading"
            class="border border-surface-200 dark:border-surface-700 rounded"
            style="width: 270px; height: 99vh"
          >
            <template v-slot:item="{ item, options }">
              <div class="card-item">
                {{ item.name }} /
                <a :href="item.html_url" target="_blank">{{
                  item.full_name
                }}</a>
                {{ item.description }}
                ⭐ {{ item.stargazers_count }}
              </div>
            </template>
          </VirtualScroller>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import VirtualScroller from "primevue/virtualscroller";

// components
import Card from "primevue/card";

const store = useStore();

const filters = computed(() => store.state.repositories.filters);
const languages = computed(() => store.state.repositories.languages);
const loading = computed(() => store.state.repositories.loading);
const startDate = computed(() => store.state.repositories.startDate);
const endDate = computed(() => store.state.repositories.endDate);
const stars = computed(() => store.state.repositories.stars);

const error = computed(() => store.getters["repositories/error"]);
</script>

<style scoped>
.headline {
  padding: 15px;
}
.card-container {
  display: flex;
}
.card {
  width: 300px;
  margin-left: 15px;
}
.card-item {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-top: 15px;
}
</style>
