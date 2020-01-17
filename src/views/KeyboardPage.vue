<template>
  <div class="keyboardPage">
    <h1>Keyboard Rehab</h1>
      <keyboard-component />
  </div>
</template>

<script>
import KeyboardComponent from '@/components/keyboard/KeyboardComponent.vue';
export default {
  name: 'keyboardPage',
  components: {
    'keyboard-component' : KeyboardComponent,
  },
}
</script>