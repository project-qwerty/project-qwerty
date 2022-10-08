<template>
  <div class="nav-container" :class="{'nav-container-show': showMenu}">
    <div v-if="deviceWidthIsConstrained" class="mobile-menu-toggle">
      <button class="show-menu-button" v-if="showMenu" @click="handleHideMenu">
        <font-awesome-icon class="toggle-icon" icon="xmark" />
      </button>
      <button class="hide-menu-button" v-if="!showMenu" @click="handleShowMenu">
        <font-awesome-icon class="toggle-icon" icon="bars" />
      </button>
    </div>
    <nav v-if="showMenu">
      <router-link
          v-for="button in navLinks" :key="button.path"
          :to="button.path">
        <RowButton
            :text="button.text"
            :icon="button.icon"
            :bold="button.bold"
            :active="$route.path.startsWith(button.path) && button.path !== '/'" />
      </router-link>
    </nav>
  </div>
</template>


<script>
  import RowButton from '@/components/RowButton.vue';

  const unconstrainedWidth = 1024

  export default {
    components: {
      RowButton,
    },
    created() {
      this.handleWindowResize()
      window.addEventListener('resize', this.handleWindowResize)
    },
    data() {
      return {
        deviceWidthIsConstrained: false,
        navLinks: [
          { path: '/',                  text: 'Project QWERTY', icon: 'house',         bold: true,  },
          { path: '/select-categories', text: 'Practice',       icon: 'play',          bold: false, },
          { path: '/custom-categories', text: 'Customise',      icon: 'hand-sparkles', bold: false, },
          { path: '/settings',          text: 'Settings',       icon: 'gear',          bold: false, },
          { path: '/about',             text: 'About',          icon: 'circle-info',   bold: false, },
        ],
        showMenu: true,
      }
    },
    destroyed() {
      window.removeEventListener('resize', this.handleWindowResize)
    },
    methods: {
      handleHideMenu() {
        this.showMenu = false
      },
      handleShowMenu() {
        this.showMenu = true
      },
      handleWindowResize() {
        this.deviceWidthIsConstrained = window.innerWidth < unconstrainedWidth
        if (this.deviceWidthIsConstrained) {
          this.handleHideMenu()
        } else {
          this.handleShowMenu()
        }
      },
    }
  }
</script>


<style>

  nav {
    display: flex;
    flex-direction: column;
    margin-top: 4rem;
    overflow-y: hidden;
  }

  nav a {
    border-bottom: solid 1px var(--faint-colour);
    font-size: 20px;
  }

  nav a:first-of-type {
    font-weight: bold;
  }

  .hide-menu-button {
    font-size: 2rem;
  }

  .mobile-menu-toggle {
    background: var(--background-colour);
    box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 3px;
    display: flex;
    justify-content: flex-end;
    position: fixed;
    left: 0;
    right: 0;
  }

  .nav-container {
    background: var(--background-colour);
    display: flex;
    flex-direction: column;
    position: fixed;
    width: 100vw;
    z-index: 2;
  }

  .nav-container-show {
    height: 100vh;
  }

  .show-menu-button {
    font-size: 3rem;
  }

  .toggle-icon {
    padding: 0.5rem 1.5rem;
  }

  @media (min-width: 1024px) {
    nav {
      margin-top: 0;
    }

    .mobile-menu-toggle {
      display: none;
    }

    .nav-container {
      border-right: solid 1px var(--faint-colour);
      position: relative;
      min-width: var(--sidebar-width);
      width: var(--sidebar-width);
    }
  }

</style>
