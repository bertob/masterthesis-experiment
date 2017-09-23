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
