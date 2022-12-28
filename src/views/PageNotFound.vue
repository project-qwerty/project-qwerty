<template>
  <div class="center">
    <div class="column">
      <div class="header">
        <h1>Oops</h1>
      </div>
      <div>
        This page does no exist. <a class="link" v-on:click="$router.push('/')">Click here</a> to return to project qwerty
      </div>
    </div>
  </div>
</template>


<style scoped>
.center {
  display: flex;
  justify-content: center;
}

.column {
  flex-direction: column;
}

.header {
  display: flex;
  justify-content: center;
}

.link {
  color: blue;
  cursor: pointer;
}
</style>
