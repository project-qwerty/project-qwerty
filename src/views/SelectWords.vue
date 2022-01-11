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
        <SelectButton :title="list" :isCustomList="false" :isSelected="builtInSelected.includes(list)" v-on:update:value="wordListClicked" :image_path="list + '.png'"/>
      </div>

      <!-- Custom word lists -->
      <div v-for="(list, index) in customLists" v-bind:key="list" class="customs-list">
        <SelectButton :title="list" :isCustomList="true" :isSelected="customSelected.includes(list)" v-on:update:value="wordListClicked" :image_path="'Custom_' + index + '.png'" />
        <!-- TODO: this will fail after 5 custom lists, this needs to be fixed somehow before production -->
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
  import InbuiltImagesLists from '@/components/InbuiltImageLists.js';
  import Cookies from '@/components/Cookies.js';

  export default {
    data() {
      return {
        builtInLists: [],
        builtInSelected: [],

        customLists: [],
        customSelected: [],

        startButtonHidden: true,

        inbuiltImagesLists: InbuiltImagesLists,
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
        this.customLists = Cookies.getCustomListNames();
      },
      loadSelected() {
        this.builtInSelected = Cookies.getSelectedBuiltInListNames();
        this.customSelected = Cookies.getSelectedCustomListNames();
        // TODO: delete from selected lists if the list doesn't exist (any more)
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
          Cookies.setBuiltInListSelected(event.listName, event.isSelected);
        } else {
          Cookies.setCustomListSelected(event.listName, event.isSelected);
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
