<template>
  <div
      class="button"
      v-on:click="$emit('click')">
    <font-awesome-icon class="icon" :icon="icon" />
  </div>
</template>


<script>
  export default {
    props: [
      'icon',
    ],
  }
</script>


<style scoped>
  .button {
    cursor: pointer;

    /* give it the circle shape */
    padding: 0.5em;
    border-radius: 1em;

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
