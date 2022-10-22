<template>
<!--  ToDo animate nav container in/out the same as the <nav />-->
  <div class="nav-container" :class="{'nav-container-show': showMenu}">
    <div v-if="deviceWidthIsConstrained && !showMenu" class="hamburger-menu-bar">
      <button class="show-menu-button" @click="handleShowMenu">
        <font-awesome-icon class="toggle-icon" icon="bars" />
      </button>
    </div>
    <transition :name="transitionName">
      <nav v-if="showMenu">
        <div class="hide-menu-bar" v-if="deviceWidthIsConstrained">
          <button class="hide-menu-button" @click="handleHideMenu">
            <font-awesome-icon class="toggle-icon" icon="xmark" />
          </button>
        </div>
        <router-link
            v-for="button in navLinks" :key="button.path"
            :to="button.path">
          <RowButton
              class="nav-button"
              :text="button.text"
              :icon="button.icon"
              :bold="button.bold"
              :active="$route.path.startsWith(button.path) && button.path !== '/'" />
        </router-link>
      </nav>
    </transition>
  </div>
</template>


<script>
  import RowButton from '@/components/RowButton.vue';

  const unconstrainedWidth = 1260

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
        transitionName: '',
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
          this.transitionName = 'constrained' // use transition animations
          this.handleHideMenu()
        } else {
          this.transitionName = '' // prevent transition animations
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
    height: 100%;
  }

  nav a {
    border-bottom: solid 1px var(--faint-colour);
    font-size: 20px;
  }

  nav a:first-of-type {
    font-weight: bold;
  }

  .hamburger-menu-bar {
    align-items: center;
    background: var(--background-colour);
    box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 3px;
    display: flex;
    height: var(--hamburger-menu-bar-height);
    justify-content: flex-end;
    position: fixed;
    left: 0;
    right: 0;
  }

  .hide-menu-bar {
    align-items: center;
    border-bottom: solid 1px var(--faint-colour);
    display: flex;
    height: var(--hamburger-menu-bar-height);
    justify-content: flex-end;
  }

  .hide-menu-button {
    box-sizing: border-box;
    display: flex;
    font-size: 2.5rem;
  }

  /* translate3d is more performant than translateX as it uses the graphics card */
  .constrained-enter {
    transform: translate3d(calc(-100vw), 0, 0);
  }

  .constrained-enter-active {
    transition: transform 200ms;
  }

  .constrained-leave {

  }

  .constrained-leave-active {
    transition: transform 200ms;
    transform: translate3d(calc(-100vw), 0, 0);
  }

  .nav-button {
    padding: 0.5rem 1rem;
    width: 100%;
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
    box-sizing: border-box;
    display: flex;
    font-size: 2rem;
  }

  .toggle-icon {
    padding: 0.5rem 1.5rem;
  }

  @media (min-width: 1260px) {
    nav {
      margin-top: 0;
    }

    .hamburger-menu-bar {
      display: none;
    }

    .nav-container {
      border-right: solid 1px var(--faint-colour);
      min-width: var(--side-nav-width);
      width: var(--side-nav-width);
    }
  }

</style>
