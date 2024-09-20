<template>
  <div>
    <div v-if="filtersSelected" class="headline">
      <h3>Github Repositories</h3>
      <div>Between: {{ startDate }} and {{ endDate }}</div>
      <div>With at least {{ stars }} stars</div>
    </div>

    <div v-if="error">Error: {{ error }}</div>

    <div v-else class="card-container">
      <Card class="card" v-for="repository in repositories">
        <template #title>
          {{ repository.language }}
        </template>
        <template #content>
          <VirtualScroller
            :items="repository.items"
            :itemSize="50"
            :showLoader="true"
            :loading="loading"
            :dropdown="true"
            class="border border-surface-200 dark:border-surface-700 rounded"
            style="width: 270px; height: 99vh"
          >
            <template v-slot:item="{ item, options }">
              <div class="card-item">
                <a :href="item.html_url" target="_blank">{{
                  item.full_name
                }}</a>
                <div>{{ item.description }}</div>
                <div>
                  Created: {{ formatDateString(new Date(item.created_at)) }}
                </div>
                <div>⭐ {{ item.stargazers_count }}</div>
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

import { formatDateString } from "../utils/date";

const store = useStore();

const filtersSelected = computed(
  () => store.state.repositories.filtersSelected
);

const filters = computed(() => store.getters["repositories/filters"]);
const repositories = computed(() => store.state.repositories.repositories);
const loading = computed(() => store.state.repositories.loading);
const startDate = computed(() =>
  formatDateString(store.state.repositories.startDate)
);
const endDate = computed(() =>
  formatDateString(store.state.repositories.endDate)
);
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
