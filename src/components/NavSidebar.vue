<template>
  <nav class="sidebar">
    <RowButton v-for="button in navLinks" :key="button.path"
      :destination="button.path"
      :text="button.text"
      :icon="button.icon"
      :bold="button.bold"
      :active="$route.path === button.path"/>
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
          { path: '/settings',     text: 'Settings',       icon: 'cog',           bold: false, },
          { path: '/about',        text: 'About',          icon: 'info-circle',   bold: false, },
        ],
      }
    },
  }
</script>


<style>
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

    font-size: 24px;
    padding: 20px;
  }

  .sidebar-page-content {
    position: absolute;
    left: var(--sidebar-width);
    right: 0;
  }
</style>
