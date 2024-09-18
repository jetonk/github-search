<template>
  <div class="md:container md:mx-auto">
    <div class="grid grid-cols-2 gap-4">
      <Filters />
      <RepositoriesList />
    </div>
  </div>
</template>

<script setup>
import Filters from "../components/Filters.vue";
import RepositoriesList from "../components/RepositoriesList.vue";
</script>

<style scoped></style>
