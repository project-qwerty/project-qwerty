<template>
    <div>
        <key-component />
    </div>
</template>


<style>
    
</style>


<script>
import KeyComponent from '@/components/keyboard/KeyComponent.vue';
export default{
    name : 'key',
    props : [],
    data : function(){
        return {
            test : 0,
        }
    },
    methods : {
    },
    components: {
        'key-component' : KeyComponent,
    },
}
</script>