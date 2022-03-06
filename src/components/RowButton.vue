<template>
  <!-- TODO: convert to button tags everywhere -->
  <div class="container"
      :class="{'active': active}"
      v-on:click="$emit('click')">
    <span
        v-if="icon"
        class="icon"
        :class="{ colouredIcon: iconColour !== null }"
        :style="`--icon-colour: ${iconColour};`">
      <font-awesome-icon :icon="icon" />
    </span>

    <span class="text">{{ text }}</span>
  </div>
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
  .container {
    cursor: pointer;

    padding: 0.5em;
  }

  .icon {
    display: inline-block;
    text-align: center;

    /* give the icon its shape */
    width: 1em;
    height: 1em;
    padding: 0.5em;
    border-radius: 0.5em;
  }

  .colouredIcon {
    color: var(--background-colour);
    background-color: var(--icon-colour);
  }

  .text {
    margin-left: 10px;

    padding-right: 1em;
  }

  .active {
    /* swap the colours around */
    color: var(--background-colour);
    background-color: var(--primary-colour);
  }
</style>
