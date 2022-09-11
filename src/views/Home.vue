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
    <iPadLogoBox />
  </div>
</template>


<script>
  import QwertyLogo from '@/components/QwertyLogo.vue';
  import ActionButton from '@/components/ActionButton.vue';
  import iPadLogoBox from '@/components/iPadLogoBox.vue';

  export default {
    components: {
      QwertyLogo,
      ActionButton,
      iPadLogoBox,
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

  @media screen and (max-width: 800px) {
    .outer {
      flex-direction: column-reverse;
    }
  }

  .content-panel {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    text-align: center;
  }

  .logo {
    font-size: 16px;
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
  }

  footer .logo-row {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 30px;
  }

  footer img {
    height: 32px;
  }
</style>
