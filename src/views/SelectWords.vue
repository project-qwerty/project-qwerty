<template>
  <div>
    <div style="display:flex;">
      <div class=heading>Select Word List</div>
        <router-link style="display:flex;justify-content:flex-end;align-items:center;text-decoration:none;margin-left:800px" to="/settings">
          <font-awesome-icon style="font-size:75;color:rgba(142, 142, 147);" icon="cog"/>
        </router-link>
    </div>
    
     <div style="display:flex; align-items:center">
       <select-component :preset="preset.list" :index="0" v-on:update:value="temp=$event"/>
       <p class="list-heading" style="margin-left:8px;">Words for Email</p>
    </div>
    
    <div style="display:flex; align-items:center">
      <select-component :preset="preset.list" :index="1" v-on:update:value="temp=$event"/>
      <p class="list-heading" style="margin-left:8px;">Words for Text Messages</p>
    </div> 
    
    <Start :to="startTo" style="align-items:left"/>
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
        // Wordlists are in KeyboardPage line 30 (wordDatabase)
      }
    }
  }
</script>


<style scoped>
  .heading {
    font-size:40px;
    text-align: center;
    color: rgba(44, 44, 46)
  }
  
  .list-heading {
    font-size:22px;
    text-align: left;
  }
</style>
