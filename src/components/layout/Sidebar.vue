<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import eventBus from '../../services/eventBus'
import todoService from '../../services/todo'

const _projects = ref([]);

updateProjects()

onMounted(() => {
  // Register the event listener
  eventBus.on('projects:updated', updateProjects)
})

onBeforeUnmount(() => {
  // Unregister the event listener
  eventBus.off('projects:updated', updateProjects)
})

function updateProjects() {
  let projects = todoService.loadProjectsManifest();
  _projects.value = projects.list;
}
</script>
<template>
  <aside>
    <h4>To Do Projects</h4>
    <nav>
      <ul>
        <li>
          <RouterLink :to="{ name: 'landing' }">Home</RouterLink>
        </li>
        <!-- <RouterLink to="{name: 'search', params:{text: 'abc'}}">Search</RouterLink> -->
        <li v-for="p in _projects" :key="p.id">
          <RouterLink :to="{ name: 'project', params: { id: p.id } }">
            {{ p.name }}
          </RouterLink>
        </li>
      </ul>
    </nav>
  </aside>
</template>
<style scoped></style>