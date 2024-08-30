<script setup>
import { ref, computed } from "vue"

const
  _todo_text = ref(""),
  _todo_list = ref([]),
  _pending = computed(() => {
    return _todo_list.value.filter(item => !item.checked)
  }),
  _done = computed(() => {
    return _todo_list.value.filter(item => item.checked)
  })

function clearToDo() {
  _todo_text.value = ""
}

function addToDo() {
  if (_todo_text.value != "") {
    _todo_list.value.push({ id: _todo_list.value.length + 1, text: _todo_text.value, checked: false })
    clearToDo()
  }
}

</script>

<template>
  <div>

    <!-- Simple header -->
    <header>
      <h1>
        <i class="fa-solid fa-clipboard-list"></i>
        To-Do List
      </h1>
    </header>

    <main>
      <!-- User input -->
      <div>
        <div role="group">
          <input type="text" autofocus v-model="_todo_text" @keyup.enter="addToDo()"
            placeholder="Type here your to-do item...">
          <button @click="clearToDo()">
            <i class="fa-solid fa-times"></i>
          </button>
          <button @click="addToDo()">
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>

      <!-- List of pending items -->
      <div>Pending ({{ _pending.length }})</div>
      <div v-for="todo in _pending" :key="todo.id">
        <label>
          <input type="checkbox" v-model="todo.checked">
          <span>
            {{ todo.text }}
          </span>
        </label>
      </div>
      <div v-show="_pending.length == 0">No tasks</div>

      <!-- List of completed tasks -->
      <div>Completed ({{ _done.length }})</div>
      <div v-for="todo in _done" :key="todo.id">
        <label>
          <input type="checkbox" v-model="todo.checked">
          <span>
            {{ todo.text }}
          </span>
        </label>
      </div>
      <div v-show="_done.length == 0">No tasks</div>
    </main>
  </div>
</template>

<style scoped></style>