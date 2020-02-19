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
          {"Email": ["hello", "to", "dear", "sincerely", "reply", "respond", "action", "immediately", "manager", "team"]},
          {"Text Messages": ["hey", "hi", "thanks", "cheers", "love", "day", "night", "tonight", "today", "tomorrow", "yesterday", "sorry", "ok", "omg", "haha"]},
          //{"Groceries": ["shopping", "supermarket", "coles", "woolies", "woolworths", "aldi", "aisles", "checkout", "scan", "cash", "card", "bags", "fruit"]},
        ],
      }
    },
    created() {
      this.$emit('inbuiltCreated', this.wordlists);
    }
  }
</script>