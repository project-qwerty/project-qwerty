<template>
  <div class="outer">
    <div class="left">
      <QwertyLogo class="logo" />
      <div>
        <h1>Spelling practice for people with aphasia</h1>
        <ActionButton
            class="start-button"
            text="Start"
            v-on:click="$router.push('/select-lists')"/>
      </div>
      <footer>
        <p>Made with love by</p>
        <div class="logo-row">
          <img :src="require('@/assets/img/logo-mime.png')" />
          <img :src="require('@/assets/img/logo-mymi.png')" />
          <img :src="require('@/assets/img/logo-monash-partners.jpg')" />
        </div>
      </footer>
    </div>
    <div class="right">
      <img :src="require('@/assets/img/ipad-shadow-cropped.png')" />
      <div class="upper"></div>
      <div class="lower"></div>
    </div>
  </div>
</template>


<script>
  import QwertyLogo from '@/components/QwertyLogo.vue';
  import ActionButton from '@/components/ActionButton.vue';

  export default {
    components: {
      QwertyLogo,
      ActionButton,
    },
  }
</script>


<style scoped>
  .outer {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: row;
  }

  .left {
    width: 100%;
    height: 100%;

    margin-left: 40px;
    margin-right: 40px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .logo {
    font-size: 16px;

    margin-top: 60px;
    margin-bottom: 60px;
  }

  h1 {
    font-size: 48px;
  }

  .start-button {
    font-size: 24px;
  }

  footer {
    margin-top: 60px;
    margin-bottom: 60px;
  }

  footer .logo-row {
    display: flex;
    justify-content: center;
    gap: 60px;
  }

  footer img {
    height: 40px;
  }

  .right {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;

    /* this makes the img position work */
    position: relative;
  }

  .right > img {
    position: absolute;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    width: 100%;
  }

  .right > .upper {
    width: 100%;
    height: 100%;

    background-color: var(--primary-colour);
  }

  .right > .lower {
    width: 100%;
    height: 100%;

    background-color: var(--primary-colour-dark);
  }
</style>
