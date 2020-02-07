<template>
  <div>
    <div class=heading>Select Word List</div>
    <router-link style="display:flex;justify-content:flex-end;align-items:center;text-decoration:none;" to="/settings">
      <div style="text-align:right;font-size:36px;margin-right:16px;color:#414141;">Settings</div>
      <font-awesome-icon style="font-size:100;color:#414141" icon="cog"/>
    </router-link>
    
     <p class="list-heading">List A</p>
        <select-component :preset="preset.list" :index="0" v-on:update:value="temp=$event"/>
    
    <p class="list-heading">List B</p>
        <select-component :preset="preset.list" :index="1" v-on:update:value="temp=$event"/>
    
    <Start :to="startTo" />
  </div>
</template>

<script>
  import SelectButton from '@/components/SelectButton.vue';
  import Start from '@/components/StartButton.vue';
  
  export default {
    data() {
      return {
        token: null,
        list: [false,false], //Change this eventually
        temp: null,
        preset: {
          list: null,
        },
        startTo: "/keyboard",
      }
    },
    components: {
      'select-component' : SelectButton,
      'Start' : Start,
    },
    created() {
      // fix this in the future - preset should be all false and the same size as the number of word lists (currently 2) 
      this.preset.list = this.$cookies.isKey('select_list.list') ? this.$cookies.get('select_list.list') : [false,false]
    },
    watch: {
      'temp' : function(val){
        this.list[val.index] = val.value;
        this.$cookies.set('select_list.list', this.list);
      }
    }
  }
</script>


<style scoped>
  .heading {
    font-size:28px;
    text-align: center;
  }
  
  .list-heading {
    font-size:20px;
    text-align: left;
  }
</style>
