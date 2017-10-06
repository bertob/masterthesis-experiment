AFRAME.registerComponent("taskcontainer", {
  schema: {
    currentTask: {type: "int", default: 0},
    currentTaskID: {type: "string"},
    taskIDs: {type: "array"},
  },
  init: function () {
    this.data.taskIDs = LATIN_SQUARE[LATIN_SQUARE_ROW];
    this.data.currentTaskID = this.data.taskIDs[this.data.currentTask];
  },
  first: function () {
    console.log("FIRST TASK");

    setTimeout(
      function() {
        // show first task instruciton popup
        var infoRect = document.createElement("a-box");
        infoRect.setAttribute("class", "first-task-popup");
        infoRect.setAttribute("scale", "1.4 1.5 0.02");
        infoRect.setAttribute("position", "0 1.33 " + BUTTON_Z);
        infoRect.setAttribute("material", "color: black; opacity: 0.8");
        $(".active-task").get(0).appendChild(infoRect);

        var title = document.createElement("a-entity");
        title.setAttribute("class", "first-task-popup");
        title.setAttribute("position", "-0.3 1.7 " + (BUTTON_Z + 0.03));
        title.setAttribute("material", "color: white");
        title.setAttribute("text-geometry", "value: First Task; size: 0.1; height: 0.001;");
        $(".active-task").get(0).appendChild(title);

        var info1 = document.createElement("a-entity");
        info1.setAttribute("class", "first-task-popup");
        info1.setAttribute("position", "-0.4 1.52 " + (BUTTON_Z + 0.03));
        info1.setAttribute("material", "color: white");
        info1.setAttribute("text-geometry", "value: Now the actual experiment starts; size: 0.04; height: 0.001;");
        $(".active-task").get(0).appendChild(info1);

        var info2 = document.createElement("a-entity");
        info2.setAttribute("class", "first-task-popup");
        info2.setAttribute("position", "-0.365 1.36 " + (BUTTON_Z + 0.03));
        info2.setAttribute("material", "color: white");
        info2.setAttribute("text-geometry", "value: Select the icons as quickly as; size: 0.04; height: 0.001;");
        $(".active-task").get(0).appendChild(info2);

        var info3 = document.createElement("a-entity");
        info3.setAttribute("class", "first-task-popup");
        info3.setAttribute("position", "-0.365 1.27 " + (BUTTON_Z + 0.03));
        info3.setAttribute("material", "color: white");
        info3.setAttribute("text-geometry", "value: possible, while avoiding errors; size: 0.04; height: 0.001;");
        $(".active-task").get(0).appendChild(info3);
      }, 200);

    this.data.currentTask = 0;
    this.data.currentTaskID = this.data.taskIDs[this.data.currentTask];

    // initialize fist task
    document.getElementById(this.data.currentTaskID).components.task.setup();

    updateLogTask(this.data);
  },
  move: function (movement) {
    console.log("NEW TASK");

    // delete all icons in old task
    var oldNode = document.getElementById(this.data.currentTaskID)
    if ($(oldNode).hasClass("c")) {
      $(oldNode).children("[cards]").get(0).components["card-clip"].teardown();
    }
    else if ($(oldNode).hasClass("p")) {
      $(oldNode).children("[cards]").get(0).components["card-space"].teardown();
    }
    else if ($(oldNode).hasClass("s")) {
      $(oldNode).children("[cards]").get(0).components["card-stack"].teardown();
    }

    // update active task id
    this.data.currentTask += movement;
    this.data.currentTaskID = this.data.taskIDs[this.data.currentTask];

    // initialize new task
    document.getElementById(this.data.currentTaskID).components.task.setup();

    updateLogTask(this.data);
  }
});

function updateLogTask(data) {
  log.condition = data.taskIDs.indexOf(data.currentTaskID);
  log.conditionId = data.currentTaskID;
}
