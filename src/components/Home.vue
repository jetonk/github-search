<template>
  <Splitter style="height: 100vh" class="mb-5">
    <SplitterPanel
      :size="20"
      :minSize="15"
      class="flex items-center justify-center"
    >
      <Filters />
    </SplitterPanel>
    <SplitterPanel :size="80" class="flex items-center justify-center">
      <RepositoriesList />
    </SplitterPanel>
  </Splitter>
  <!-- <div class="md:container md:mx-auto">
    <div class="grid grid-cols-2 gap-4">
      
      
    </div>
  </div> -->
</template>

<script setup>
import Splitter from "primevue/splitter";
import SplitterPanel from "primevue/splitterpanel";
import Filters from "../components/Filters.vue";
import RepositoriesList from "../components/RepositoriesList.vue";
</script>

<style scoped></style>
