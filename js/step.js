var STEP_DISTANCE = 5;

AFRAME.registerComponent("stepcontainer", {
  schema: {
    currentStep: {type: "int", default: 0},
  },
  init: function () {
    this.el.setAttribute("position", new THREE.Vector3(this.data.currentStep*(-STEP_DISTANCE), 0, -1));

    // scrolling tutorial
    var icons = [227,66,185,214,11,55,220,231,67,46,144,239,47,32,61];
    var testStack = $(this.el).children("#tutorial-scroll").children("[card-stack]").get(0);
    testStack.components["card-stack"].setup(icons);

    // clicking last icon on scroller moves to next step
    var last = $(testStack).children().get(14);

    // give elements time to be generated
    setTimeout(
      function() {
        last.components.card.data.target = true;
        last.addEventListener("mouseup", function() {
          setTimeout(
            function() {
              document.getElementById("step-container").components.stepcontainer.next();
            }, 1400);
          });
      }, 800);

    // clicking selection test target moves to next step
    document.getElementById("test-target").addEventListener("mouseup", function() {
      setTimeout(
        function() {
          document.getElementById("step-container").components.stepcontainer.next();
        }, 1400);
    });

    this.move(0);
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

    if (this.data.currentStep === 0) {
      var testTargets = [[87, 0], [0,0], [0,0], [0,0], [0,0]];
      updateControllerIcons(testTargets, 0);
      $("#selection-advice").get(0).setAttribute("visible", "true");
      $("#scrolling-advice").get(0).setAttribute("visible", "false");
    }

    // stop tutorial scroller from scrolling on other steps
    if (this.data.currentStep === 1) {
      $(this.el).children("#tutorial-scroll").get(0).components["step"].play();
      $("#controller-icons").get(0).setAttribute("visible", "false");
      $("#selection-advice").get(0).setAttribute("visible", "false");
      $("#scrolling-advice").get(0).setAttribute("visible", "true");
    }
    else {
      $(this.el).children("#tutorial-scroll").get(0).components["step"].pause();
      $("#controller-icons").get(0).setAttribute("visible", "true");
    }

    if (this.data.currentStep === 2) {
      $("#scrolling-advice").get(0).setAttribute("visible", "false");
    }

    // first experiment
    if (this.data.currentStep === 2) {
      this.el.components.taskcontainer.first();
    }
    // experiment tasks
    if (this.data.currentStep > 2 && this.data.currentStep < 11) {
      this.el.components.taskcontainer.move(movement);
    }
    // last step
    if (this.data.currentStep === 11) {
      exportLogs();
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
