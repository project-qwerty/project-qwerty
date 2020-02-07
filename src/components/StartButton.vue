<template>
  <div style="width:225px; margin:auto" class="box">
    <router-link style="display:flex;justify-content:center;align-items:center;text-decoration:none" :to="to" >
      <p style="text-align:center;font-size:36px;margin-right:16px;color:black">START</p>
      <font-awesome-icon style="font-size:100;color:rgba(142, 142, 147)" icon="chevron-right"/>
    </router-link>
  </div>
</template>


<script>
  export default {
    name: "start",
    props: ["to"],
  }
</script>


<style>
  .box {
    background-color: white;
    border: 2px solid rgba(99, 99, 102, 0.5);
    text-transform: capitalize;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
/*    width: 100px;*/
    height: 100%;
    border-radius: 2px;
    margin: 0px 6px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.5);
  }
</style>