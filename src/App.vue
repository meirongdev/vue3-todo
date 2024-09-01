<script setup>
import Sidebar from './components/layout/Sidebar.vue'
import router from './router';
</script>

<template>
  <div class="layout">
    <aside class="sidebar">
      <Sidebar />
    </aside>

    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
  /* Full height for the layout */
}

.sidebar {
  flex: 0 0 250px;
  /* Sidebar width */
  background-color: var(--neutral-200);
  /* Light background */
  padding: 1rem;
  border-right: 1px solid var(--neutral-300);
  /* Border on the right */
}

.main-content {
  flex: 1;
  /* Main content takes the rest of the space */
  padding: 1rem;
}
</style>
