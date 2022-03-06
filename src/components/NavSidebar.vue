<template>
  <nav class="sidebar">
    <router-link
        v-for="button in navLinks" :key="button.path"
        :to="button.path">
      <RowButton
          :text="button.text"
          :icon="button.icon"
          :bold="button.bold"
          :active="$route.path === button.path"/>
    </router-link>
  </nav>
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
          { path: '/',             text: 'Project QWERTY', icon: 'chevron-left',  bold: true,  },
          { path: '/select-lists', text: 'Practice',       icon: 'play',          bold: false, },
          { path: '/custom-lists', text: 'Customize',      icon: 'hand-sparkles', bold: false, },
          { path: '/settings',     text: 'Settings',       icon: 'gear',          bold: false, },
          { path: '/about',        text: 'About',          icon: 'circle-info',   bold: false, },
        ],
      }
    },
  }
</script>


<style>
  /* This style is !!! NOT !!! scoped - it exports the sidebar-page-content class for pages with the navbar to use */

  .sidebar {
    /* external shape */
    position: fixed;
    width: var(--sidebar-width);
    height: 100%;

    /* internal layout */
    display: flex;
    flex-direction: column;

    border-right: solid 1px var(--faint-colour);
  }

  .sidebar a {
    border-bottom: solid 1px var(--faint-colour);

    font-size: 20px;

    /* disable default styling for links */
    text-decoration: none;
    color: inherit;
  }

  .sidebar a:first-of-type {
    font-weight: bold;
  }

  .sidebar-page-content {
    /* take up the remaining space on the right */
    position: absolute;
    left: var(--sidebar-width);
    right: 0;

    padding-left: 48px;
    padding-right: 48px;

    padding-bottom: 96px;
  }
</style>
