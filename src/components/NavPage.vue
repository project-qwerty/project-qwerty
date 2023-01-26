<template>
  <div>
    <nav class="top-bar">
      <button @click="handleShowMenu">
        <font-awesome-icon class="toggle-icon" icon="bars" />
      </button>
    </nav>
    <nav class="side-bar faint-border-right"
        :class="{
          collapsed: !menuExpanded,
        }">
      <div class="hide-menu-bar faint-border-bottom">
        <button @click="handleHideMenu">
          <font-awesome-icon class="toggle-icon" icon="xmark" />
        </button>
      </div>
      <router-link
          v-for="button in navLinks" :key="button.path"
          :to="button.path"
          class="faint-border-bottom">
        <RowButton
            :text="button.text"
            :icon="button.icon"
            :bold="button.bold"
            :active="$route.path.startsWith(button.path) && button.path !== '/'"
            @click="handleHideMenu" />
      </router-link>
    </nav>
    <main class="page">
      <slot />
    </main>
  </div>
</template>


<script>
  import RowButton from '@/components/RowButton.vue';

  export default {
    components: {
      RowButton,
    },
    data() {
      return {
        navLinks: [
          { path: '/',                  text: 'Project QWERTY', icon: 'house',         bold: true,  },
          { path: '/select-categories', text: 'Practice',       icon: 'play',          bold: false, },
          { path: '/custom-categories', text: 'Customise',      icon: 'hand-sparkles', bold: false, },
          { path: '/settings',          text: 'Settings',       icon: 'gear',          bold: false, },
          { path: '/about',             text: 'About',          icon: 'circle-info',   bold: false, },
        ],
        menuExpanded: false,
      }
    },
    methods: {
      handleHideMenu() {
        this.menuExpanded = false;
      },
      handleShowMenu() {
        this.menuExpanded = true;
      },
    }
  }
</script>


<style scoped>
  .top-bar {
    /* position along top of screen */
    position: fixed;
    top: 0;
    left: 0;
    right: 0;

    height: var(--nav-top-bar-height);

    z-index: 2;

    /* align contents */
    display: flex;
    justify-content: flex-end;
    align-items: center;

    /* appearance */
    background-color: var(--background-colour);
    box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 3px;
  }

  .top-bar > button {
    font-size: 2rem;
  }

  .side-bar {
    /* position along left side of screen */
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;

    width: var(--nav-side-bar-width);
    height: 100%;

    z-index: 3;

    /* align contents */
    display: flex;
    flex-direction: column;

    /* appearance */
    background-color: var(--background-colour);
  }

  .page {
    padding-left: 3rem;
    padding-right: 3rem;
    padding-bottom: 6rem;

    /* this prevents margin collapse between the page and the first element (eg. IconHeader) */
    padding-top: 1px;
  }

  .side-bar a {
    font-size: 20px;

    /* disable default styling for links */
    text-decoration: none;
    color: inherit;
  }

  .side-bar a:first-of-type {
    font-weight: bold;
  }

  .side-bar > .hide-menu-bar {
    height: var(--nav-top-bar-height);

    display: flex;
    justify-content: flex-end;
    align-content: center;
  }

  .side-bar > .hide-menu-bar > button {
    font-size: 2.5rem;

    /* centre the X */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .toggle-icon {
    padding: 0.5rem 1.5rem;
  }

  /* small screen layout */
  @media screen and (max-width: 960px) {
    .side-bar {
      /* make side bar take up the full width on smaller screens */
      /* visibility will be controlled by the component applying .collapsed */
      width: 100%;
      border-right: none;
    }

    .page {
      /* set page offsets to match top/side bar configuration */
      margin-top: var(--nav-top-bar-height);
      margin-left: 0;

      /* reduce page margins */
      padding-left: var(--medium-gap);
      padding-right: var(--medium-gap);
      padding-bottom: var(--thick-gap);
    }
  }

  /* truly small screens */
  @media screen and (max-width: 640px) {
    .page {
      /* reduce page margins more */
      padding-left: var(--thin-gap);
      padding-right: var(--thin-gap);
      padding-bottom: var(--medium-gap);
    }
  }

  /* Note: .collapsed needs to be here between the media queries in this order so that everything cascades properly */
  .collapsed {
    display: none;
  }

  /* large screen layout */
  @media screen and (min-width: 960px) {
    .top-bar {
      /* hide top bar */
      display: none;
    }

    .side-bar {
      /* override .collapsed to make the side bar visible even if this.menuExpanded = false */
      display: flex;
    }

    .side-bar > .hide-menu-bar {
      /* hide the sidebar close button */
      display: none;
    }

    .page {
      /* set page offsets to match top/side bar configuration */
      margin-top: 0;
      margin-left: var(--nav-side-bar-width);
    }
  }
</style>
