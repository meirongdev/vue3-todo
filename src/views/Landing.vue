<script setup>
import { inject, ref } from 'vue'
import eventBus from '../services/eventBus'
import todoService from '../services/todo'

const
  $modals = inject('$modals'),
  _project_name = ref('')

function createProject() {
  _project_name.value = ''
  $modals.show('#newProject')
    .then(() => {
      if (_project_name.value != '') {
        todoService.createTodoProject(_project_name.value)
        eventBus.emit('projects:updated')
      }
    }, () => {
      console.log('Cancelled')
    })
}

</script>

<template>
  <div class="landing-wrapper">
    <h1>
      <i class="fa-solid fa-list-check w3-text-purple"></i>
      Landing page
    </h1>
    <button @click="createProject">Create Project</button>

    <Modal name="#newProject" title="New To Do Project">
      <strong>Name</strong>
      <input type="text" v-model="_project_name" placeholder="Enter project name...">
    </Modal>
  </div>
</template>
<style>
.landing-wrapper {
  padding: 10rem;
  margin: 0 auto;
  min-width: 40rem;
  max-width: 60rem;
}
</style>