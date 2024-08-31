<script setup>
import ToDos from './components/ToDos.vue';
import MainHeader from './components/headers/MainHeader.vue';
</script>

<template>
  <div class="container app">
    <MainHeader />
    <main>
      <ToDos />
    </main>

  </div>
</template>

<style scoped>
.app {
  width: 100vw;
  min-height: 100vh;
}
</style>
