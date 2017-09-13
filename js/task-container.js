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

    // console.log("task ID list",this.data.taskIDs);
    // console.log("currentTask index",this.data.currentTask);
    // console.log("currentTask ID string",this.data.currentTaskID);
    // console.log("currentTask node",document.getElementById(this.data.currentTaskID));

    // initialize fist task
    document.getElementById(this.data.currentTaskID).components.task.setup();
  },
  move: function (movement) {
    console.log("NEW TASK");

    console.log("task ID list",this.data.taskIDs);
    console.log("currentTask index",this.data.currentTask);
    console.log("currentTask ID string",this.data.currentTaskID);

    // delete all icons in old task
    var oldNode = document.getElementById(this.data.currentTaskID)
    if ($(oldNode).hasClass("c")) {
      console.log("CLIP TEARDOWN", this.data.currentTaskID);
      $(oldNode).children("[cards]").get(0).components["card-clip"].teardown();
    }
    else if ($(oldNode).hasClass("p")) {
      console.log("SPACE TEARDOWN", this.data.currentTaskID);
      $(oldNode).children("[cards]").get(0).components["card-space"].teardown();
    }
    else if ($(oldNode).hasClass("s")) {
      console.log("STACK TEARDOWN", this.data.currentTaskID);
      $(oldNode).children("[cards]").get(0).components["card-stack"].teardown();
    }

    // update active task id
    this.data.currentTask += movement;
    this.data.currentTaskID = this.data.taskIDs[this.data.currentTask];

    // initialize new task
    document.getElementById(this.data.currentTaskID).components.task.setup();

  }
});
