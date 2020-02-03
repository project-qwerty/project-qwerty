<template>
<!--The Width of the Timer Slider is set by the width of the div
min is the minimum value and max the maximum value-->

<!--Need to use getValue to use the slider as an input-->
  <div style="width:600px;" >
      Timer  
        <veeno 
           v-model='value_timer'
                :pipsy = "{ 
                mode: 'steps', // mode is steps
                density: 10 
                }"   
               :handles = "[this.value_timer]" 
               :step = "5"
                :range = "{ 
                'min': [  0 ],
                'max': [ 30 ]
                }"
        />
      
      
      <!--Creates the space required between the two paragraphs-->
      <p style="font-size:100px;"></p>
      
      Trials
        <veeno 
           v-model='value_trials'
                :pipsy = "{ 
                mode: 'steps', // mode is steps
                density: 10 
                }"   
               :handles = "[this.value_trials]" 
               :step = "5"
                :range = "{ 
                'min': [  0 ],
                'max': [ 50 ]
                }"
        />
      
  </div>
</template>


<script>
    // Importing the slider from a plug in, the slider is called veeno.
    import veeno from 'veeno' 
    import 'nouislider/distribute/nouislider.min.css';  
    
    export default {
        data() {
            return {
                // this is a key value pair
                value_timer: null,
                // value is intially set to zero, however the value is changed as the slider is moved 
                value_trials: null
            }
        },
        components: {
            veeno 
        },
        // This stores the values for timer and trials into local cookies so that they can be accessed by the keyboard page.
        watch: {
            'value_timer' : function(val){
                this.$cookies.set('settings.timer', val)
                //window.console.log(this.$cookies.get('settings.timer'))
            },
            
            'value_trials' : function(val){
                this.$cookies.set('settings.trials', val)
            },
        
        },
        // This sets the sliders so that they remember there last location.
        created(){
            this.value_timer = this.$cookies.isKey('settings.timer') ? this.$cookies.get('settings.timer') : 5
            this.value_trials = this.$cookies.isKey('settings.trials') ? this.$cookies.get('settings.trials') : 5
        }
    }
</script>


<style scoped>
  .settings {
    display:flex;
    min-height:100px;
  }
</style>
