<script setup>
import { ref, inject } from "vue"
import ToDoItemForm from "./ToDoItemForm.vue"
import TodoSummary from "./ToDoSummary.vue"
import ToDoList from "./ToDoList.vue"
import TodoFilter from "./ToDoFilter.vue";
import todoService from "../services/todo"

const
  $modals = inject("$modals"),
  _items = ref([]),
  _item = ref(todoService.getDefault()),
  _filter = ref("")

// Shows a modal to create or edit a to-do item
function showModal(new_item = true, item = {}) {
  if (new_item) {
    // Prepare a new item
    _item.value = todoService.getDefault()
  } else {
    // Make a copy of the item for editing
    _item.value = todoService.makeCopy(item);
  }

  // todo Open the modal
  $modals.show("newEditItem").then(() => {
    // confirm
    if (new_item) {
      // insert the item
      _item.value.id = _items.value.length + 1
      _items.value.push(_item.value)
    } else {
      // update the item
      let index = getIndex(item)
      if (index >= 0) {
        _items.value[index] = _item.value
      } else {
        alert("Error updating the item")
      }
    }
  }, () => {
    console.log(`${new_item ? "Item new" : "Item modification"} `, "canceled")
  })
}

function deleteItem(item) {
  // todo Delete the item
  $modals.show("deleteItem").then(() => {
    let index = getIndex(item);
    if (index >= 0) {
      _items.value.splice(index, 1)
    }
  }, () => { console.log("deletion canceled") })
}

function getIndex(item) {
  let index = _items.value.findIndex(it => {
    return it.id == item.id
  })
  if (index == -1) {
    return false
  } else {
    return index
  }
}

function toggleStatus(item) {
  item.status = todoService.toggleStatus(item.status)
}
</script>

<template>
  <div>
    <!-- Summary -->
    <TodoSummary :items="_items"></TodoSummary>
    <!-- Filter v-model双向绑定 -->
    <TodoFilter v-model="_filter"></TodoFilter>

    <!-- List -->
    <ToDoList v-model="_items" :filter="_filter" @toggle="toggleStatus" @delete="deleteItem"
      @edit="showModal(false, $event)">
      <a role="button" class="contrast" @click="showModal(true)">
        <i class="fa-solid fa-square-plus"></i>
        New item
      </a>
    </ToDoList>

    <!-- Modals-->
    <Modal name="newEditItem" title="To Do Item">
      <ToDoItemForm v-model="_item"></ToDoItemForm>
    </Modal>
    <Modal name="deleteItem" title="Delete To-Do Item">
      <p>
        Are you sure you want to delete this item?
        <strong>{{ _item.text }}</strong>
      </p>
    </Modal>
  </div>
</template>

<style scoped></style>