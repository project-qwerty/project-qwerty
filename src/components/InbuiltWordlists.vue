<template>
  <div></div>
</template>


<script>
  export default {
    name: "InbuiltWordlists",
    data() {
      return {
        wordlists: [
          // the words must be all lowercase - the checking is case sensitive
          {"Words for Email": ["hello", "to", "dear", "sincerely", "reply", "respond", "action", "immediately", "manager", "team"]},
          {"Words for Text Messages": ["hey", "hi", "thanks", "cheers", "love", "day", "night", "tonight", "today", "tomorrow", "yesterday", "sorry", "ok", "omg", "haha"]}
        ],
      }
    },
    created() {
      this.$emit('inbuiltCreated', this.wordlists);
    }
  }
</script>