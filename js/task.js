AFRAME.registerComponent("task", {
  schema: {
    id: {type: "string"},
    type: {type: "string"},
    size: {type: "int"},
    color: {type: "boolean", default: false},

    iconList: {type: "array"},

    // [ [initial], [repeat] ]
    // initial/repeat: [ [icon], [icon], ... [icon] ]
    // icon: [ [icon ID, index in target list] ]
    targetList: {type: "array"},

    currentStage: {type: "int", default: 0},
    currentIcon: {type: "int", default: 0},
  },
  init: function () {
    var row = LATIN_SQUARE[LATIN_SQUARE_ROW];
    stepPosition = row.indexOf(this.data.id);

    var number = document.createElement("a-entity");
    number.setAttribute("class", "task-number");
    number.setAttribute("position", "-1.5 2.4 -1");
    number.setAttribute("material", "color: white");
    number.setAttribute("text-geometry", "value: " + (stepPosition+1) + "; size: 1.8; height: 0.01;");
    this.el.appendChild(number);

    // offset of 5, because the first 5 steps are tutorials
    this.el.setAttribute("step", "number: " + (stepPosition + 5));
  },
  setup: function () {
    $(".active-task").removeClass("active-task");
    $(this.el).addClass("active-task");

    var colorOffset = 0;
    if (this.data.color) colorOffset = 150;
    // generate icons and targets
    this.data.iconList = randomList(this.data.size, colorOffset);
    this.data.targetList = generateTargetList(this.data.size, this.data.iconList);

    // populate UI with icons
    var cardContainer;
    if ($(this.el).hasClass("c")) {
      cardContainer = $(this.el).children("[cards]").get(0).components["card-clip"];
    }
    else if ($(this.el).hasClass("p")) {
      cardContainer = $(this.el).children("[cards]").get(0).components["card-space"];
    }
    else if ($(this.el).hasClass("s")) {
      cardContainer = $(this.el).children("[cards]").get(0).components["card-stack"];
    }
    cardContainer.setup(this.data.iconList, this.data.color);
    cardContainer.el.setAttribute("visible", false);

    // add button to start experiment
    var startButton = document.createElement("a-entity");
    startButton.setAttribute("class", "start-button");
    startButton.setAttribute("position", "0 1.03 0.6");
    startButton.setAttribute("scale", "1 1 1");
    startButton.setAttribute("geometry", "primitive: box; width: 0.4; height: 0.2; depth: 0.08");
    startButton.setAttribute("material", "color: white; opacity: 0.01");
    startButton.setAttribute("hoverable", "");

    var startRect = document.createElement("a-entity");
    startRect.setAttribute("class", "task-start-popup");
    startRect.setAttribute("position", "0 0 0");
    startRect.setAttribute("geometry", "primitive: box; width: 0.4; height: 0.2; depth: 0.02");
    startRect.setAttribute("material", "color: white; opacity: 0.8");
    startButton.appendChild(startRect);

    var start = document.createElement("a-entity");
    start.setAttribute("class", "task-start-popup");
    start.setAttribute("position", "-0.07 -0.03 0.03");
    start.setAttribute("material", "color: black");
    start.setAttribute("text-geometry", "value: Start; size: 0.05; height: 0.001;");
    startButton.appendChild(start);

    // update log item with new icon info
    updateLogIconInit(this.data);

    startButton.addEventListener("mouseup", function () {
      // start timer for this icon and reset movement & scrolling
      updateLogIconStarted();
      // show icons
      cardContainer.el.setAttribute("visible", true);

      setTimeout(
        function() {
          $(startButton).remove();
          $(".first-task-popup").remove();
      }, 100);
    });
    this.el.appendChild(startButton);

    // add event listener to first target
    newTaskIcon(this.data);

  },
  nextIcon: function () {
    // store logs for previous icon
    updateLogIconEnd(this.data);

    // currentStage and currentIcon have yet to be updated

    // move to next step
    if (this.data.currentStage === 0) {
      // initial 5 icons
      if (this.data.currentIcon < 4) {
        this.data.currentIcon++;
      }
      else {
        this.data.currentStage = 1;
        this.data.currentIcon = 0;
      }
    }
    else {
      // 5 repeat icons
      if (this.data.currentIcon < 4) {
        this.data.currentIcon++;
      }
      else {
        // show "task complete" popup and next button
        var doneRect = document.createElement("a-box");
        doneRect.setAttribute("class", "task-done-popup");
        doneRect.setAttribute("scale", "1.4 0.8 0.02");
        doneRect.setAttribute("position", "0 1.23 0.5");
        doneRect.setAttribute("material", "color: black; opacity: 0.8");
        this.el.appendChild(doneRect);

        var done = document.createElement("a-entity");
        done.setAttribute("class", "task-done-popup");
        done.setAttribute("position", "-0.45 1.26 0.54");
        done.setAttribute("material", "color: white");
        done.setAttribute("text-geometry", "value: Task complete; size: 0.1; height: 0.001;");
        this.el.appendChild(done);

        var nextButton = document.createElement("a-entity");
        nextButton.setAttribute("position", "0 1.03 0.6");
        nextButton.setAttribute("scale", "1 1 1");
        nextButton.setAttribute("geometry", "primitive: box; width: 0.4; height: 0.2; depth: 0.08");
        nextButton.setAttribute("material", "color: white; opacity: 0.01");
        nextButton.setAttribute("hoverable", "");

        var nextRect = document.createElement("a-entity");
        nextRect.setAttribute("class", "task-next-popup");
        nextRect.setAttribute("position", "0 0 0");
        nextRect.setAttribute("geometry", "primitive: box; width: 0.4; height: 0.2; depth: 0.02");
        nextRect.setAttribute("material", "color: white; opacity: 0.8");
        nextButton.appendChild(nextRect);

        var next = document.createElement("a-entity");
        next.setAttribute("class", "task-next-popup");
        next.setAttribute("position", "-0.07 -0.03 0.03");
        next.setAttribute("material", "color: black");
        next.setAttribute("text-geometry", "value: Next; size: 0.05; height: 0.001;");
        nextButton.appendChild(next);

        nextButton.addEventListener("mouseup", function () {
          document.getElementById("step-container").components.stepcontainer.next();
          setTimeout(
            function() {
              $(nextButton).remove();
              $(done).remove();
              $(doneRect).remove();
          }, 300);
        });
        this.el.appendChild(nextButton);
      }
    }
    newTaskIcon(this.data);
  },
});

