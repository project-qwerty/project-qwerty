<template>
  <NavPage>
    <header class="title-controls-header">
      <IconHeader
          text="My categories"
          icon="pen"
          iconColour="var(--primary-colour)"
          :major="true" />

      <div class="controls">
        <ActionButton
            icon="plus"
            text="New"
            @click="showNewCategoryModal = true" />

        <DropdownList
            :options="[
              { label: 'Import category', icon: 'right-to-bracket', action: 'import' },
            ]"
            @click="handleDropdownClick" />
      </div>
    </header>

    <RowButton class="custom-category faint-border-bottom"
        v-for="(categoryName, index) in getCategories()" :key="index"
        @click="$router.push('/custom-categories/' + categoryName)"
        :text="categoryName"
        icon="list"
        :iconColour="Colours.stringToColour(categoryName)" />

    <FullscreenModal
        :shown="showNewCategoryModal"
        @click-out="cleanUpCreateCategory">
      <h1>Add category</h1>
      <input
          class="qwerty-text-input"
          placeholder="New category"
          v-model="inputCategoryName">
      <div class="buttons-row">
        <ActionButton
            text="Cancel"
            :major="false"
            @click="cleanUpCreateCategory" />
        <ActionButton
            text="Create"
            :enabled="Validation.isValidCategoryName(inputCategoryName)"
            @click="clickCreateCategory" />
      </div>
    </FullscreenModal>

    <input ref="file-picker" type="file" multiple @change="handleImportFiles" style="display: none;">
  </NavPage>
</template>


<script>
  import LocalStorage from '@/functions/LocalStorage.js'
  import Colours from '@/functions/Colours.js'
  import Validation from '@/functions/Validation.js';

  import NavPage from '@/components/NavPage.vue';
  import FullscreenModal from '@/components/FullscreenModal.vue';
  import ActionButton from '@/components/ActionButton.vue';
  import IconHeader from '@/components/IconHeader.vue';
  import RowButton from '@/components/RowButton.vue';
  import DropdownList from '@/components/DropdownList.vue';

  export default {
    components: {
      NavPage,
      FullscreenModal,
      ActionButton,
      IconHeader,
      RowButton,
      DropdownList,
    },
    data () {
      return {
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
  .qwerty-text-input {
    width: 100%;

    margin-bottom: 1em;

    font-size: 20px;
  }

  .buttons-row {
    display: flex;
    justify-content: flex-end;
    gap: 1em;
  }

  .custom-category {
    font-size: 24px;

    padding-top: 1em;
    padding-bottom: 1em;
  }
</style>
