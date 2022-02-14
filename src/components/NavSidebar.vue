<template>
  <nav class="sidebar">
    <RowButton
      text="Project QWERTY"
      destination="/"
      icon="chevron-left"
      :bold="true" />
    <RowButton
      text="Practice"
      destination="/select_words"
      icon="play" />
    <RowButton
      text="Customize"
      destination="/settings/custom-lists"
      icon="hand-sparkles" />
    <RowButton
      text="Settings"
      destination="/settings/"
      icon="cog" />
    <RowButton
      text="About"
      destination="/settings/about"
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


<style scoped>
  nav.sidebar {
    /* external shape */
    position: fixed;
    width: var(--sidebar-width);
    height: 100%;

    /* internal layout */
    display: flex;
    flex-direction: column;

    border-right: solid 1px var(--faint-colour);
  }

  nav.sidebar a {
    border-bottom: solid 1px var(--faint-colour);

    font-size: 24px;
    padding: 20px;
  }
</style>
