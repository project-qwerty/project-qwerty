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
    <iPadLogoBox class="ipad-panel" />
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
    --fat-gap: 60px;
    --medium-gap: 30px;
    --thin-gap: 10px;

    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: row;
  }

  .content-panel {
    width: 100%;
    height: 100%;

    box-sizing: border-box;
    padding-left: var(--fat-gap);
    padding-right: var(--fat-gap);
    padding-top: var(--fat-gap);
    padding-bottom: var(--fat-gap);

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    text-align: center;
  }

  .logo {
    font-size: 16px;

    margin-bottom: var(--medium-gap);
  }

  h1 {
    font-size: 40px;
  }

  .button-row {
    --i-icon-width: 48px;

    display: flex;
    justify-content: center;
    align-items: center;

    gap: var(--thin-gap);
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
    margin-top: var(--medium-gap);
  }

  footer .logo-row {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: var(--medium-gap);
  }

  footer img {
    height: 32px;
  }

  @media screen and (max-width: 960px) {
    .outer {
      flex-direction: column-reverse;
      height: initial;
    }

    .content-panel {
      height: initial;
      padding-left: var(--thin-gap);
      padding-right: var(--thin-gap);
    }

    .ipad-panel {
      height: 320px;
    }
  }
</style>
