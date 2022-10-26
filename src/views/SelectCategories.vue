<template>
  <div class="page-layout">
    <Nav />

    <div class="page-content">
      <header class="title-controls-header">
        <IconHeader
            icon="keyboard"
            iconColour="var(--primary-colour)"
            text="Let's practice"
            :major="true" />

        <div class="controls">
          <ActionButton
              class="start-button"
              text="Start"
              :enabled="anyCategoriesSelected()"
              v-on:click="$router.push('/practice')" />
        </div>
      </header>

      <IconHeader text="Built-in categories" />

      <div class="tiles-wrapper">
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
      </div>

      <IconHeader text="Custom categories" />

      <div class="tiles-wrapper">
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
  </div>
</template>

<script>
  import BuiltInCategories from '@/functions/BuiltInCategories.js';
  import LocalStorage from '@/functions/LocalStorage.js';
  import Colours from '@/functions/Colours.js'

  import ActionButton from '@/components/ActionButton.vue';
  import ToggleTile from '@/components/ToggleTile.vue';
  import Nav from '@/components/Nav.vue';
  import IconHeader from '@/components/IconHeader.vue';

  export default {
    components: {
      ActionButton,
      ToggleTile,
      Nav,
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
        this.builtInCategories = Object.keys(this.BuiltInCategories);
        this.customCategories = LocalStorage.getUsableCustomCategoryNames();
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
  .start-button {
    font-size: 24px;

    display: flex;
    align-items: center;
  }

  .tiles-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 0px 1rem;
  }

  .tiles {
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr 1fr;
    margin-bottom: var(--margin-vertical);
    row-gap: 2rem;
  }

  .tile {
    font-size: 1rem;
    width: 8rem;
    height: 100%;
  }

  @media (min-width: 600px) {
    .tiles {
      gap: 2rem;
      grid-template-columns: 1fr 1fr 1fr;
    }
  }

  @media (min-width: 860px) {
    .tiles {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
  }

  @media (min-width: 1260px) {
    .tile {
      font-size: 20px;
      height: 10rem;
      min-width: 12rem;
    }

    .tiles {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
  }
</style>
