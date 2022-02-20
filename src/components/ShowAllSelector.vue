<template>
  <div class="container">
    <div class="option"
        v-for="option in options" :key="option.val"
        :class="{'active': option.val === activeValue}"
        v-on:click="$emit('update', option.val)"
        >
      {{ option.label }}
    </div>
  </div>
</template>


<script>
  export default {
    props: [
      'options',  // options must be an array of objects like {label: 'abc', val: 123}
      'activeValue',
    ],
  }
</script>


<style scoped>
  .container {
    display: flex;
    flex-direction: row;

    overflow: hidden;

    border: solid 1px var(--faint-colour);
    border-radius: 0.5em;

    font-size: 16px;
    font-weight: bold;
  }

  .container .option + .option {
    border-left: solid 1px var(--faint-colour);
  }

  .option {
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
