<template>
  <div>
    <div v-if="Object.keys(fetched).length > 0" class="headline">
      <h3>Github Repositories</h3>
      <div>Between: {{ startDate }} and {{ endDate }}</div>
      <div>With at least {{ stars }} stars</div>
    </div>
    <div class="card-container">
      <Card class="card" v-for="language in languages" :key="language">
        <template #content v-if="fetched[language]">
          <h3>{{ language }}</h3>
          <div
            ref="listContainer"
            class="list-container"
            @scroll="handleScroll(language)"
            :language="language"
          >
            <div
              v-for="repository in repositories[language]"
              :key="repository.id"
            >
              <div class="card-item">
                <a :href="repository.html_url" target="_blank">{{
                  repository.full_name
                }}</a>
                <div>{{ repository.description }}</div>
                <div>
                  Created:
                  {{ formatDateString(new Date(repository.created_at)) }}
                </div>
                <div>⭐ {{ repository.stargazers_count }}</div>
              </div>
            </div>
            <div v-if="loading[language]" class="loading-more">Loading..</div>
          </div>
        </template>
        <div v-if="error[language]">Error: {{ error }}</div>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";

// components
import Card from "primevue/card";

import { formatDateString } from "../utils/date";

const store = useStore();
const languages = computed(() => store.state.repositories.languages);
const fetched = computed(() => store.state.repositories.fetched);
const repositories = computed(() => store.state.repositories.repositories);
const loading = computed(() => store.state.repositories.loading);
const error = computed(() => store.state.repositories.error);

const startDate = computed(() =>
  formatDateString(store.state.repositories.startDate)
);
const endDate = computed(() =>
  formatDateString(store.state.repositories.endDate)
);
const stars = computed(() => store.state.repositories.stars);

let listContainer = ref(null);

const handleScroll = (language) => {
  const container = listContainer.value;

  if (container) {
    const { scrollTop, scrollHeight, clientHeight } = container.find(
      (elem) => elem.getAttribute("language") === language
    );

    if (scrollTop + clientHeight >= scrollHeight - 5) {
      store.dispatch("repositories/fetchRepositories", { language });
    }
  }
};
</script>
<style scoped>
.headline {
  padding: 15px;
}
.list-container {
  height: 420px;
  overflow-y: auto;
  border: 0.5px solid #ccc;
  border-radius: 4px;
}
.card-container {
  display: flex;
  flex-wrap: wrap;
}
.card {
  width: 300px;
  margin-left: 15px;
}
.card-item {
  display: flex;
  flex: 1 0 30%;
  flex-direction: column;
  padding: 15px;
}
.loading-more {
  padding: 15px;
}
</style>
