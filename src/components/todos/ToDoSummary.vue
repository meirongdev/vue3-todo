<script setup>
import { ref, computed } from 'vue';
import todoService from "../../services/todo"

const $props = defineProps({
  items: {
    type: Array,
    default: () => []
  }
}),
  _status = computed(() => {
    let status = {}
    // Initialize status object
    todoService.getStatusList().forEach(stat => {
      status[stat.id] = 0;
    })
    // Count status
    $props.items.forEach(todo => {
      status[todo.status] += 1
    })
    return status
  })
</script>
<template>
  <div class="grid">
    <article class="pico-color-pink-500">
      <strong>Pending</strong>
      <h2>{{ _status?.not_started }}</h2>
    </article>
    <article class="pico-color-yellow-500">
      <strong>In Progress</strong>
      <h2>{{ _status?.in_progress }}</h2>
    </article>
    <article class="pico-color-green-500">
      <strong>Completed</strong>
      <h2>{{ _status?.completed }}</h2>
    </article>
  </div>
</template>
<style scoped></style>