<template>
  <div>
    <router-link style="display:flex;justify-content:left;align-items:center;text-decoration:none" to="/settings">
      <p style="text-align:center;font-size:36px;margin-right:16px;color:#414141">Settings</p>
      <font-awesome-icon style="font-size:100;color:#414141" icon="cog"/>
    </router-link>
    <p class=heading>Select Word List</p>
    
     <p class="list-heading">List A</p>
        <select-component :options="['']"/>
    
    <p class="list-heading">List B</p>
        <select-component :options="['']"/>
    
    <router-link style="display:flex;justify-content:center;align-items:center;text-decoration:none;margin-left:100px" to="/keyboard">
      <p style="text-align:center;font-size:36px;margin-right:16px:16px;color:#414141">Start</p>
      <font-awesome-icon style="font-size:100;color:#414141" icon="chevron-right"/>
    </router-link>
  </div>
</template>

<script>
 import SelectButton from '@/components/SelectButton.vue';
  
export default {
    data() {
      return {
        token: null,
      }
    },
 
    components: {
      'select-component' : SelectButton
    },
  }
</script>


<style scoped>
  .heading {
    font-size:28px;
    text-align: left;
  }
  
  .list-heading {
    font-size:20px;
    text-align: left;
  }
</style>
