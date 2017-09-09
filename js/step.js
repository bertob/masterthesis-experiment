var STEP_DISTANCE = 5;

AFRAME.registerComponent("stepcontainer", {
  schema: {
    current: {type: "int"},
  },
  init: function () {
    this.el.setAttribute("position", new THREE.Vector3(this.data.current*(-STEP_DISTANCE), 0, -1));
  },
  next: function () {
    this.data.current++;
    this.move();
  },
  previous: function () {
    this.data.current--;
    this.move();
  },
  move: function () {
    console.log("CHANGING STEPS");
    var current = this.data.current;
    var children = $(this.el).children("a-entity");
    [].forEach.call(children, function(child) {
      var id = parseInt(child.components.step.attrValue.number);
      if (id === current) {
        console.log("playing step " + id);
        child.components.step.play();
      }
      else {
        console.log("pausing step " + id);
        child.components.step.pause();
      }
    });

    this.el.setAttribute("animation__move", {
      "property": "position",
      "dir": "alternate",
      "dur": 800,
      "easing": "easeOutElastic",
      "to": new THREE.Vector3( this.data.current*(-STEP_DISTANCE), 0, -1 ),
    });
  }
});

AFRAME.registerComponent("step", {
  schema: {
    number: {type: "int"},
  },
  init: function () {
    this.el.setAttribute("position", new THREE.Vector3(this.data.number * STEP_DISTANCE, 0, -1));
    this.pause();
  },
  pause: function () {
    var children = $(this.el).children("a-entity");
    [].forEach.call(children, function(child) {
      child.pause();
    });
  },
  play: function () {
    var children = $(this.el).children("a-entity");
    [].forEach.call(children, function(child) {
      child.play();
    });
  }
});
