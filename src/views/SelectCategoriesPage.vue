<template>
  <NavPage>
    <header class="title-controls-header">
      <IconHeader
          icon="keyboard"
          icon-colour="var(--primary-colour)"
          text="Select category"
          :major="true" />

      <div class="controls">
        <ActionButton
            class="start-button"
            text="Start"
            :enabled="anyCategoriesSelected()"
            @click="$router.push('/practice')" />
      </div>
    </header>

    <IconHeader text="Built-in categories" />

    <div class="tiles">
      <ToggleTile
          v-for="(categoryName, index) in builtInCategories"
          :key="index"
          class="tile"
          :text="categoryName"
          :icon="BuiltInCategories[categoryName].icon"
          :colour="Colours.indexToColour(index)"
          :enabled="builtInSelected.includes(categoryName)"
          @update="builtInCategoryClicked($event)" />
    </div>

    <IconHeader text="Custom categories" />

    <div class="tiles">
      <ToggleTile
          v-for="(categoryName, index) in customCategories"
          :key="index"
          class="tile"
          :text="categoryName"
          :colour="Colours.stringToColour(categoryName)"
          :enabled="customSelected.includes(categoryName)"
          @update="customCategoryClicked($event)" />
    </div>
  </NavPage>
</template>

<script>
  import BuiltInCategories from '@/functions/BuiltInCategories.js';
  import LocalStorage from '@/functions/LocalStorage.js';
  import Colours from '@/functions/Colours.js'

  import ActionButton from '@/components/ActionButton.vue';
  import ToggleTile from '@/components/ToggleTile.vue';
  import NavPage from '@/components/NavPage.vue';
  import IconHeader from '@/components/IconHeader.vue';

  export default {
    components: {
      ActionButton,
      ToggleTile,
      NavPage,
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

  .tiles {
    --tile-size-multiplier: 1.25;

    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(calc(8rem * var(--tile-size-multiplier)), 1fr));

    gap: 1rem;
  }

  .tile {
    font-size: calc(1rem * var(--tile-size-multiplier));

    height: calc(8rem * var(--tile-size-multiplier));
  }

  @media screen and (max-width: 960px) {
    .tiles {
      --tile-size-multiplier: 1;
    }
  }
</style>
