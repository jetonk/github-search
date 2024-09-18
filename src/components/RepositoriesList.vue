<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else class="card-container">
      <Card class="card" v-for="(filter, key) in filters" :key="key">
        <template #title>
          {{ key }}
        </template>
        <template #content>
          <ul>
            <li v-for="repository in filter.repositories" :key="repository.id">
              <h3>{{ repository.name }}</h3>
              <a :href="repository.html_url" target="_blank">{{
                repository.full_name
              }}</a>
              ⭐ {{ repository.stargazers_count }}
              {{ repository.description }}
              <p>Full Name: {{ repository.full_name }}</p>
              <p>Owner: {{ repository.owner.login }}</p>
            </li>
          </ul>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

// components
import Card from "primevue/card";

const store = useStore();

const filters = computed(() => store.state.repositories.filters);
const loading = computed(() => store.getters["repositories/loading"]);
const error = computed(() => store.getters["repositories/error"]);
</script>

<style scoped>
.card-container {
  display: flex;
}
.card {
  width: 300px;
  margin-left: 15px;
}
</style>
