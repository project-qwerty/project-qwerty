<template>
  <div class="page-layout">
    <Nav />

    <div class="page-content">
      <header>
        <IconHeader
            text="My categories"
            icon="pen"
            iconColour="var(--primary-colour)"
            :major="true" />
        <div class="action-dropdown-wrapper">
          <ActionButton
              icon="plus"
              text="New"
              v-on:click="showNewCategoryModal = true" />
          <Dropdown
              :options="[
                { label: 'Import category', icon: 'right-to-bracket', action: 'import' },
              ]"
              v-on:click="handleDropdownClick" />
        </div>
      </header>

      <div class="custom-categories border-top">
        <div
            class="custom-category border-bottom"
            v-for="(categoryName, index) in getCategories()" v-bind:key="index">
          <RowButton class="custom-category"
              v-on:click="$router.push('/custom-categories/' + categoryName)"
              :text="categoryName"
              icon="list"
              :iconColour="Colours.stringToColour(categoryName)" />
        </div>
      </div>

      <input ref="file-picker" type="file" multiple @change="handleImportFiles" style="display: none;">
    </div>

    <!-- Place modal as sibling of page content to enable it to appear over the fixed hamburger menu area at top of page-->
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
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .buttons-row {
    display: flex;
    justify-content: flex-end;
    gap: 1em;
  }

  .custom-categories {
    width: 100%;
  }

  .custom-category {
    font-size: 24px;
    margin: 1rem 0px;  }

  .qwerty-text-input {
    font-size: 20px;
    margin-bottom: 1em;
    width: 100%;
  }

  @media (min-width: 600px) {
    header {
      flex-direction: row;
      justify-content: space-between;
    }
  }
</style>
