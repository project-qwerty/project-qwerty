<template>
  <div class="button-wrapper">
    <div class="button">
      <font-awesome-icon class="icon" v-if="icon" :icon="icon" />
      <span class="text">{{ text }}</span>
    </div>
  </div>
</template>


<script>
  export default {
    props: [
      'icon',
      'text',
    ],
  }
</script>


<style scoped>
  .button-wrapper {
    display: inline-block;
  }

  .button {
    display: flex;
    flex-direction: row;
    justify-content: center;

    color: var(--background-colour);
    background-color: var(--primary-colour);

    border-radius: 2em;

    padding: 1em;
    padding-left: 2em;
    padding-right: 2em;

    min-width: 5em;
  }

  .icon {
    margin-right: 0.5em;
  }

  .text {
    font-weight: bold;
  }
</style>
