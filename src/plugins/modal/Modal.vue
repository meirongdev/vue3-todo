<script setup>
import { inject, computed } from 'vue'
const $props = defineProps({
  name: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: 'modal dialog'
  },
}),
  $modals = inject('$modals'),
  _show = computed(() => {
    return $modals.active() == $props.name
  })

function close(confirm = false) {
  if (confirm) {
    $modals.confirm()
  } else {
    $modals.cancel()
  }
}
</script>
<template>
  <dialog open v-if="_show">
    <article>
      <header>
        <button aria-label="Close" class="close" @click="close(false)"></button>
        <p>
          <strong>{{ $props.name }}</strong>
        </p>
      </header>
      <main>
        <slot></slot>
      </main>
      <footer>
        <button @click="close(false)">Cancel</button>
        <button @click="close(true)">Confirm</button>
      </footer>
    </article>
  </dialog>
</template>