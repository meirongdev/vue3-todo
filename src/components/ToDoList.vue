<script setup>
import { computed } from "vue"
const
  $props = defineProps({
    "modelValue": { type: Array, default: () => [] },
    "filter": { type: String, default: "" }
  }),
  $emit = defineEmits(["edit", "delete", "toggle"]),
  _filtered_list = computed(() => {
    if ($props.filter) {
      return $props.modelValue.filter(item => {
        return item.text.toUpperCase().includes($props.filter.toUpperCase())
      })
    } else {
      return $props.modelValue;
    }
  })

// Emit event
// click checkbox
// click edit
// click delete
function emitEvent(event_name, payload) {
  $emit(event_name, payload)
}
</script>
<template>
  <div>
    <table class="striped">
      <thead>
        <tr>
          <th role="col">Status</th>
          <th role="col">Item</th>
          <th role="col">
            <slot></slot>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in _filtered_list" :key="item.id">
          <td class="clickable" @click="emitEvent('toggle', item)">
            <i class="fa-solid fa-2x fa-square" v-if="item.status == 'not_started'"></i>
            <i class="fa-solid fa-2x fa-square-minus" v-if="item.status == 'in_progress'"></i>
            <i class="fa-solid fa-2x fa-square-check" v-if="item.status == 'completed'"></i>
          </td>
          <td col="row">{{ item.text }}</td>
          <td>
            <span class="clickable" @click="emitEvent('edit', item)">
              <i class="fa-solid fa-pen-to-square"></i>
              Edit
            </span>

            <span class="clickable" @click="emitEvent('delete', item)">
              <i class="fa-solid fa-trash-can"></i>
              Delete
            </span>
          </td>
        </tr>
        <tr v-if="_filtered_list.length == 0">
          <td><i class="fa-solid fa-square"></i></td>
          <td>The list is empty.</td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style scoped></style>