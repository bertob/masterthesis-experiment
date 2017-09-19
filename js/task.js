AFRAME.registerComponent("task", {
  schema: {
    id: {type: "string"},
    type: {type: "string"},
    size: {type: "int"},

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
    number.setAttribute("position", "-1.5 0.4 -1");
    number.setAttribute("material", "color: white");
    number.setAttribute("text-geometry", "value: " + (stepPosition+1) + "; size: 1.8; height: 0.001;");
    this.el.appendChild(number);

    // offset of 2, because the first 2 steps are tutorials
    this.el.setAttribute("step", "number: " + (stepPosition + 2));
  },
  setup: function () {
    $(".active-task").removeClass("active-task");
    $(this.el).addClass("active-task");

    // generate icons and targets
    this.data.iconList = randomList(this.data.size);
    this.data.targetList = generateTargetList(this.data.size, this.data.iconList);

    // populate UI with icons
    if ($(this.el).hasClass("c")) {
      $(this.el).children("[cards]").get(0).components["card-clip"].setup(this.data.iconList);
    }
    else if ($(this.el).hasClass("p")) {
      $(this.el).children("[cards]").get(0).components["card-space"].setup(this.data.iconList);
    }
    else if ($(this.el).hasClass("s")) {
      $(this.el).children("[cards]").get(0).components["card-stack"].setup(this.data.iconList);
    }

    // add event listener to first target
    newTaskIcon(this.data);

  },
  nextIcon: function () {
    // currentStage and currentIcon have yet to be updated

    // move to next step
    if (this.data.currentStage === 0) {
      // initial 5 icons
      if (this.data.currentIcon < 4) {
        this.data.currentIcon++;
      }
      else {
        console.log("starting repeat stage");
        this.data.currentStage = 1;
        this.data.currentIcon = 0;
      }
    }
    else {
      console.log("repeat stage, icon:", this.data.currentIcon);
      // 3 repeat icons
      if (this.data.currentIcon < 2) {
        this.data.currentIcon++;
      }
      else {
        console.log("done with task!");

        // TODO: done with task popup or something
        var doneRect = document.createElement("a-box");
        doneRect.setAttribute("class", "task-done-popup");
        doneRect.setAttribute("scale", "1.4 0.8 0.02");
        doneRect.setAttribute("position", "-0.07 1.23 0.4");
        doneRect.setAttribute("material", "color: black; opacity: 0.8");
        this.el.appendChild(doneRect);

        var done = document.createElement("a-entity");
        done.setAttribute("class", "task-done-popup");
        done.setAttribute("position", "-0.25 1.2 0.5");
        done.setAttribute("material", "color: white");
        done.setAttribute("text-geometry", "value: DONE; size: 0.1; height: 0.001;");
        this.el.appendChild(done);
      }
    }
    newTaskIcon(this.data);
  },
});

function randomList(length) {
  var list = shuffle(generateList(250));
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

function generateList(length) {
  var list = [];
  for (var i=1; i<=length; i++) {
    list.push(i);
  }
  return list;
}

function generateTargetList(size, iconList) {

  // [ [initial], [repeat] ]
  var targetList = [ [], [] ];

  for (var j=0; j<5; j++) {
    // one icon per quintile
    var index = (size/5 * j) + Math.floor(Math.random() * size/5);
    // each icon has this structure: [ [icon id], [index in the list of icons for this task] ]
    targetList[0].push([iconList[index],index]);
  }

  // shuffle targets so they are no longer in original order
  targetList[0] = shuffle(targetList[0].slice(0,));

  // avoid having the last target be the first repeat target
  var last = targetList[0][4];
  var rest = shuffle(targetList[0].slice(0,4));
  var first = [rest[0]];
  var tmp = rest.slice(1,);
  tmp.push(last);
  var list = first.concat(shuffle(tmp.slice(0,)));

  // cut off the first 3 to get only 3 repeat targets
  targetList[1] = list.slice(0,3);

  return targetList;
}


function newTaskIcon(data) {
  // list of all 5 target icons
  var targetIcons = data.targetList[0];
  // list of 3 repeat target icons
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
  icon.setAttribute("rotation", "0 0 20");
  icon.addEventListener("mouseup", iconSelected);
}

function updateControllerIcons(targetIcons, currentIcon) {
  var controllerIcons = $("#controller-icons").children("a-entity");
  var i = 0;
  [].forEach.call(controllerIcons, function(controllerIcon) {
    var iconType = targetIcons[i][0];

    if (i === currentIcon)
      controllerIcon.setAttribute("material", "color: white; src: #img" + iconType);
    else
      controllerIcon.setAttribute("material", "color: black; opacity: 0.8");

    i++;
  });

}
