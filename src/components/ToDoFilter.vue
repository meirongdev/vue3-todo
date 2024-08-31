<script setup>
import { ref, onMounted } from 'vue'
const $props = defineProps(['modelValue']),
  $emit = defineEmits(['update:modelValue']),
  _value = ref('')

onMounted(() => {
  _value.value = $props.modelValue
})

function clear() {
  _value.value = ''
  publishValue()
}

function publishValue() {
  console.log(_value.value)
  $emit("update:modelValue", _value.value)
}
</script>

<template>
  <div role="group">
    <input type="text" v-model="_value" @keyup="publishValue()" placeholder="Enter filter here...">
    <button @click="clear()">
      <i class="fas fa-fw fa-times"></i>
    </button>
  </div>
</template>
<style scoped></style>