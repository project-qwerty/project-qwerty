<template>
  <div class="line">
    <h1>Settings</h1>
    <div>
        <router-link 
            v-for="(option, index) in this.options"
            :key="index"
            class="option-link" 
            :to="option.link">{{option.name}}</router-link>
    </div>
  </div>
</template>

<script>
    export default{
        name:"settings-menu",
        props: [
            'options'
        ]
    }
</script>

<style scoped>
    .line {
        padding: 8px;
        padding-right: 24px;
        border-right: 1px solid black;
        height: 900px;
        display: inline-block;
        box-shadow: 2px 0px grey;
    }
    .option-link{
        display: block;
        text-decoration: none;
        color: slategrey;
    }
</style>