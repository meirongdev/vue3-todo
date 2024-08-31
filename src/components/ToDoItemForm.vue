<script setup>
import { ref } from "vue"
import todoService from "../services/todo"

const $props = defineProps({
  modelValue: {
    type: Object,
    default: () => { return {} }
  }
}),

  $emit = defineEmits(["update:modelValue"]),
  _item = ref({})

_item.value = { ...$props.modelValue }
// update: modelValue是特殊的, 会对parent component的v-model起作用
function emitUpdate() {
  $emit("update:modelValue", _item.value)
}
</script>
<template>
  <div>
    <div>
      <strong>Description</strong>
      <input type="text" v-model.string="_item.text" @blur="emitUpdate()">
    </div>

    <div>
      <strong>Status</strong>
      <select v-model.string="_item.status" @change="emitUpdate()">
        <option v-for="state in todoService.getStatusList()" :key="state.id" :value="state.id">
          {{ state.label }}
        </option>
      </select>
    </div>
  </div>
</template>
<style scoped></style>