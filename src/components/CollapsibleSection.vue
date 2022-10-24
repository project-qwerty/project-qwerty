<template>
  <section>
    <details class="faint-border-bottom">
      <summary>{{ summary }}</summary>
      <div class="content-wrapper">
        <slot></slot>
      </div>
    </details>
  </section>
</template>


<script>
  export default {
    props: [
      'summary',
    ],
  }
</script>


<style scoped>
  summary {
    cursor: pointer;

    padding-top: 24px;
    padding-bottom: 24px;

    font-weight: bold;
  }

  .content-wrapper {
    margin-bottom: 24px;
  }

  .content-wrapper p {
    margin-top: 0;
  }

</style>
