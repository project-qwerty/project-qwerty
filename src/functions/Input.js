export default {
  focusInputByQuery: function(cssQuery) {
    // timeout required to allow the DOM to update classes/visibility/etc
    // even 1ms seems to be enough so 10ms should be plenty
    setTimeout(() => {
      const input = document.querySelector(cssQuery);
      input.focus();
    });
  },
};
