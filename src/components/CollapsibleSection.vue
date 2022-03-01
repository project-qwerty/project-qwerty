<template>
  <section>
    <details>
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
  details {
    border-bottom: solid 1px var(--faint-colour);
  }

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
    margin: 0;
  }

</style>
