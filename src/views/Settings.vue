<template>
  <div>
    <NavSidebar />
    <router-view class="page-content" />
  </div>
</template>


<style scoped>
  .page-content {
    position: absolute;
    left: var(--sidebar-width);
  }
</style>


<script>
  import NavSidebar from '../components/NavSidebar';

  export default {
    name: "Settings",
    components: {
      NavSidebar,
    },
  }
</script>
