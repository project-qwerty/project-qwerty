<template>
    <div>
        <button v-for="(option,index) in options" :key="index" v-on:click="select_value=option" :class="{'green-button':select_value===option}">{{option}} </button>
    </div>
</template>


<script>
export default{
    name: "switch",
    //Suppiled to components by parent - does not change
    props: ["options"], 
    // the internal state - can be change in this code
    data: function(){
        return{
            select_value: null
        }
    },
    
    watch: {
            'select_value' : function(val){
                this.$emit("update:value", val)
            }
    }
}
</script>


<style scoped>
    .green-button{ 
        background-color: greenyellow !important /*Makes this the*/
    }
    
    button{
        
    }
</style>