<template>
  <div style="border:1px solid black;width:225px;margin:auto">
    <router-link style="display:flex;justify-content:center;align-items:center;text-decoration:none" :to="to" >
      <p style="text-align:center;font-size:36px;margin-right:16px;color:#414141">Start</p>
      <font-awesome-icon style="font-size:100;color:#414141" icon="chevron-right"/>
    </router-link>
  </div>
</template>


<script>
  export default {
    name: "start",
    props: ["to"],
  }
</script>