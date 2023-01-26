<template>
  <button @click="$emit('click')">
    <font-awesome-icon class="icon" :icon="icon" />
  </button>
</template>


<script>
  export default {
    props: {
      icon: {
        type: String,
      }
    },
  }
</script>


<style scoped>
  button {
    /* give it the circle shape */
    padding: 0.5em;
    border-radius: 50%;

    background-color: var(--faint-colour);

    /* center the icon within */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .icon {
    width: 1em;
    height: 1em;

    color: var(--foreground-colour);
  }
</style>
