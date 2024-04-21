<template>
  <div>
    <nav class="mobile-only top-bar">
      <ActionButton
          class="menu-button"
          :major="false"
          text="Menu"
          @click="handleShowMenu" />
    </nav>
    <nav
        class="side-bar faint-border-right"
        :class="{
          collapsed: !menuExpanded,
        }">
      <div class="hide-menu-bar faint-border-bottom">
        <div class="menu-text">Menu</div>
        <IconButton
            icon="x"
            @click="handleHideMenu" />
      </div>
      <router-link
          v-for="button in navLinks"
          :key="button.path"
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
    <main
        class="page"
        :class="{
          'controls-bottom-margin': !!$slots.controls,
        }">
      <slot name="pretitle" />

      <header class="desktop-only desktop-title-and-controls faint-border-bottom">
        <slot name="title" />
        <div class="controls">
          <slot name="controls" />
        </div>
      </header>

      <header class="mobile-only mobile-title">
        <slot name="title" />
      </header>

      <slot />
    </main>

    <div class="mobile-only mobile-controls">
      <div class="controls">
        <slot name="controls" />
      </div>
    </div>
  </div>
</template>


<script>
  import RowButton from '@/components/RowButton.vue';
  import ActionButton from '@/components/ActionButton.vue';
  import IconButton from '@/components/IconButton.vue';

  export default {
    components: {
      RowButton,
      ActionButton,
      IconButton,
    },
    data() {
      return {
        navLinks: [
          { path: '/',                  text: 'Project QWERTY', icon: 'house',         bold: true  },
          { path: '/select-categories', text: 'Practice',       icon: 'play',          bold: false },
          { path: '/custom-categories', text: 'Customise',      icon: 'hand-sparkles', bold: false },
          { path: '/settings',          text: 'Settings',       icon: 'gear',          bold: false },
          { path: '/about',             text: 'About',          icon: 'circle-info',   bold: false },
        ],
        menuExpanded: false,
      };
    },
    methods: {
      handleHideMenu() {
        this.menuExpanded = false;
      },
      handleShowMenu() {
        this.menuExpanded = true;
      },
    },
  };
</script>


<style scoped>
  .top-bar {
    /* position along top of screen */
    position: fixed;
    top: 0;
    left: 0;
    right: 0;

    height: var(--nav-top-bar-height);

    z-index: 70;

    /* align contents */
    display: flex;
    justify-content: flex-end;
    align-items: center;

    /* appearance */
    background-color: var(--background-colour);
    box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 3px;
  }

  .top-bar > .menu-button {
    margin-right: var(--thin-gap);
    padding: 0.5rem;

    color: black;
    font-size: 1.5rem;
  }

  .side-bar {
    /* position along left side of screen */
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;

    width: var(--nav-side-bar-width);
    height: 100%;

    z-index: 80;

    /* align contents */
    display: flex;
    flex-direction: column;

    /* appearance */
    background-color: var(--background-colour);
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
    justify-content: space-between;
    align-items: center;
    padding-left: var(--thin-gap);
    padding-right: var(--thin-gap);

    font-size: 1.5rem;
  }

  .side-bar > .hide-menu-bar > .menu-text {
    font-weight: bold;
    margin-left: var(--thin-gap);
  }

  .page {
    padding-left: 3rem;
    padding-right: 3rem;
    padding-bottom: 6rem;

    /* this prevents margin collapse between the page and the first element (eg. IconHeader) */
    padding-top: 0.01px;
  }

  @media screen and (max-width: 960px) {
    .controls-bottom-margin {
      margin-bottom: 120px;
    }
  }

  .controls {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    gap: var(--thin-gap);
  }

  .controls:has(*) {
    /* add margin to controls only if there's something in there */
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .desktop-title-and-controls {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    gap: var(--thin-gap);

    /* make sticky above page */
    position: sticky;
    top: 0;
    z-index: 60;
    background-color: var(--background-colour);
  }

  .mobile-controls {
    /* position at bottom of screen */
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;

    /* appearance */
    background-color: var(--background-colour);
    box-shadow: rgba(0, 0, 0, 0.15) 0px -1px 3px;
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
