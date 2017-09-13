AFRAME.registerComponent("task", {
  schema: {
    id: {type: "string"},
    type: {type: "string"},
    size: {type: "int"},

    iconList: {type: "array"},
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
    $("active-task").removeClass("active-task");
    $(this.el).addClass("active-task");

    // generate icons and targets
    this.data.iconList = randomList(this.data.size);
    this.data.targetList = generateTargetList(this.data.size, this.data.iconList);

    // populate UI with icons
    if ($(this.el).hasClass("c")) {
      console.log("CLIP SETUP", this.data.id);
      $(this.el).children("[cards]").get(0).components["card-clip"].setup(this.data.iconList);
    }
    else if ($(this.el).hasClass("p")) {
      console.log("SPACE SETUP", this.data.id);
      $(this.el).children("[cards]").get(0).components["card-space"].setup(this.data.iconList);
    }
    else if ($(this.el).hasClass("s")) {
      console.log("STACK SETUP", this.data.id);
      $(this.el).children("[cards]").get(0).components["card-stack"].setup(this.data.iconList);
    }

    // add event listener to first target


  },
  nextIcon: function () {

    // move to next step
    if (this.data.currentStage === 0) {
      // initial 5 icons
      if (this.data.currentIcon < 4) {
        this.data.currentIcon++;
      }
      else {
        console.log("starting repeat stage");
        this.data.currentIcon = 0;
      }
    }
    else {
      // 3 repeat icons
      if (this.data.currentIcon < 2) {
        this.data.currentIcon++;
      }
      else {
        console.log("done with task");

        // TODO: done with task popup or something
      }
    }

    // update highlighted icons in controller UI
    updateControllerIcons(this.data.targetList[currentStage], targetList[this.data.currentIcon]);

    // create ID e.g. s50_115
    var iconID = this.data.id + "_" + this.data.targetList[this.data.currentStage][this.data.currentIcon][1];
    console.log("iconID", iconID);

    // add event listeners to new target icon
    var icon = document.getElementById(iconID);
    icon.addEventListener("mouseup", iconSelected);

  }
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
    targetList[0].push([iconList[index],index]);
  }
  // shuffle targets so they are no longer in original order
  targetList[0] = shuffle(targetList[0]);

  // avoid having the last target be the first repeat target
  var tmp = targetList[0].slice(0,4);
  var first = [tmp[0]];
  var tmp2 = shuffle(targetList[0].slice(1,));
  first = first.concat(tmp2);

  // cut off the first 3
  targetList[1] = first.slice(0,3);

  return targetList;
}


function updateControllerIcons(targetIcons, currentIcon) {
  var children = $("#controller-icons").children("a-entity");
  var i = 0;
  [].forEach.call(children, function(child) {
    var iconType = targetIcons[i][0];

    if (i === currentIcon)
      child.setAttribute("material", "color: white; src: #img" + iconType);
    else
      child.setAttribute("material", "color: black; src: #img" + iconType);

    i++;
  });

}
