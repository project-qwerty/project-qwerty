<template>
  <div class="line">
    <router-link class="link-to-select-words" to="/select_words">
      <font-awesome-icon class="link-to-select-words-icon" icon="chevron-left"/>
    </router-link>
    <p class="heading">Settings</p>
    <div>
      <router-link
        v-for="(option, index) in this.options"
        :key="index"
        class="option-link"
        :to="option.link">
        <div v-if="option.link==$route.path" class="generic-link">
          {{option.name}}
        </div>
        <div v-else>
          {{option.name}}
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
  export default{
    name:"settings-menu",
    props: [
      'options',
      'name'
    ],
//    created () {
//      window.console.log(this.options, this.$route.path);
//    }
  }
</script>

<style scoped>
  .line {
    padding: 8px;
    left: 240px;
    border-right: 1px solid black;
    display: inline-block;
    box-shadow: 2px 0px grey;
    height: 100vh;
  }
  .option-link{
    display: block;
    text-decoration: none;
    color: slategrey;
  }

  .heading {
    font-size: 32px;
    font-weight: bold
  }

  .link-to-select-words {
    display: flex;
    justify-content: left;
    text-decoration: none;
  }

  .link-to-select-words-icon {
    font-size: 50px;
    color: rgba(142, 142, 147);
  }

  .generic-link {
    font-weight: bold;
    color: black;
  }
</style>
