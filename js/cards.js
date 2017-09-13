AFRAME.registerComponent("cards", {
  schema: {
  },
  teardown: function () {
    $(this.el).children("[card]").remove();
  }
});
