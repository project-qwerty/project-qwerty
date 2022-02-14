<template>
  <nav class="sidebar">
    <RowButton
      text="Project QWERTY"
      destination="/"
      icon="chevron-left"
      :bold="true" />
    <RowButton
      text="Practice"
      destination="/select-lists"
      icon="play" />
    <RowButton
      text="Customize"
      destination="/custom-lists"
      icon="hand-sparkles" />
    <RowButton
      text="Settings"
      destination="/settings"
      icon="cog" />
    <RowButton
      text="About"
      destination="/about"
      icon="info-circle" />
  </nav>
</template>


<script>
  import RowButton from '@/components/RowButton.vue';

  export default {
    components: {
      RowButton,
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
