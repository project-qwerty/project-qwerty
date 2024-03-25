<template>
  <section>
    <details>
      <summary>{{ summary }}</summary>
      <div class="content-wrapper">
        <slot />
      </div>
    </details>
  </section>
</template>


<script>
  export default {
    props: {
      summary: {
        type: String,
      },
    },
  };
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
