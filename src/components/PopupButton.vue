<template>
<div style="padding:16px;">
  <router-link :to="to">
    <button class="popup" >
      {{content}}
    </button>
  </router-link>
  </div>
</template>


<style>  
  .popup {
    z-index: 9999;
    background: white;
    height: 200px;
    width: 150px;
    left: 0%;
  }
</style>


<script>
export default {
  name : 'popup-btn-component',
  props : ['content', 'to']
}
</script>
