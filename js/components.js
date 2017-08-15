AFRAME.registerComponent("step", {
  schema: {
    number: {type: "int"},
  },
  init: function () {
    this.el.setAttribute("position", new THREE.Vector3(this.data.number*5, 0, -1));
  }
});

AFRAME.registerComponent("hoverable", {
  schema: {
  },
  init: function () {
    this.el.addEventListener("mouseenter", function(e) {
      if (!e.target.dataset.clicked) {
        this.setAttribute("animation__hover", {
          "property": "scale",
          "dir": "alternate",
          "dur": 250,
          "easing": "easeOutQuad",
          "loop": true,
          "to": "1.2 1.2 1",
        });
      }
    });

    this.el.addEventListener("mouseleave", function(e) {
      if (!e.target.dataset.clicked) {
        this.setAttribute("animation__hover", {
          "property": "scale",
          "dir": "alternate",
          "dur": 250,
          "easing": "easeOutQuad",
          "loop": true,
          "to": "1 1 1",
        });
      }
    });

  }
});
