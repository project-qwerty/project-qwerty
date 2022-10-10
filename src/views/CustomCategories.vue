<template>
  <div class="page-layout">
    <Nav />

    <div class="page-content">
      <div class="category-list-section" :class="{ hidden: selectedCategory !== null }">
        <header>
          <IconHeader
              class="page-header"
              text="My categories"
              icon="pen"
              iconColour="var(--primary-colour)"
              :major="true" />
          <div class="action-dropdown-wrapper">
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
          </div>
        </header>
        <RowButton class="custom-category"
                   v-for="(categoryName, index) in getCategories()" v-bind:key="index"
                   v-on:click="$router.push('/custom-categories/' + categoryName)"
                   :text="categoryName"
                   icon="list"
                   :iconColour="Colours.stringToColour(categoryName)" />
        <input ref="file-picker" type="file" multiple @change="handleImportFiles" style="display: none;">
      </div>
    </div>
<!--    Place modal as sibling of page content to enable it to appear over the fixed hamburger menu area at top of page-->
    <Modal
        :shown="showNewCategoryModal"
        v-on:click-out="cleanUpCreateCategory">
      <h1>Add category</h1>
      <input
          class="qwerty-text-input"
          placeholder="New category"
          v-model="inputCategoryName">
      <div class="buttons-row">
        <ActionButton
            text="Cancel"
            :major="false"
            v-on:click="cleanUpCreateCategory" />
        <ActionButton
            text="Create"
            :enabled="Validation.isValidCategoryName(inputCategoryName)"
            v-on:click="clickCreateCategory" />
      </div>
    </Modal>
  </div>
</template>


<script>
  import LocalStorage from '@/functions/LocalStorage.js'
  import Colours from '@/functions/Colours.js'
  import Validation from '@/functions/Validation.js';

  import Nav from '@/components/Nav.vue';
  import Modal from '@/components/Modal.vue';
  import ActionButton from '@/components/ActionButton.vue';
  import IconHeader from '@/components/IconHeader.vue';
  import RowButton from '@/components/RowButton.vue';
  import Dropdown from '@/components/Dropdown.vue';

  export default {
    components: {
      Nav,
      Modal,
      ActionButton,
      IconHeader,
      RowButton,
      Dropdown,
    },
    data () {
      return {
        selectedCategory: null,

        showNewCategoryModal: false,

        inputCategoryName: '',
      }
    },
    beforeCreate() {
      this.Colours = Colours;
      this.Validation = Validation;
    },
    methods: {
      getCategories() {
        return LocalStorage.getCustomCategoryNames();
      },
      handleDropdownClick(operation) {
        if (operation === 'import') {
          this.clickImportCategory();
        }
      },
      cleanUpCreateCategory() {
        this.showNewCategoryModal = false;
        this.inputCategoryName = '';
      },
      clickCreateCategory() {
        // prevent creating categories with invalid names
        // the action button should be disabled but you never know
        if (!Validation.isValidCategoryName(this.inputCategoryName)) {
          return;
        }

        LocalStorage.createCustomCategory(this.inputCategoryName);

        this.cleanUpCreateCategory();
      },
      getFilePicker() {
        return this.$refs['file-picker'];
      },
      clickImportCategory() {
        this.getFilePicker().click();
      },
      async handleImportFiles(event) {
        for (const file of event.target.files) {
          const contents = await file.text();
          LocalStorage.importCategoryFromJson(contents);
        }

        this.$forceUpdate();
      },
    },
  }
</script>

<style scoped>
  header {
    align-items: center;
    display: flex;
    flex-direction: column;
  }

  .action-dropdown-wrapper {
    align-items: center;
    display: flex;
    flex-direction: row;
  }

  .buttons-row {
    display: flex;
    gap: 1em;
    justify-content: flex-end;
    margin-left: 5em;
  }

  .custom-category {
    border-bottom: solid 1px var(--faint-colour);
    font-size: 24px;
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
    position: relative;
  }

  .qwerty-text-input {
    font-size: 20px;
    margin-bottom: 1em;
    width: 100%;
  }
</style>