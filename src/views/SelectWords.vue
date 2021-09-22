<template>
  <div>
    <div class="header">
      <!-- Page header -->
      <div class=heading>Select a category to practise</div>
      <!-- Link to settings -->
      <router-link class="link-to-settings" to="/settings">
        <font-awesome-icon class="link-to-settings-cog" icon="cog" />
      </router-link>
    </div>

    <div class="categories-list">

      <!-- Built-in word lists -->
      <div v-for="(list, index) in lists" v-bind:key="index" class="builtins-list">
        <SelectButton :preset="preset.selected[index]" :index="index" :title="list" v-on:update:value="temp=$event" :image_path="inbuiltImagesLists[index]"/>
      </div>

      <!-- Custom word lists -->
      <div v-for="(customList, index) in customLists" v-bind:key="index + inbuiltWordlists.length" class="customs-list">
        <SelectButton :preset="preset.customSelected[index]" :index="index + inbuiltWordlists.length" :title="customList" v-on:update:value="temp=$event" :image_path="inbuiltImagesLists[index + inbuiltWordlists.length]" />
      </div>

    </div>

    <!-- Start button -->
    <router-link class="start-button" :to="startTo" v-if="!hidden">
      <p class="start-text">START</p>
      <font-awesome-icon class="start-chevron" icon="chevron-right" />
    </router-link>
  </div>
</template>

<script>
  import SelectButton from '@/components/SelectButton.vue';
  import InbuiltWordlists from '@/components/InbuiltWordlists.js';
  import InbuiltImagesLists from '@/components/InbuiltImageLists.js';
  import Cookies from '@/components/Cookies.js';

  export default {
    data() {
      return {
        // Inbuilt lists
        lists: [],
        words: [],
        selected: [],
        // Custom lists
        customLists: [],
        customWords: [],
        customSelected: [],
        temp: null,
        hidden: true,
        preset: {
          selected: [],
          customSelected: [],
        },
        startTo: "/keyboard",
        inbuiltImagesLists : InbuiltImagesLists,
        inbuiltWordlists : InbuiltWordlists,
        cookies : Cookies,
        cookieNames: [],
        cookieInitialValues: [],
      }
    },
    components: {
      'SelectButton' : SelectButton,
    },
    created() {
      // Initialise settings cookies
      this.cookiesCreated(this.cookies);
      for (var x = 0; x < this.cookieNames[0].length; x++) {
        if (!this.$cookies.isKey(this.cookieNames[0][x])) {
          this.$cookies.set(this.cookieNames[0][x], this.cookieInitialValues[0][x]);
        }
      }

      // Import which inbuilt lists are selected from cookies
      var size = this.inbuiltWordlists.length;
      if (this.$cookies.isKey('select_words.built_in_selected')) {
        // Set preset from cookie
        var thisList = JSON.parse("[" + this.$cookies.get('select_words.built_in_selected') + "]")
        this.preset.selected = thisList;
        // This is for when we update the inbuilt lists - length of cookie doesn't match number of inbuilt lists
        if (size !== this.preset.selected.length) {
          this.preset.selected = Array.apply(null, Array(size)).map(Boolean.prototype.valueOf,false);
        }
      } else {
        // Cookie doesn't exist
        this.preset.selected = Array.apply(null, Array(size)).map(Boolean.prototype.valueOf,false);
      }

      // Importing the custom lists and whether they are selected from cookies
      if (this.$cookies.isKey('custom_word_lists.lists')) {
        // Make list from cookies
        this.customLists = this.$cookies.get('custom_word_lists.lists').split(',');
        if (this.$cookies.isKey('select_words.custom_selected')) {
          // Set selected preset from cookie
          this.preset.customSelected = JSON.parse("[" + this.$cookies.get('select_words.custom_selected') + "]");
          // This is for when they have just made a new custom list
          if (this.preset.customSelected.length !== this.customLists.length) {
            // Set preset selected to all false (should incorporate any selections they have previously made but this is much easier)
            this.preset.customSelected = Array.apply(null, Array(this.customLists.length)).map(Boolean.prototype.valueOf,false);
          }
        // They have just made their first custom list so they have custom lists but no selected cookie
        } else {
          // Set default to false
          this.preset.customSelected = Array.apply(null, Array(this.customLists.length)).map(Boolean.prototype.valueOf,false);
        }
      }

      if (this.$cookies.isKey('custom_word_lists.words')) {
        var words = this.$cookies.get('custom_word_lists.words').split('|').slice(0,-1);
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
      this.inbuiltCreated(this.inbuiltWordlists)
      if(this.selected.includes(true) || this.customSelected.includes(true)) {
            this.hidden = false;
          } else {
            this.hidden = true;
          }
    },
    methods: {
      inbuiltCreated(wordlists) {
        for (var i = 0; i < wordlists.length; i++) {
          this.lists.push(Object.keys(wordlists[i])[0]);
          this.words.push(Object.values(wordlists[i])[0]);
        }
      },
      cookiesCreated(cookies) {
        this.cookieNames.push(Object.values(cookies[0])[0]);
        this.cookieInitialValues.push(Object.values(cookies[1])[0]);
      }
    },

    watch: {
      'temp' : function(val){
        if (val.index < this.inbuiltWordlists.length) {
          this.selected[val.index] = val.value;
          this.$cookies.set('select_words.built_in_selected', this.selected);
        } else {
          this.customSelected[val.index - this.inbuiltWordlists.length] = val.value;
          this.$cookies.set('select_words.custom_selected', this.customSelected);
        }
        if(this.selected.includes(true) || this.customSelected.includes(true)) {
          this.hidden = false;
        } else {
          this.hidden = true;
        }

      }
    }
  }
</script>


<style scoped>
  .header {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .heading {
    font-size: 40px;
    flex-grow: 1;
  }

  .link-to-settings {
    text-decoration: none;
  }

  .link-to-settings-cog {
    font-size: 50px;
    color: rgba(142, 142, 147);
  }

  .categories-list {
    display: flex;
    align-items: center;
    justify-content: left;
    flex-wrap: wrap;
    margin-top: 10px;
  }

  .builtins-list {
    display: flex;
    align-items: center;
    margin: 10px;
  }

  .customs-list {
    display: flex;
    align-items: center;
    margin: 10px;
  }

  .start-button-container {
    width: 460px;
    margin: auto;
  }

  /* The start button classes are defined in the homepage CSS. */
  /* They'll need to be brought back here when all of the CSS is converted to locally scoped. */

</style>
