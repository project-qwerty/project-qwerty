<template>
  <div class="center">
    <main>
      <div class="header">
        <h1>Oops!</h1>
      </div>
      <p>This page does not exist. <router-link to="/" >Click here</router-link> to return to Project
        QWERTY.</p>
    </main>
  </div>
</template>


<style scoped>
main {
  flex-direction: column;
}

.center {
  display: flex;
  justify-content: center;
}

.header {
  display: flex;
  justify-content: center;
}
</style>
