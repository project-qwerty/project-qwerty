<template>
  <div class="page-layout">
    <Nav />

    <div class="page-content">
      <RowButton
          class="back-button"
          icon="chevron-left"
          text="Back"
          v-on:click="$router.back()" />

      <div class="category-header faint-border-bottom">
        <IconHeader
            class="category-title"
            icon="list"
            :iconColour="Colours.stringToColour(categoryName)"
            :text="categoryName" />
        <div class="controls-wrapper">
          <ActionButton
              class="new-word-button"
              icon="plus"
              text="New"
              v-on:click="clickAddWord" />
          <Dropdown
              class="options-menu"
              :options="[
                { label: 'Rename category', icon: 'i-cursor', action: 'rename' },
                { label: 'Export category', icon: 'right-from-bracket', action: 'export' },
                { label: 'Delete category', icon: 'trash-can', action: 'delete' },
              ]"
              v-on:click="handleDropdownClick" />
        </div>
      </div>

      <div
          class="word-wrapper"
          v-for="(word, index) in wordValues" v-bind:key="index">

        <input
            class="qwerty-text-input"
            :class="{ invalid: !Validation.isValidWord(word) }"
            placeholder="new word"
            v-model="wordValues[index]"
            @input="updateWord(index)">

        <IconButton
            class="delete-word-button"
            icon="x"
            v-on:click="clickDeleteWord(index)" />

      </div>
    </div>

    <!--    Place modals as siblings of page content to enable them to appear over the fixed hamburger menu area at top of page-->
    <Modal
        :shown="showRenameCategoryModal"
        v-on:click-out="clickCancelRenameCategory">
      <h1>Rename category</h1>
      <input
          class="qwerty-text-input modal-text-input"
          placeholder="New category name"
          v-model="inputCategoryName">
      <div class="buttons-row">
        <ActionButton
            text="Cancel"
            :major="false"
            v-on:click="clickCancelRenameCategory" />
        <ActionButton
            text="Rename"
            :enabled="Validation.isValidCategoryName(inputCategoryName)"
            v-on:click="clickRenameCategory" />
      </div>
    </Modal>

    <Modal
        :shown="showDeleteCategoryModal"
        v-on:click-out="clickCancelDeleteCategory">
      <h1>Delete category</h1>
      <p class="delete-warning">Are you sure you want to delete <strong>{{ categoryName }}</strong>? This can't be undone.</p>
      <div class="buttons-row">
        <ActionButton
            text="Cancel"
            :major="false"
            v-on:click="clickCancelDeleteCategory" />
        <ActionButton
            text="Delete"
            colour="var(--negative-colour)"
            v-on:click="clickDeleteCategory" />
      </div>
    </Modal>
  </div>
</template>


<script>
  import LocalStorage from '@/functions/LocalStorage.js';
  import Colours from '@/functions/Colours.js'
  import Validation from '@/functions/Validation.js';

  import Nav from '@/components/Nav.vue';
  import RowButton from '@/components/RowButton.vue';
  import IconHeader from '@/components/IconHeader.vue';
  import ActionButton from '@/components/ActionButton.vue';
  import Dropdown from '@/components/Dropdown.vue';
  import Modal from '@/components/Modal.vue';
  import IconButton from '@/components/IconButton.vue';

  export default {
    components: {
      Nav,
      RowButton,
      IconHeader,
      ActionButton,
      Dropdown,
      Modal,
      IconButton,
    },
    data() {
      return {
        categoryName: null,  // should be set in created()

        showRenameCategoryModal: false,
        showDeleteCategoryModal: false,

        wordValues: null,

        inputCategoryName: null,
      }
    },
    watch: {
      categoryName() {
        this.loadWords();
      },
    },
    beforeCreate() {
      this.Colours = Colours;
      this.Validation = Validation;
    },
    created() {
      this.categoryName = this.$route.params['name'];
    },
    methods: {
      loadWords() {
        this.wordValues = this.getWords();
        this.inputCategoryName = this.categoryName;
      },
      getWords() {
        return LocalStorage.getCustomCategory(this.categoryName);
      },
      handleDropdownClick(operation) {
        if (operation === 'rename') {
          this.showRenameCategoryModal = true;
        } else if (operation === 'export') {
          this.clickExportCategory();
        } else if (operation === 'delete') {
          this.showDeleteCategoryModal = true;
        }
      },
      clickCancelRenameCategory() {
        this.showRenameCategoryModal = false;
        this.inputCategoryName = this.categoryName;
      },
      clickRenameCategory() {
        // prevent renaming to an invalid name
        // the action button should be disabled but you never know
        if (!Validation.isValidCategoryName(this.inputCategoryName)) {
          return;
        }

        LocalStorage.renameCustomCategory(this.categoryName, this.inputCategoryName);

        this.$router.back();
      },
      sanitiseFileName(fileName) {
        const illegalCharacters = ['<', '>', ':', '"', '/', '\\', '|', '?', '*'];

        for (const char of illegalCharacters) {
          fileName = fileName.replace(char, '_');
        }

        return fileName;
      },
      downloadTextAsJson(text) {
        // adapted from https://stackoverflow.com/a/60377870/4809728
        const tempElement = document.createElement('a');
        tempElement.href = URL.createObjectURL(new Blob([text], { type: 'application/json' }));

        const fileName = this.sanitiseFileName(this.categoryName) + '.json';
        tempElement.setAttribute('download', fileName);

        document.body.appendChild(tempElement);
        tempElement.click();
        document.body.removeChild(tempElement);
      },
      clickExportCategory() {
        this.downloadTextAsJson(LocalStorage.exportCategoryToJson(this.categoryName));
      },
      clickCancelDeleteCategory() {
        this.showDeleteCategoryModal = false;
      },
      clickDeleteCategory() {
        LocalStorage.deleteCustomCategory(this.categoryName);

        this.$router.back();
      },
      clickAddWord() {
        // we don't want the user to add more than one word at a time
        const alreadyHaveABlank = this.wordValues.some(word => word === '');
        if (alreadyHaveABlank) {
          return;
        }

        LocalStorage.addCustomWord(this.categoryName, '');
        this.loadWords();
      },
      updateWord(index) {
        LocalStorage.editCustomWord(this.categoryName, index, this.wordValues[index]);
        this.loadWords();
      },
      clickDeleteWord(index) {
        LocalStorage.deleteCustomWord(this.categoryName, index);
        this.loadWords();
      },
    },
  }
</script>


<style scoped>
  .back-button {
    font-size: 24px;
  }

  .buttons-row {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
  }

  .category-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: var(--margin-vertical);
    /* No margin-right for dropdown position to be closer to the edge of the page */
    margin-top: var(--margin-vertical);
  }

  .controls-wrapper {
    display: flex;
  }

  .delete-word-button {
    margin-left: 1rem;
  }

  .modal-text-input {
    margin-bottom: 1.5rem;
  }

  .options-menu {
    margin-right: -0.5rem;
  }

  .word-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 2rem 0px;
  }

  input {
    font-size: 20px;
    width: 100%;
  }
</style>
