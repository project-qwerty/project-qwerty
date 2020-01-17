<template>
    <div>
        <keyboard-style>
            <div style="position:absolute;left:25%;width:50%;height:60px;" @click="this.onClick" id="display" text-align=centre margin=auto display=inline>{{test}}</div>
            <key-component />
        </keyboard-style>
    </div>
</template>

<!--How do I do this?-->
<style scoped>
    keyboard-style {
        font-size: large;
/*        margin: 40px 0 0;*/
    }
    font-size: large;
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
        'onClick' : function(){
            this.test++
        }
    },
    components: {
        'key-component' : KeyComponent,
    },
}
</script>