<template>
  <NavPage>
    <template #pretitle>
      <RowButton
          class="back-button"
          icon="chevron-left"
          text="Back"
          @click="$router.back()" />
    </template>

    <template #title>
      <IconHeader
          icon="list"
          :icon-colour="Colours.stringToColour(categoryName)"
          :text="categoryName" />
    </template>

    <template #controls>
      <div class="dropdown-balancer" />

      <ActionButton
          class="new-word-button"
          icon="plus"
          text="New word"
          :enabled="!alreadyHaveABlank"
          @click="clickAddWord" />

      <DropdownList
          class="options-menu"
          :options="[
            { label: 'Rename category', icon: 'i-cursor', action: 'rename' },
            { label: 'Export category', icon: 'right-from-bracket', action: 'export' },
            { label: 'Delete category', icon: 'trash-can', action: 'delete' },
          ]"
          @click="handleDropdownClick" />
    </template>

    <div class="faint-border-bottom">
      <div class="mobile-only faint-border-bottom" />

      <div
          v-for="(word, index) in wordValues"
          :key="index"
          class="word-row">

        <input
            v-model="wordValues[index]"
            class="qwerty-text-input"
            :class="{
              invalid: !Validation.isValidWord(word),
              newest: index === wordValues.length - 1,
            }"
            placeholder="new word"
            @input="updateWord(index)" />

        <IconButton
            icon="x"
            @click="clickDeleteWord(index)" />

      </div>
    </div>

    <FullscreenModal
        :shown="showRenameCategoryModal"
        @click-out="clickCancelRenameCategory">
      <h1>Rename category</h1>
      <input
          v-model="inputCategoryName"
          class="qwerty-text-input modal-text-input rename-input"
          placeholder="New category name" />
      <div class="buttons-row">
        <ActionButton
            text="Cancel"
            :major="false"
            @click="clickCancelRenameCategory" />
        <ActionButton
            text="Rename"
            :enabled="Validation.isValidCategoryName(inputCategoryName)"
            @click="clickRenameCategory" />
      </div>
    </FullscreenModal>

    <FullscreenModal
        :shown="showDeleteCategoryModal"
        @click-out="clickCancelDeleteCategory">
      <h1>Delete category</h1>
      <p class="delete-warning">Are you sure you want to delete <strong>{{ categoryName }}</strong>? This can't be undone.</p>
      <div class="buttons-row">
        <ActionButton
            text="Cancel"
            :major="false"
            @click="clickCancelDeleteCategory" />
        <ActionButton
            text="Delete"
            colour="var(--negative-colour)"
            @click="clickDeleteCategory" />
      </div>
    </FullscreenModal>
  </NavPage>
</template>


<script>
  import LocalStorage from '@/functions/LocalStorage.js';
  import Colours from '@/functions/Colours.js';
  import Validation from '@/functions/Validation.js';
  import Input from '@/functions/Input.js';

  import NavPage from '@/components/NavPage.vue';
  import RowButton from '@/components/RowButton.vue';
  import IconHeader from '@/components/IconHeader.vue';
  import ActionButton from '@/components/ActionButton.vue';
  import DropdownList from '@/components/DropdownList.vue';
  import FullscreenModal from '@/components/FullscreenModal.vue';
  import IconButton from '@/components/IconButton.vue';

  export default {
    components: {
      NavPage,
      RowButton,
      IconHeader,
      ActionButton,
      DropdownList,
      FullscreenModal,
      IconButton,
    },
    data() {
      return {
        categoryName: null,  // should be set in created()

        showRenameCategoryModal: false,
        showDeleteCategoryModal: false,

        wordValues: null,

        inputCategoryName: null,
      };
    },
    computed: {
      alreadyHaveABlank() {
        if (this.wordValues === null) {
          return false; // this shouldn't be a case but seems to be during page load
        }
        return this.wordValues.some(word => word === '');
      },
    },

    watch: {
      categoryName() {
        this.loadWords();
      },
    },
    beforeCreate() {
      this.Colours = Colours;
      this.Validation = Validation;
      this.Input = Input;
    },
    created() {
      this.categoryName = this.$route.params['name'];

      // make sure the url-supplied category name is a real category
      const customCategoryNames = LocalStorage.getCustomCategoryNames();
      if (!customCategoryNames.includes(this.categoryName)) {
        // replace the current page with the 404 page defined in the router, and don't change the url
        // this makes it clear to the user what the invalid route is, and keeps the browser back button working right
        // https://stackoverflow.com/a/68877623
        this.$router.replace({
          name: '404',
          params: { 0: this.$route.path },
        });
      }
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
          Input.focusInputByQuery('.rename-input');
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
        if (this.alreadyHaveABlank) {
          return;
        }

        LocalStorage.addCustomWord(this.categoryName, '');
        this.loadWords();

        Input.focusInputByQuery('input.newest');
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
  };
</script>


<style scoped>
  .back-button {
    display: inline-block;
    width: auto;  /* this keeps the button from taking up the whole width */

    font-size: 24px;

    margin-top: 36px;
    padding-left: 0;
  }

  .dropdown-balancer {
    width: 56px;
    height: 56px;
  }

  /* this turns the final option (delete) red */
  /deep/ .options-menu .dropdown-item:last-of-type {
    color: var(--negative-colour);
  }

  .word-row {
    display: flex;
    justify-content: space-between;
    align-items: center;

    gap: var(--thin-gap);

    margin: 1em;

  }

  .word-row * {
    font-size: 20px;
  }

  input {
    width: 100%;
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
    gap: 1rem;
  }
</style>
