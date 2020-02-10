<template>
  <div>
    <div class=heading>Select Word List</div>
    <router-link style="display:flex;justify-content:flex-end;align-items:center;text-decoration:none;" to="/settings">
      <font-awesome-icon style="font-size:100;color:rgba(142, 142, 147);" icon="cog"/>
    </router-link>
    
    <div>
      <p class="list-heading">List A</p>
      <SelectButton :preset="preset.list[0]" :index=0 v-on:update:value="temp=$event"/>
    </div>
    
    <p class="list-heading">List B</p>
    <SelectButton :preset="preset.list[1]" :index=1 v-on:update:value="temp=$event"/>
    
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
        list: [false,false], //Change this eventually - length of this array must be the same as wordDatabase in KeyboardPage (line 30)
        temp: null,
        preset: {
          list: [false,false],
        },
        startTo: "/keyboard",
      }
    },
    components: {
      'SelectButton' : SelectButton,
      'Start' : Start,
    },
    created() {
      // fix this in the future - preset should be all false and the same size as the number of word lists (currently 2) 
      if (this.$cookies.isKey('select_list.list')) {
        this.preset.list = JSON.parse('[' + this.$cookies.get('select_list.list') + ']');
      } else {
        this.preset.list = [false,false];
      }
      window.console.log("presetlist",this.preset.list);
    },
    watch: {
      'temp' : function(val){
        window.console.log("temp",this.temp);
        this.list[val.index] = val.value;
        this.$cookies.set('select_list.list', this.list);
        // Wordlists are in KeyboardPage line 30 (wordDatabase)
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
