<template>
  <div
      class="wrapper"
      :class="{
        major: major,
        minor: !major,
      }">
    <span v-if="icon" class="icon"
        :class="{ 'coloured-icon': iconColour !== null }"
        :style="`--icon-colour: ${iconColour};`">
      <font-awesome-icon :icon="icon" />
    </span>

    <span>{{ text }}</span>
  </div>
</template>


<script>
  export default {
    props: {
      text: {
        type: String,
        default: '',
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
  .wrapper {
    display: flex;
    justify-content: center;
    align-items: baseline;
  }

  .major {
    font-weight: bold;
    font-size: 2rem;
  }

  .minor {
    font-size: 1.5rem;
  }

  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 1rem;
  }

  .coloured-icon {
    /* give the icon its shape */
    width: 1em;
    height: 1em;
    padding: 0.5em;
    border-radius: 0.5em;

    color: var(--background-colour);
    background-color: var(--icon-colour);
  }

  @media (min-width: 650px) {
    .major {
      font-size: 2.5rem;
    }

    .minor {
      font-size: 1.8rem;
    }
  }

  @media (min-width: 720px) {
    .major {
      font-size: 3rem;
      font-weight: bold;
    }

    .minor {
      font-size: 2rem;
    }
  }
</style>
