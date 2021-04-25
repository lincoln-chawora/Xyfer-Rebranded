$(window).ready(function () {
  new Vue({
    el: '#nav-bar',
    // Try to prevent conflict:
    delimiters: ['{{{', '}}}'],
    comments: true,
    data() {
      return {
        isOpen: false,
      };
    },
  });
});