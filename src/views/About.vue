<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div style="position:absolute;left:25%;background:lightblue;width:50%;height:60px;border:1px solid #000;" @click="this.onClick" id="display" text-align=centre margin=auto display=inline>{{test}}</div>
  </div>
</template>

<script>
export default{
    name : 'key',
    props : [],
    data : function(){
        return {
            test : 0,
        }
    },
    methods : {
        'onClick' : function(){
            this.test++
        }
    }
}
</script>