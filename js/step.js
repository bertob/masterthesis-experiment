var STEP_DISTANCE = 5;

AFRAME.registerComponent("stepcontainer", {
  schema: {
    currentStep: {type: "int", default: 0},
  },
  init: function () {
    this.el.setAttribute("position", new THREE.Vector3(this.data.currentStep*(-STEP_DISTANCE), 0, -1));

    // scrolling tutorial
    var icons = [23,66,143,22,11,55,12,231,67,46,144,89,31,219,178];
    $(this.el).children("#tutorial-scroll").children("[card-stack]").get(0).components["card-stack"].setup(icons);
    // this.el.children[1].children[0].components["card-stack"].setup(icons);
  },
  next: function () {
    this.move(1);
  },
  previous: function () {
    this.move(-1);
  },
  move: function (movement) {
    this.data.currentStep += movement;
    console.log("MOVING TO STEP",this.data.currentStep);

    // stop tutorial scroller from scrolling on other steps
    if (this.data.currentStep === 1) {
      $(this.el).children("#tutorial-scroll").get(0).components["step"].play();
    }
    else {
      $(this.el).children("#tutorial-scroll").get(0).components["step"].pause();
    }

    // first experiment
    if (this.data.currentStep === 2) {
      this.el.components.taskcontainer.first();
    }
    // experiment tasks
    if (this.data.currentStep > 2 && this.data.currentStep < 11) {
      this.el.components.taskcontainer.move(movement);
    }

    // move user to new step
    this.el.setAttribute("animation__move", {
      "property": "position",
      "dir": "alternate",
      "dur": 700,
      "easing": "easeOutExpo",
      "to": new THREE.Vector3( this.data.currentStep*(-STEP_DISTANCE), 0, -1 ),
    });
  }
});

AFRAME.registerComponent("step", {
  schema: {
    number: {type: "int"},
  },
  init: function () {
    this.el.setAttribute("position", new THREE.Vector3(this.data.number * STEP_DISTANCE, 0, -1));

    var floor = document.createElement("a-circle");
    floor.setAttribute("radius", "1.4");
    floor.setAttribute("position", "0 0.05 1");
    floor.setAttribute("rotation", "-90 0 0");
    floor.setAttribute("material", "color: #2a3271");
    this.el.appendChild(floor);
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
