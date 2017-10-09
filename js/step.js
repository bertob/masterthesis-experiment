var STEP_DISTANCE = 5;
var EXPERIMENT_Z = 0.2;

AFRAME.registerComponent("stepcontainer", {
  schema: {
    currentStep: {type: "int", default: 0},
  },
  init: function () {
    this.el.setAttribute("position", new THREE.Vector3(this.data.currentStep*(-STEP_DISTANCE), 0, EXPERIMENT_Z));

    // scrolling tutorial
    var icons = [27,66,15,84,11,55,20,41,67,46,144,139,47,32];
    var testScroll = $(this.el).children("#tutorial-scroll").children("[card-stack]").get(0);
    testScroll.components["card-stack"].setup(icons);


    // clicking last icon on scroller moves to next step
    var last = $(testScroll).children().get(13);

    // give elements time to be generated
    setTimeout(
      function() {
        last.components.card.data.target = true;
        last.addEventListener("mouseup", function() {
          if (isValidSelection(last)) {
            setTimeout(
              function() {
                document.getElementById("step-container").components.stepcontainer.next();
              }, 1000);
          }
        });
      }, 500);


    // clicking selection test target moves to next step
    document.getElementById("test-target").addEventListener("mouseup", function() {
      if (isValidSelection(document.getElementById("test-target"))) {
        setTimeout(
          function() {
            document.getElementById("step-container").components.stepcontainer.next();
          }, 1000);
        }
    });

    // test conditions
    // test [stack, clip, space]
    test.s[0].iconList = randomList(15);
    test.s[0].targetList = generateTargetList(15, test.s[0].iconList)[0];
    test.s[1].iconList = randomList(15);
    test.s[1].targetList = generateTargetList(15, test.s[1].iconList)[0];
    test.s[2].iconList = randomList(15);
    test.s[2].targetList = generateTargetList(15, test.s[2].iconList)[0];
    test.currentStep = 0;
    test.currentIcon = 0;
    test.stepIds = ["c15", "s15", "p15"];
    test.currentId = test.stepIds[0];

    $(this.el).children("#tutorial-clip").children("[card-clip]").get(0).components["card-clip"].setup(test.s[0].iconList);
    $(this.el).children("#tutorial-stack").children("[card-stack]").get(0).components["card-stack"].setup(test.s[1].iconList);
    $(this.el).children("#tutorial-space").children("[card-space]").get(0).components["card-space"].setup(test.s[2].iconList);

    var that = this;
    setTimeout(
      function() {
        that.move(0);
      }, 1000);
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

    $(".start-button").remove();

    if (this.data.currentStep === 0) {
      var testTargets = [[87, 0], [0,0], [0,0], [0,0], [0,0]];
      updateControllerIcons(testTargets, 0);
      $("#selection-advice").get(0).setAttribute("visible", "true");
      $("#scrolling-advice").get(0).setAttribute("visible", "false");

      // prevent scrolling tutorial from scrolling during first step
      $(this.el).children("#tutorial-scroll").get(0).components["step"].pause();
      $(this.el).children("#tutorial-stack").get(0).components["step"].pause();
      $(this.el).children("#tutorial-clip").get(0).components["step"].pause();
    }

    // stop tutorial scroller from scrolling on other steps
    if (this.data.currentStep === 1) {
      $(this.el).children("#tutorial-scroll").get(0).components["step"].play();
      $(this.el).children("#tutorial-select").get(0).components["step"].pause();
      $("#controller-icons").get(0).setAttribute("visible", "false");
      $("#selection-advice").get(0).setAttribute("visible", "false");
      $("#scrolling-advice").get(0).setAttribute("visible", "true");
    }
    // test clip
    if (this.data.currentStep === 2) {
      $(this.el).children("#tutorial-scroll").get(0).components["step"].pause();
      $(this.el).children("#tutorial-clip").get(0).components["step"].play();
      $("#scrolling-advice").get(0).setAttribute("visible", "false");
      $("#controller-icons").get(0).setAttribute("visible", "true");

      newTestIcon();
    }
    // test stack
    if (this.data.currentStep === 3) {
      $(this.el).children("#tutorial-clip").get(0).components["step"].pause();
      $(this.el).children("#tutorial-stack").get(0).components["step"].play();
    }
    // test space
    if (this.data.currentStep === 4) {
      $(this.el).children("#tutorial-stack").get(0).components["step"].pause();
    }

    // first experiment
    if (this.data.currentStep === 5) {
      $(this.el).children(".tutorial").find("[card]").remove();
      this.el.components.taskcontainer.first();
    }
    // experiment tasks
    if (this.data.currentStep > 5 && this.data.currentStep < 23) {
      this.el.components.taskcontainer.move(movement);
    }
    // last step
    if (this.data.currentStep === 23) {
      exportLogs();
    }

    // move user to new step
    this.el.setAttribute("animation__move", {
      "property": "position",
      "dir": "alternate",
      "dur": 700,
      "easing": "easeOutExpo",
      "to": new THREE.Vector3( this.data.currentStep*(-STEP_DISTANCE), 0, 0 ),
    });
  }
});

AFRAME.registerComponent("step", {
  schema: {
    number: {type: "int"},
  },
  init: function () {
    this.el.setAttribute("position", new THREE.Vector3(this.data.number * STEP_DISTANCE, 0, -1.5));

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