function randomList(length, startingPoint) {
  if (startingPoint == undefined) startingPoint = 0;
  var list = shuffle(generateList(150, startingPoint+1));
  return list.slice(0,length);
}

function shuffle(array) {
  var i = array.length;
  var j = 0;
  var temp;

  while (i--) {
    j = Math.floor(Math.random() * (i+1));

    // swap randomly chosen element with current element
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function generateList(length, startingPoint) {
  var list = [];
  for (var i=startingPoint; i<startingPoint+length; i++) {
    list.push(i);
  }
  return list;
}

function generateTargetList(size, iconList) {

  // [ [initial], [repeat] ]
  var targetList = [ [], [] ];
  var TARGET_NO = 5;

  for (var j=0; j<TARGET_NO; j++) {
    // one icon per quintile
    var index = Math.floor(size/TARGET_NO * j) + Math.floor(Math.random() * size/TARGET_NO);
    // each icon has this structure: [ [icon id], [index in the list of icons for this task] ]
    targetList[0].push([iconList[index],index]);
  }

  // shuffle targets so they are no longer in original order
  targetList[0] = shuffle(targetList[0].slice(0,));

  // avoid having the last target be the first repeat target
  var last = targetList[0][TARGET_NO-1];
  var rest = shuffle(targetList[0].slice(0,TARGET_NO-1));
  var first = [rest[0]];
  var tmp = rest.slice(1,);
  tmp.push(last);
  var list = first.concat(shuffle(tmp.slice(0,)));

  // cut off the first 3 to get only 3 repeat targets
  targetList[1] = list;

  return targetList;
}


function newTaskIcon(data) {
  // list of all 5 target icons
  var targetIcons = data.targetList[0];
  // list of 5 repeat target icons
  var repeatTargetIcons = data.targetList[1];
  // index of icon in initial/repeat list
  var iconIndex = data.currentIcon;
  // position in list of 5, regardless of stage
  var iconPosition;
  var iconID;

  // initial stage
  if (data.currentStage === 0) {
    iconPosition = iconIndex;
    iconID = data.id + "_" + targetIcons[iconIndex][1];
  }
  // repeat stage
  else if (data.currentStage === 1) {
    // find position of repeat currentIcon in full list of 5
    iconPosition = data.targetList[0].indexOf(data.targetList[1][data.currentIcon]);
    iconID = data.id + "_" + repeatTargetIcons[iconIndex][1];
  }

  // update highlighted icons in controller UI
  updateControllerIcons(targetIcons, iconPosition);

  // get icon through ID e.g. s50_115
  // add event listeners to new target icon
  var icon = document.getElementById(iconID);
  icon.addEventListener("mouseup", iconSelected);

  updateLogIconInit(data);
  updateLogIconStarted();
}

function updateControllerIcons(targetIcons, currentIcon) {

  setTimeout(
    function() {
      var controllerIcons = $("#controller-icons").children("a-entity");
      var i = 0;
      [].forEach.call(controllerIcons, function(controllerIcon) {
        var iconType = targetIcons[i][0];

        if (i === currentIcon)
        controllerIcon.setAttribute("material", "color: white; opacity: 1; src: #img" + iconType);
        else
        controllerIcon.setAttribute("material", "color: black; opacity: 0.8");

        i++;
      });
    }, 400);
}

function updateLogIconInit(data) {
  log.iconId = data.targetList[data.currentStage][data.currentIcon][0];
  log.iconPosition = data.iconList.indexOf(log.iconId);
  log.trial = data.currentIcon;
  log.repeat = data.currentStage;

  log.errors = [];
}
function updateLogIconStarted() {
  log.startTimestamp = Date.now();
  log.scrolling = 0;
  log.movement = 0;
}

function updateLogIconEnd(data) {
  var currentTime = Date.now();
  log.duration = currentTime - log.startTimestamp;

  // apppend current log item to list
  var new_log = JSON.parse(JSON.stringify(log))
  logs.push(new_log);
}
