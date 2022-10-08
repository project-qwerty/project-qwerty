<template>
  <div class="nav-container">
    <div class="mobile-menu-toggle">
      <button class="show-menu" v-if="showMenu" @click="showMenu = false">
        <font-awesome-icon class="toggle-icon" icon="xmark" />
      </button>
      <button class="hide-menu" v-if="!showMenu" @click="showMenu = true">
        <font-awesome-icon class="toggle-icon" icon="bars" />
      </button>
    </div>
    <nav v-if="showMenu">
      <router-link
          @click="showMenu = false"
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
        showMenu: false,
      }
    },
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

  .hide-menu {
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
    height: 100vh;
    position: fixed;
    width: 100vw;
    z-index: 2;
  }

  .show-menu {
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
      background: green;
      border-right: solid 1px var(--faint-colour);
      position: relative;
      min-width: var(--sidebar-width);
      width: var(--sidebar-width);
    }
  }

</style>

<!--.sidebar {-->
<!--/* external shape */-->
<!--position: fixed;-->
<!--width: var(&#45;&#45;sidebar-width);-->
<!--height: 100%;-->

<!--/* internal layout */-->
<!--display: flex;-->
<!--flex-direction: column;-->


<!--}-->

<!--.sidebar a {-->
<!--border-bottom: solid 1px var(&#45;&#45;faint-colour);-->

<!--font-size: 20px;-->

<!--/* disable default styling for links */-->
<!--text-decoration: none;-->
<!--color: inherit;-->
<!--}-->

<!--.sidebar a:first-of-type {-->
<!--font-weight: bold;-->
<!--}-->

<!--.sidebar-page-content {-->
<!--/* take up the remaining space on the right */-->
<!--position: absolute;-->
<!--left: var(&#45;&#45;sidebar-width);-->
<!--right: 0;-->

<!--padding-left: 48px;-->
<!--padding-right: 48px;-->

<!--padding-bottom: 96px;-->
<!--}-->