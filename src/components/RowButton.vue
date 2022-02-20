<template>
  <div class="container" :class="{'active': active}">
    <span v-if="icon" class="icon" :style="`background-color: ${iconColour};`">
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
        default: 'initial',
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
    padding: 0.5em;

    text-align: left;
  }

  .icon {
    display: inline-block;
    text-align: center;

    /* give the icon its shape */
    width: 1em;
    height: 1em;
    padding: 0.6em;
    border-radius: 10px;
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
