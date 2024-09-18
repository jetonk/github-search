<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else>
      <Card v-for="repo in repositories" :key="repo.id">
        <template #title>
          <a :href="repo.html_url" target="_blank">{{ repo.full_name }}</a>
        </template>
        ⭐ {{ repo.stargazers_count }}
        <template #content>
          <p class="m-0">
            {{ repo.description }}
          </p>
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

const repositories = computed(() => store.getters["repositories/repositories"]);
const loading = computed(() => store.getters["repositories/loading"]);
const error = computed(() => store.getters["repositories/error"]);
</script>

<style></style>
