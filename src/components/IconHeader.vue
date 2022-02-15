<template>
  <div :class="{
        major: major,
        minor: !major,
      }">
    <span v-if="icon" class="icon"
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
      major: {
        type: Boolean,
        default: false,
      },
    },
  }
</script>


<style scoped>
  .major {
    font-weight: bold;
    font-size: 36px;
    margin-top: 36px;
    margin-bottom: 36px;
  }

  .minor {
    font-size: 24px;
    margin-top: 24px;
    margin-bottom: 24px;
  }

  .icon {
    display: inline-block;
    text-align: center;
  }

  .colouredIcon {
    /* give the icon its shape */
    width: 1em;
    height: 1em;
    padding: 0.5em;
    border-radius: 0.5em;

    color: var(--background-colour);
    background-color: var(--icon-colour);
  }

  .text {
    margin-left: 10px;
  }
</style>
