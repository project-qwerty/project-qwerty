<template>
  <div>
    <div style="display:flex;justify-content:center;position:relative">
      <div class=heading>Select Word List</div>
        <router-link style="position:fixed;text-decoration:none;right:0;" to="/settings">
          <font-awesome-icon style="font-size:75;color:rgba(142, 142, 147);" icon="cog"/>
        </router-link>
    </div>
    
     <div style="display:flex; align-items:center">
       <SelectButton :preset="preset.list[0]" :index="0" v-on:update:value="temp=$event"/>
       <p class="list-heading" style="margin-left:8px;">Words for Email</p>
    </div>
    
    <div style="display:flex; align-items:center">
      <SelectButton :preset="preset.list[1]" :index="1" v-on:update:value="temp=$event"/>
      <p class="list-heading" style="margin-left:8px;">Words for Text Messages</p>
    </div>
    
    <div style="display:flex; align-items:center">
      <SelectButton :preset="preset.list" :index="2" />
      <p class="list-heading" style="margin-left:8px;">100 Magic Words (non-functional)</p>
    </div>
    
    <div style="display:flex; align-items:center">
      <SelectButton :preset="preset.list" :index="2" />
      <p class="list-heading" style="margin-left:8px;">Short Regular Words (non-functional)</p>
    </div> 
    
    <div style="display:flex; align-items:center">
      <SelectButton :preset="preset.list" :index="2" />
      <p class="list-heading" style="margin-left:8px;">Long Regular Words (non-functional)</p>
    </div>
    
    <div style="display:flex; align-items:center">
      <SelectButton :preset="preset.list" :index="2" />
      <p class="list-heading" style="margin-left:8px;">Short Irregular Words (non-functional)</p>
    </div> 
    
    <div style="display:flex; align-items:center">
      <SelectButton :preset="preset.list" :index="2" />
      <p class="list-heading" style="margin-left:8px;">Long Irregular Words (non-functional)</p>
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
    font-size:40px;
    text-align: center;
    color: rgba(44, 44, 46);
  }
  
  .list-heading {
    font-size:22px;
    text-align: left;
  }
</style>
