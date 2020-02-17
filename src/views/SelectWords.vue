<template>
  <div>
    <div style="display:flex;justify-content:center;position:relative">
      <div class=heading>Select Category</div>
        <router-link style="position:fixed;text-decoration:none;right:0;" to="/settings">
          <font-awesome-icon style="font-size:75;color:rgba(142, 142, 147);" icon="cog"/>
        </router-link>
    </div>
    
     <div v-for="(list, index) in lists" v-bind:key="index" style="display:flex; align-items:center">
       <SelectButton :preset="preset.selected[index]" :index="index" v-on:update:value="temp=$event"/>
       <p class="list-heading" style="margin-left:8px;">{{list}}</p>
    </div>
    
<!--
    <div style="display:flex; align-items:center">
      <SelectButton :preset="preset.list[1]" :index="1" v-on:update:value="temp=$event"/>
      <p class="list-heading" style="margin-left:8px;">Words for Text Messages</p>
    </div>
-->
    
    <div v-for="(customList, index) in customLists" v-bind:key="index + 2" style="display:flex; align-items:center" >
      <SelectButton :preset="preset.customSelected[index]" :index="index + 2" v-on:update:value="temp=$event" />
      <p class="list-heading" style="margin-left:8px;">{{customList}}</p>
    </div>
    
    <Start :to="startTo" style="align-items:left"/>
    <InbuiltWordlists v-on:inbuiltCreated="inbuiltCreated" />
  </div>
</template>

<script>
  import SelectButton from '@/components/SelectButton.vue';
  import Start from '@/components/StartButton.vue';
  import InbuiltWordlists from '@/components/InbuiltWordlists.vue';
  
  export default {
    data() {
      return {
        //Inbuilt lists
        lists: [],
        words: [],
        selected: [],
        //Custom lists
        customLists: [],
        customWords: [],
        customSelected: [],
        temp: null,
        preset: {
          selected: [],
          customSelected: [],
        },
        startTo: "/keyboard",
      }
    },
    components: {
      'SelectButton' : SelectButton,
      'Start' : Start,
      InbuiltWordlists
    },
    created() {
      
      // Import inbuilt lists from cookies
      if (this.$cookies.isKey('select_list.list')) {
        this.preset.selected = JSON.parse("[" + this.$cookies.get('select_list.list') + "]");
//        window.console.log(this.preset.selected)
      } else {
      // fix this in the future - preset should be all false and the same size as the number of word lists (currently 2)
        var size = 2;
        this.preset.selected = Array.apply(null, Array(size)).map(Boolean.prototype.valueOf,false);
      }
      
      // Importing the custom lists and whether they are selected from cookies
      if (this.$cookies.isKey('wordlists.lists')) {
        this.customLists = this.$cookies.get('wordlists.lists').split(',');
        if (this.$cookies.isKey('wordlists.select')) {
          this.preset.customSelected = JSON.parse("[" + this.$cookies.get('wordlists.select') + "]");
        } else {
          this.preset.customSelected = Array.apply(null, Array(this.customLists.length)).map(Boolean.prototype.valueOf,false);
        }
      }
      
      // Importing words of custom lists from cookies
      if (this.$cookies.isKey('wordlists.words')) {
        var words = this.$cookies.get('wordlists.words').split('|').slice(0,-1);
        for (var i = 0; i < words.length; i++){
          if (words[i].includes(',')) {
            this.customWords.push(words[i].split(','));
          } else {
            this.customWords.push(words[i]);
          }
        }
      }
      
      this.selected = this.preset.selected;
      this.customSelected = this.preset.customSelected;
    },
    methods: {
      inbuiltCreated(wordlists) {
        for (var i = 0; i < wordlists.length; i++) {
          this.lists.push(Object.keys(wordlists[i])[0]);
          this.words.push(Object.values(wordlists[i])[0]);
        }
      }
    },
    watch: {
      'temp' : function(val){
        if (val.index < 2) {
          this.selected[val.index] = val.value;
          this.$cookies.set('select_list.list', this.selected);
        } else {
          this.customSelected[val.index - 2] = val.value;
          this.$cookies.set('wordlists.select', this.customSelected);
        }
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
