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
            :enabled="anyListsSelected()"
            v-on:click="$router.push('/practice')" />
      </header>

      <IconHeader text="Built-in lists" />

      <div class="tiles">
        <ToggleTile
            v-for="(listName, index) in builtInLists" v-bind:key="index"
            class="tile"
            :text="listName"
            :icon="BuiltInWordLists[listName].icon"
            :colour="Colours.indexToColour(index)"
            :enabled="builtInSelected.includes(listName)"
            v-on:update="builtInListClicked($event)" />
      </div>

      <IconHeader text="Custom lists" />

      <div class="tiles">
        <ToggleTile
            v-for="(listName, index) in customLists" v-bind:key="index"
            class="tile"
            :text="listName"
            :colour="Colours.stringToColour(listName)"
            :enabled="customSelected.includes(listName)"
            v-on:update="customListClicked($event)" />
      </div>
    </div>
  </div>
</template>

<script>
  import BuiltInWordLists from '@/functions/BuiltInWordLists.js';
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
        builtInLists: [],
        builtInSelected: [],

        customLists: [],
        customSelected: [],
      }
    },
    beforeCreate() {
      this.BuiltInWordLists = BuiltInWordLists;
      this.Colours = Colours;
    },
    created() {
      this.loadEverything();
    },
    methods: {
      anyListsSelected() {
        return this.builtInSelected.length + this.customSelected.length > 0;
      },
      loadLists() {
        // the filters prevent the user from selecting lists with no words
        this.builtInLists = Object.keys(this.BuiltInWordLists)
          .filter(listName => this.BuiltInWordLists[listName].list.length > 0);
        this.customLists = LocalStorage.getCustomListNames()
          .filter(listName => LocalStorage.getCustomList(listName).length > 0);
      },
      loadSelected() {
        this.builtInSelected = LocalStorage.getSelectedBuiltInListNames();
        this.customSelected = LocalStorage.getSelectedCustomListNames();
      },
      loadEverything() {
        this.loadLists();
        this.loadSelected();
      },
      builtInListClicked(event) {
        // event is emitted by ToggleTile
        //   {text: name_of_list, enabled: true/false}
        LocalStorage.setBuiltInListSelected(event.text, event.enabled);

        this.loadEverything();
      },
      customListClicked(event) {
        // event is emitted by ToggleTile
        //   {text: name_of_list, enabled: true/false}
        LocalStorage.setCustomListSelected(event.text, event.enabled);

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
    font-size: 16px;

    width: 10em;
    height: 8em;
  }
</style>
