<template>
  <div class="wrapper">
    <div
        v-for="row in text"
        :key="row"
        class="row">
      <div
          v-for="letter in row"
          :key="letter"
          class="letter">
        {{ letter }}
      </div>
    </div>
  </div>
</template>


<script>
  export default {
    data() {
      return {
        text: [
          'PROJECT',
          'QWERTY ',
        ],
      }
    },
  }
</script>


<style scoped>
  .wrapper {
    display: flex;
    flex-direction: column;

    align-self: center;
  }

  .row {
    display: flex;
    flex-direction: row;

    gap: 0.3em;
    margin-bottom: 0.3em;
  }

  .letter {
    background-color: var(--faint-colour);

    width: 2.5em;
    height: 2.5em;
    border-radius: 0.3em;

    display: flex;
    justify-content: center;
    align-items: center;

    font-weight: bold;
  }
</style>
