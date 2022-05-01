<template>
  <div>
    <header>
      <IconHeader
          class="category-title"
          icon="list"
          :iconColour="Colours.stringToColour(categoryName)"
          :text="categoryName" />

      <ActionButton
          class="new-word-button"
          icon="plus"
          text="New word"
          v-on:click="clickAddWord" />

      <Dropdown
          class="options-menu"
          :options="[
            { label: 'Rename category', icon: 'i-cursor', action: 'rename' },
            { label: 'Export category', icon: 'right-from-bracket', action: 'export' },
            { label: 'Delete category', icon: 'trash-can', action: 'delete' },
          ]"
          v-on:click="handleDropdownClick" />
    </header>

    <div class="word-list-wrapper">
      <div
          class="word-row"
          v-for="(word, index) in wordValues" v-bind:key="index">

        <input
            class="qwerty-text-input"
            :class="{ invalid: !Validation.isValidWord(word) }"
            placeholder="new word"
            v-model="wordValues[index]"
            @input="updateWord(index)">

        <IconButton
            icon="x"
            v-on:click="clickDeleteWord(index)" />

      </div>
    </div>

    <Modal
        :shown="showRenameCategoryModal"
        v-on:click-out="cleanUpRenameCategory">
      <h1>Rename category</h1>
      <input
          class="qwerty-text-input modal-text-input"
          placeholder="New category name"
          v-model="inputCategoryName">
      <div class="buttons-row">
        <ActionButton
            text="Cancel"
            :major="false"
            v-on:click="cleanUpRenameCategory" />
        <ActionButton
            text="Rename category"
            :enabled="Validation.isValidCategoryName(inputCategoryName)"
            v-on:click="clickRenameCategory" />
      </div>
    </Modal>

    <Modal
        :shown="showDeleteCategoryModal"
        v-on:click-out="cleanUpDeleteCategory">
      <h1>Delete category</h1>
      <p class="delete-warning">Are you sure you want to delete <strong>{{ categoryName }}</strong>? This can't be undone.</p>
      <div class="buttons-row">
        <ActionButton
            text="Cancel"
            :major="false"
            v-on:click="cleanUpDeleteCategory" />
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

  import IconHeader from '@/components/IconHeader.vue';
  import ActionButton from '@/components/ActionButton.vue';
  import Dropdown from '@/components/Dropdown.vue';
  import Modal from '@/components/Modal.vue';
  import IconButton from '@/components/IconButton.vue';

  export default {
    components: {
      IconHeader,
      ActionButton,
      Dropdown,
      Modal,
      IconButton,
    },
    props: {
      categoryName: String,
    },
    data() {
      return {
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
    methods: {
      loadWords() {
        this.wordValues = this.getWords();
        this.inputCategoryName = this.categoryName;
      },
      getWords() {
        // this conditional allows us to create the view without a category provided, with the intent to change it later
        if (!this.categoryName) {
          return null;
        }

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
      cleanUpRenameCategory() {
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

        this.$emit('change-category', this.inputCategoryName);

        this.cleanUpRenameCategory();
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
      cleanUpDeleteCategory() {
        this.showDeleteCategoryModal = false;
      },
      clickDeleteCategory() {
        LocalStorage.deleteCustomCategory(this.categoryName);

        this.cleanUpDeleteCategory();
        this.$emit('close');
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
  header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  /* this turns the final option (delete) red */
  /deep/ .options-menu .dropdown-item:last-of-type {
    color: var(--negative-colour);
  }

  .category-title {
    flex-grow: 1;
  }

  .new-word-button {
    margin-right: 16px;
  }

  .word-list-wrapper {
    border-top: solid 1px var(--faint-colour);
    border-bottom: solid 1px var(--faint-colour);
  }

  .word-row {
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-top: 1em;
    margin-bottom: 1em;
  }

  .word-row * {
    font-size: 20px;

    margin-left: 1em;
    margin-right: 1em;
  }

  .word-row .qwerty-text-input {
    display: block;
  }

  .qwerty-text-input.invalid {
    border-color: var(--negative-colour);
  }

  .modal-text-input {
    width: 100%;

    margin-bottom: 1em;

    font-size: 20px;
  }

  .delete-warning {
    font-size: 20px;
  }

  .buttons-row {
    display: flex;
    justify-content: flex-end;

    padding-left: 5em;
    gap: 1em;
  }
</style>
