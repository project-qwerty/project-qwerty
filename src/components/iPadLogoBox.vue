<template>
  <div class="wrapper">
    <img :src="require('@/assets/img/ipad-shadow-cropped.png')" />
    <div class="background">
      <div class="upper" />
      <div class="lower" />
    </div>
  </div>
</template>


<script>

</script>


<style scoped>
  .wrapper {
    width: 100%;
    height: 100%;

    /* this is required to make the img overlay work */
    position: relative;
  }

  .wrapper > img {
    position: absolute;

    /* fit within boundaries */
    max-width: 100%;
    max-height: 100%;

    /* center */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%)
  }

  .background {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
  }

  .background > .upper {
    width: 100%;
    height: 100%;

    background-color: var(--primary-colour);
  }

  .background > .lower {
    width: 100%;
    height: 100%;

    background-color: var(--primary-colour-dark);
  }
</style>
