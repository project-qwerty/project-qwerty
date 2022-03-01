<template>
  <div>
    <header>
      <IconHeader
          class="list-title"
          icon="list"
          :iconColour="Colours.stringToColour(listName)"
          :text="listName" />

      <ActionButton
          class="new-word-button"
          icon="plus"
          text="New word"
          v-on:click="showNewWordModal = true" />

      <Dropdown
          class="options-menu"
          :options="[
            { label: 'Export category', icon: 'right-from-bracket', action: 'export' },
            { label: 'Delete category', icon: 'trash-can', action: 'delete' },
          ]"
          v-on:click="handleDropdownClick" />
    </header>

    <div class="words-wrapper">
      <input
          v-for="word in getWords()" v-bind:key="word"
          class="qwerty-text-input"
          :value="word">
    </div>

    <Modal
        :shown="showNewWordModal"
        v-on:click-out="showNewWordModal = false">
      <h1>Add word</h1>
      <ActionButton text="yes, that is the plan" v-on:click="showNewWordModal = false" />
      <p>actually this modal probably won't exist at all and the button will just immediately create a new word</p>
    </Modal>

    <Modal
        :shown="showExportListModal"
        v-on:click-out="showExportListModal = false">
      <h1>Export list</h1>
      <p>We will probably have a click to copy button and also a copyable text area</p>
      <ActionButton text="ok you do that" v-on:click="showExportListModal = false" />
    </Modal>

    <Modal
        :shown="showDeleteListModal"
        v-on:click-out="showDeleteListModal = false">
      <h1>Delete category</h1>
      <p class="delete-warning">Are you sure you want to delete <strong>{{ listName }}</strong>? This can't be undone.</p>
      <div class="buttons-row">
        <ActionButton
            text="Cancel"
            :major="false"
            v-on:click="clickCancelDeleteCategory" />
        <ActionButton
            text="Delete"
            colour="red"
            v-on:click="clickDeleteCategory" />
      </div>
    </Modal>
  </div>
</template>


<script>
  import LocalStorage from '@/functions/LocalStorage.js';
  import Colours from '@/functions/Colours.js'

  import IconHeader from '@/components/IconHeader.vue';
  import ActionButton from '@/components/ActionButton.vue';
  import Dropdown from '@/components/Dropdown.vue';
  import Modal from '@/components/Modal.vue';

  export default {
    components: {
      IconHeader,
      ActionButton,
      Dropdown,
      Modal,
    },
    props: {
      listName: String,
    },
    data() {
      return {
        showNewWordModal: false,
        showExportListModal: false,
        showDeleteListModal: false,
      }
    },
    beforeCreate() {
      this.Colours = Colours;
    },
    methods: {
      getWords() {
        // this conditional allows us to create the view without a list provided,
        // with the intent to change it later
        if (!this.listName) {
          return [];
        }

        return LocalStorage.getCustomList(this.listName);
      },
      handleDropdownClick(operation) {
        if (operation === 'export') {
          this.showExportListModal = true;
        } else if (operation === 'delete') {
          this.showDeleteListModal = true;
        }
      },
      clickCancelDeleteCategory() {
        this.showDeleteListModal = false;
      },
      clickDeleteCategory() {
        LocalStorage.deleteCustomList(this.listName);

        this.showDeleteListModal = false;
        this.$emit('close');
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
    color: red;
  }

  .list-title {
    flex-grow: 1;
  }

  .new-word-button {
    margin-right: 16px;
  }

  .words-wrapper {
    border-top: solid 1px var(--faint-colour);
    border-bottom: solid 1px var(--faint-colour);
  }

  .qwerty-text-input {
    display: block;

    margin: 1em;

    font-size: 20px;
  }

  .delete-warning {
    font-size: 20px;
  }

  .buttons-row {
    display: flex;
    justify-content: end;

    padding-left: 5em;
    gap: 1em;
  }
</style>
