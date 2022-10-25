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

    <span>{{ text }}</span>
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
    display: flex;
    align-items: baseline;
    gap: 10px;

    box-sizing: border-box;
    padding: 0.5em;
  }

  .icon {
    text-align: center;

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

  .active {
    /* swap the colours around */
    color: var(--background-colour);
    background-color: var(--primary-colour);
  }
</style>
