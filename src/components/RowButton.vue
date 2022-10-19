<template>
  <button
      :class="{'active': active}"
      v-on:click="$emit('click')">
    <span
        v-if="icon"
        class="icon"
        :class="{ 'coloured-icon': iconColour !== null }"
        :style="`--icon-colour: ${iconColour};`">
      <font-awesome-icon :icon="icon" />
    </span>

    <span class="text">{{ text }}</span>
  </button>
</template>


<script>
  export default {
    props: {
      text: {
        type: String,
        required: true,
      },
      icon: {
        type: String,
        default: null,
      },
      iconColour: {
        type: String,
        default: null,
      },
      active: {
        type: Boolean,
        default: false,
      },
    },
  }
</script>


<style scoped>
  button {
    align-items: center;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    width: 100%;
  }

  .icon {
    align-items: center;
    display: flex;
    justify-content: center;
    /* give the icon its shape */
    width: 1em;
    height: 1em;
    padding: 0.5em;
    border-radius: 0.5em;
  }

  .coloured-icon {
    color: var(--background-colour);
    background-color: var(--icon-colour);
  }

  .text {
    margin-left: 10px;
  }

  .active {
    /* swap the colours around */
    color: var(--background-colour);
    background-color: var(--primary-colour);
  }
</style>
