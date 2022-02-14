<template>
  <div>
    <div class="header">
      <!-- Page header -->
      <div class="heading">Select a category to practise</div>
      <!-- Link to settings -->
      <router-link class="link-to-settings" to="/settings">
        <font-awesome-icon class="link-to-settings-cog" icon="cog" />
      </router-link>
    </div>

    <div class="categories-list">

      <!-- Built-in word lists -->
      <div v-for="list in builtInLists" v-bind:key="list" class="builtins-list">
        <SelectButton :title="list" :isCustomList="false" :isSelected="builtInSelected.includes(list)" v-on:update:value="wordListClicked" :image="list + '.png'"/>
      </div>

      <!-- Custom word lists -->
      <div v-for="(list, index) in customLists" v-bind:key="list" class="customs-list">
        <SelectButton :title="list" :isCustomList="true" :isSelected="customSelected.includes(list)" v-on:update:value="wordListClicked" :image="'Custom_' + index + '.png'" />
      </div>

    </div>

    <!-- Start button -->
    <router-link class="start-button" to="/keyboard" v-if="!startButtonHidden">
      <p class="start-text">START</p>
      <font-awesome-icon class="start-chevron" icon="chevron-right" />
    </router-link>
  </div>
</template>

<script>
  import SelectButton from '@/components/SelectButton.vue';
  import InbuiltWordlists from '@/components/InbuiltWordlists.js';
  import LocalStorage from '@/components/LocalStorage.js';

  export default {
    data() {
      return {
        builtInLists: [],
        builtInSelected: [],

        customLists: [],
        customSelected: [],

        startButtonHidden: true,

        inbuiltWordlists: InbuiltWordlists,
      }
    },
    components: {
      'SelectButton': SelectButton,
    },
    created() {
      this.loadEverything();
    },
    methods: {
      loadLists() {
        this.builtInLists = Object.keys(this.inbuiltWordlists);
        this.customLists = LocalStorage.getCustomListNames()
          // don't let the user select lists with no words
          .filter(listName => LocalStorage.getCustomList(listName).length > 0);
      },
      loadSelected() {
        this.builtInSelected = LocalStorage.getSelectedBuiltInListNames();
        this.customSelected = LocalStorage.getSelectedCustomListNames();
      },
      setStartButtonVisibility() {
        const anyListsSelected = this.builtInSelected.length + this.customSelected.length > 0;
        this.startButtonHidden = !anyListsSelected;
      },
      loadEverything() {
        this.loadLists();
        this.loadSelected();
        this.setStartButtonVisibility();
      },
      wordListClicked(event) {
        // event is emitted by SelectButton
        //   {listName: name_of_list, isCustomList: true/false, isSelected: true/false}

        if (!event.isCustomList) {
          LocalStorage.setBuiltInListSelected(event.listName, event.isSelected);
        } else {
          LocalStorage.setCustomListSelected(event.listName, event.isSelected);
        }

        this.loadEverything();
      },
    },
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
</style>
