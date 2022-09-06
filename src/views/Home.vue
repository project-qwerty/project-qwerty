<template>
  <div class="outer">
    <div class="content-panel">
      <QwertyLogo class="logo" />

      <div>
        <h1>Spelling practice for people with aphasia</h1>
        <div class="button-row">
          <div class="balancer"></div>
          <ActionButton
              class="start-button"
              text="Start"
              v-on:click="$router.push('/select-categories')"/>
          <button
              class="info-button"
              v-on:click="$router.push('/about')">
            <font-awesome-icon icon="circle-info" />
          </button>
        </div>
      </div>

      <footer>
        <p>Made with love by</p>
        <div class="logo-row">
          <img :src="require('@/assets/img/logo-mime.png')" />
          <img :src="require('@/assets/img/logo-mymi.png')" />
          <img :src="require('@/assets/img/logo-monash-partners.jpg')" />
          <img :src="require('@/assets/img/logo-monash-health.png')" />
        </div>
      </footer>
    </div>
    <div class="ipad-panel">
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

  .content-panel {
    width: 100%;
    height: 100%;

    margin-left: 40px;
    margin-right: 40px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    text-align: center;
  }

  .logo {
    font-size: 16px;

    margin-top: 60px;
  }

  h1 {
    font-size: 48px;
  }

  .button-row {
    --i-icon-width: 48px;

    display: flex;
    justify-content: center;
    align-items: center;

    gap: 30px;
  }

  .balancer {
    width: var(--i-icon-width);
  }

  .start-button {
    font-size: 24px;
  }

  .info-button {
    font-size: var(--i-icon-width);
    line-height: 0;

    color: var(--faint-colour);
  }

  footer {
    margin-bottom: 60px;
  }

  footer .logo-row {
    display: flex;
    justify-content: center;
    gap: 30px;
  }

  footer img {
    height: 32px;
  }

  .ipad-panel {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;

    /* this makes the img position work */
    position: relative;
  }

  .ipad-panel > img {
    position: absolute;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    width: 100%;
  }

  .ipad-panel > .upper {
    width: 100%;
    height: 100%;

    background-color: var(--primary-colour);
  }

  .ipad-panel > .lower {
    width: 100%;
    height: 100%;

    background-color: var(--primary-colour-dark);
  }
</style>
