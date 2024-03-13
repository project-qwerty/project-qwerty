<template>
  <div class="outer">
    <div class="content-panel">
      <QwertyLogo class="logo" />

      <div>
        <h1>Spelling practice for people with aphasia</h1>
        <div class="button-row">
          <div class="balancer" />
          <ActionButton
              class="start-button"
              text="Start"
              @click="$router.push('/select-categories')" />
          <button
              class="info-button"
              @click="$router.push('/about')">
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
          <img :src="require('@/assets/img/logo-qarc.png')" />
        </div>
        <p>Project QWERTY acknowledges the Traditional Custodians of the land and we pay our respects to them, their culture and their Elders past, present and future.</p>
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
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: row;
  }

  .content-panel {
    width: 100%;
    height: 100%;

    /* add edge spacing (will be less thick on mobile) */
    box-sizing: border-box;
    padding-left: var(--thick-gap);
    padding-right: var(--thick-gap);
    padding-top: var(--thick-gap);
    padding-bottom: var(--thick-gap);

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    text-align: center;

    /* if there just isn't enough vertical space to fit the contents, make it scroll */
    overflow: auto;
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
    margin-top: 24px;
    margin-bottom: 24px;

    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--medium-gap);
  }

  footer img {
    height: 32px;
  }

  @media screen and (max-width: 960px) {
    .outer {
      /* make the iPad go to the top */
      flex-direction: column-reverse;
      /* make the page a normal scroller instead of height-locked */
      height: initial;
    }

    .content-panel {
      /* allow the content to take up more of the screen width */
      padding-left: var(--thin-gap);
      padding-right: var(--thin-gap);
    }

    .ipad-panel {
      /* make the iPad a fixed size header of sorts */
      height: 320px;
    }
  }
</style>
