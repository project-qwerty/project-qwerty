<template>
  <div class="container faint-border">
    <button
        v-for="option in options"
        :key="option.val"
        :class="{'active': option.val === activeValue}"
        @click="$emit('update', option.val)">
      {{ option.label }}
    </button>
  </div>
</template>


<script>
  export default {
    props: {
      options: {
        // options must be an array of objects like {label: 'abc', val: 123}
        type: Array,
        required: true,
      },
      // the type of `activeValue` should be the same as the type of the `val`s in `options`
      /* eslint-disable-next-line vue/require-prop-types */
      activeValue: {},
    },
  };
</script>


<style scoped>
  .container {
    display: flex;
    flex-direction: row;

    overflow: hidden;

    border-radius: 0.5em;

    font-size: 16px;
    font-weight: bold;
  }

  .container button + button {
    border-left: solid 1px var(--faint-colour);
  }

  button {
    /* this makes all the options equally sized */
    flex: 1 1 0px;

    padding: 1em;

    text-align: center;
  }

  .active {
    color: var(--background-colour);
    background-color: var(--primary-colour);
  }
</style>
