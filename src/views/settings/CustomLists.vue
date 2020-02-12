<template>
  <div style="width:600px; padding-left:48px;text-align:left">
    <h1 style="font-weight:200">Custom Lists</h1>
    <div style="display:flex;">
      <div>
        <p class="heading">
          Name of Lists
        </p>
        <Multiselect v-model="value" :options="lists" :searchable="false" :show-labels="false" />
        <p class="heading">
          Add Words to List
        </p>
        <div style="display:flex">
          <BFormInput id="input-large" v-model="new_word" placeholder="Enter a new word"></BFormInput>
          <button>Submit</button>
        </div>
        <p class="heading">
          Current List
        </p>
        <div style="height:300px;overflow-y:scroll">
          <div v-for="(item, index) in items" :key="index">
            <ListItem />
          </div>
        </div>
      </div>
      <img alt="MIME logo" style="height:550px" :src="require('@/assets/MTP/custom_lists.png')">
    </div>
  </div>
</template>



<script>
  import { Multiselect } from 'vue-multiselect';
  import { ListItem } from '@/components/ListItem.vue';
  
  export default {
    name: 'CustomLists',
    components: {
      Multiselect,
      ListItem
    },
    data () {
      return {
        value: null,
        lists: ["test"],
        new_word: "",
        test: [],
        items: [ {id: 1}, {id: 2}, {id: 3} ]
      }
    }
  }
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<!--
<style scoped>
  .heading {
    font-size: 24px;
    color: darkslategray;
  }
</style>-->
