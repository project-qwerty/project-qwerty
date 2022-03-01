<template>
  <div>
    <NavSidebar />

    <div class="sidebar-page-content">
      <!-- category list view -->
      <div class="category-list-section"
          :class="{ hidden: selectedList !== null }">
        <header>
          <IconHeader
              class="page-header"
              text="My categories"
              :major="true" />

          <ActionButton
              class="new-category-button"
              icon="plus"
              text="New category"
              v-on:click="showNewCategoryModal = true" />

          <Dropdown
              :options="[
                { label: 'Import category', icon: 'right-to-bracket', action: 'import' },
              ]"
              v-on:click="handleDropdownClick" />
        </header>

        <RowButton class="custom-list"
            v-for="(listName, index) in getLists()" v-bind:key="index"
            v-on:click="selectedList = listName"
            :text="listName"
            icon="list"
            :iconColour="Colours.stringToColour(listName)" />
      </div>

      <div class="individual-category-section"
          :class="{ hidden: selectedList === null }">
        <RowButton
            class="back-button"
            icon="chevron-left"
            text="Back"
            v-on:click="selectedList = null" />

        <CustomListView :listName="selectedList" />
      </div>

      <Modal
          :shown="showNewCategoryModal"
          v-on:click-out="showNewCategoryModal = false">
        <h1>Add category</h1>
        <input
            class="qwerty-text-input"
            placeholder="New category"
            v-model="inputCategoryName">
        <div class="buttons-row">
          <ActionButton
              text="Cancel"
              :major="false"
              v-on:click="clickCancelCategory" />
          <ActionButton
              text="Create category"
              :enabled="isValidCategoryName(inputCategoryName)"
              v-on:click="clickCreateCategory" />
        </div>
      </Modal>

      <Modal
          :shown="showImportCategoryModal"
          v-on:click-out="showImportCategoryModal = false">
        <h1>Import category</h1>
        <textarea placeholder="this is where you will paste the JSON"></textarea>
        <ActionButton text="ok bye" v-on:click="showImportCategoryModal = false" />
      </Modal>
    </div>
  </div>
</template>



<script>
  import LocalStorage from '@/functions/LocalStorage.js'
  import Colours from '@/functions/Colours.js'

  import NavSidebar from '@/components/NavSidebar.vue';
  import Modal from '@/components/Modal.vue';
  import ActionButton from '@/components/ActionButton.vue';
  import IconHeader from '@/components/IconHeader.vue';
  import RowButton from '@/components/RowButton.vue';
  import Dropdown from '@/components/Dropdown.vue';
  import CustomListView from '@/components/CustomListView.vue';

  export default {
    components: {
      NavSidebar,
      Modal,
      ActionButton,
      IconHeader,
      RowButton,
      Dropdown,
      CustomListView,
    },
    data () {
      return {
        selectedList: null,

        showNewCategoryModal: false,
        showImportCategoryModal: false,

        inputCategoryName: '',
      }
    },
    beforeCreate() {
      this.Colours = Colours;
    },
    methods: {
      getLists() {
        return LocalStorage.getCustomListNames();
      },
      handleDropdownClick(operation) {
        if (operation === 'import') {
          this.showImportCategoryModal = true;
        }
      },
      isValidCategoryName(input) {
        const isWhitespace = input.replace(/\s/g, '') === '';
        const isAlreadyAList = this.getLists().some(listName => listName === input);

        return !isWhitespace && !isAlreadyAList;
      },
      clickCancelCategory() {
        this.showNewCategoryModal = false;
        this.inputCategoryName = '';
      },
      clickCreateCategory() {
        // prevent creating categories with invalid names
        // the action button should be disabled but you never know
        if (!this.isValidCategoryName(this.inputCategoryName)) {
          return;
        }

        LocalStorage.createCustomList(this.inputCategoryName);

        // clean up
        this.showNewCategoryModal = false;
        this.inputCategoryName = '';
      },
    },
  }
</script>

<style scoped>
  header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .page-header {
    flex-grow: 1;
  }

  .new-category-button {
    margin-right: 16px;
  }

  h1 {
    margin-bottom: 1em;
  }

  .qwerty-text-input {
    width: 100%;

    margin-bottom: 1em;

    font-size: 20px;
  }

  .buttons-row {
    display: flex;
    justify-content: end;
  }

  .custom-list {
    position: relative;

    font-size: 24px;

    padding-top: 1em;
    padding-bottom: 1em;

    border-bottom: solid 1px var(--faint-colour);
  }

  .back-button {
    display: inline-block;

    font-size: 24px;

    margin-top: 36px;
    padding-left: 0;
  }

  .hidden {
    display: none;
  }
</style>
