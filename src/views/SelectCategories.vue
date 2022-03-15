<template>
  <div>
    <NavSidebar />

    <div class="sidebar-page-content">
      <header>
        <IconHeader
            icon="keyboard"
            iconColour="var(--primary-colour)"
            text="Let's practice"
            :major="true" />

        <ActionButton
            class="start-button"
            text="Start"
            :enabled="anyCategoriesSelected()"
            v-on:click="$router.push('/practice')" />
      </header>

      <IconHeader text="Built-in categories" />

      <div class="tiles">
        <ToggleTile
            v-for="(categoryName, index) in builtInCategories" v-bind:key="index"
            class="tile"
            :text="categoryName"
            :icon="BuiltInCategories[categoryName].icon"
            :colour="Colours.indexToColour(index)"
            :enabled="builtInSelected.includes(categoryName)"
            v-on:update="builtInCategoryClicked($event)" />
      </div>

      <IconHeader text="Custom categories" />

      <div class="tiles">
        <ToggleTile
            v-for="(categoryName, index) in customCategories" v-bind:key="index"
            class="tile"
            :text="categoryName"
            :colour="Colours.stringToColour(categoryName)"
            :enabled="customSelected.includes(categoryName)"
            v-on:update="customCategoryClicked($event)" />
      </div>
    </div>
  </div>
</template>

<script>
  import BuiltInCategories from '@/functions/BuiltInCategories.js';
  import LocalStorage from '@/functions/LocalStorage.js';
  import Colours from '@/functions/Colours.js'

  import ActionButton from '@/components/ActionButton.vue';
  import ToggleTile from '@/components/ToggleTile.vue';
  import NavSidebar from '@/components/NavSidebar.vue';
  import IconHeader from '@/components/IconHeader.vue';

  export default {
    components: {
      ActionButton,
      ToggleTile,
      NavSidebar,
      IconHeader,
    },
    data() {
      return {
        builtInCategories: [],
        builtInSelected: [],

        customCategories: [],
        customSelected: [],
      }
    },
    beforeCreate() {
      this.BuiltInCategories = BuiltInCategories;
      this.Colours = Colours;
    },
    created() {
      this.loadEverything();
    },
    methods: {
      anyCategoriesSelected() {
        return this.builtInSelected.length + this.customSelected.length > 0;
      },
      loadCategories() {
        // the filters prevent the user from selecting categories with no words
        this.builtInCategories = Object.keys(this.BuiltInCategories)
          .filter(categoryName => this.BuiltInCategories[categoryName].words.length > 0);
        this.customCategories = LocalStorage.getCustomCategoryNames()
          .filter(categoryName => LocalStorage.getCustomCategory(categoryName).length > 0);
      },
      loadSelected() {
        this.builtInSelected = LocalStorage.getSelectedBuiltInCategoryNames();
        this.customSelected = LocalStorage.getSelectedCustomCategoryNames();
      },
      loadEverything() {
        this.loadCategories();
        this.loadSelected();
      },
      builtInCategoryClicked(event) {
        // event is emitted by ToggleTile
        //   {text: name_of_category, enabled: true/false}
        LocalStorage.setBuiltInCategorySelected(event.text, event.enabled);

        this.loadEverything();
      },
      customCategoryClicked(event) {
        // event is emitted by ToggleTile
        //   {text: name_of_category, enabled: true/false}
        LocalStorage.setCustomCategorySelected(event.text, event.enabled);

        this.loadEverything();
      },
    },
  }
</script>


<style scoped>
  header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .start-button {
    font-size: 24px;

    display: flex;
    align-items: center;
  }

  .tiles {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
  }

  .tile {
    font-size: 20px;

    width: 10em;
    height: 8em;
  }
</style>
