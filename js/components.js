var CONDITION_IDS = ["s20", "s50", "s150", "c20", "c50", "c150", "p20", "p50", "p150"];
var CONDITION_SIZE = [20, 50, 150, 20, 50, 150, 20, 50, 150];

var LATIN_SQUARE = [[ 'c50',  's50c',  'p50',  'c150',  'p20c',  'p150',  'c150c',  'p50c',  'p150c',  's20c',  'p20',  'c20c',  's50',  'c20',  's20',  's150',  's150c',  'c50c' ],
                    [ 's150c',  'p150c',  'c150c',  'c20c',  'c50',  'p20c',  'c20',  'c150',  'p20',  'p50c',  'c50c',  's50',  'p150',  's50c',  'p50',  's20c',  's20',  's150' ],
                    [ 'c150c',  's150',  'p150c',  'p20c',  'p50',  's20',  'p20',  'p150',  's20c',  's50',  'p50c',  'c50',  's150c',  'c50c',  's50c',  'c20c',  'c20',  'c150' ],
                    [ 's50',  'p50',  'c50',  's150',  'c20c',  'c150',  's150c',  'c50c',  'c150c',  'p20',  'c20',  's20c',  'p50c',  's20',  'p20c',  'p150c',  'p150',  's50c' ],
                    [ 'c50c',  's50',  'p50c',  'c150c',  'p20',  'p150c',  'c150',  'p50',  'p150',  's20',  'p20c',  'c20',  's50c',  'c20c',  's20c',  's150c',  's150',  'c50' ],
                    [ 's50c',  'p50c',  'c50c',  's150c',  'c20',  'c150c',  's150',  'c50',  'c150',  'p20c',  'c20c',  's20',  'p50',  's20c',  'p20',  'p150',  'p150c',  's50' ],
                    [ 'p50c',  'c50',  's50',  'p150c',  's20c',  's150',  'p150',  's50c',  's150c',  'c20',  's20',  'p20',  'c50c',  'p20c',  'c20c',  'c150c',  'c150',  'p50' ],
                    [ 'c20c',  's20',  'p20c',  'c50c',  'c150',  'p50c',  'c50',  'p20',  'p50',  'p150c',  'c150c',  's150',  's20c',  's150c',  'p150',  's50c',  's50',  'c20' ],
                    [ 'p20c',  'c20',  's20',  'p50c',  'p150',  's50',  'p50',  's20c',  's50c',  's150',  'p150c',  'c150',  'c20c',  'c150c',  's150c',  'c50c',  'c50',  'p20' ],
                    [ 'p50',  'c50c',  's50c',  'p150',  's20',  's150c',  'p150c',  's50',  's150',  'c20c',  's20c',  'p20c',  'c50',  'p20',  'c20',  'c150',  'c150c',  'p50c' ],
                    [ 'c20',  's20c',  'p20',  'c50',  'c150c',  'p50',  'c50c',  'p20c',  'p50c',  'p150',  'c150',  's150c',  's20',  's150',  'p150c',  's50',  's50c',  'c20c' ],
                    [ 'p20',  'c20c',  's20c',  'p50',  'p150c',  's50c',  'p50c',  's20',  's50',  's150c',  'p150',  'c150c',  'c20',  'c150',  's150',  'c50',  'c50c',  'p20c' ],
                    [ 'p150',  'c150c',  's150c',  's20c',  's50',  'c20c',  's20',  's150',  'c20',  'c50c',  's50c',  'p50c',  'c150',  'p50',  'c50',  'p20',  'p20c',  'p150c' ],
                    [ 's20c',  'p20c',  'c20c',  's50c',  's150',  'c50c',  's50',  'c20',  'c50',  'c150c',  's150c',  'p150c',  'p20',  'p150',  'c150',  'p50',  'p50c',  's20' ],
                    [ 'c150',  's150c',  'p150',  'p20',  'p50c',  's20c',  'p20c',  'p150c',  's20',  's50c',  'p50',  'c50c',  's150',  'c50',  's50',  'c20',  'c20c',  'c150c' ],
                    [ 's20',  'p20',  'c20',  's50',  's150c',  'c50',  's50c',  'c20c',  'c50c',  'c150',  's150',  'p150',  'p20c',  'p150c',  'c150c',  'p50c',  'p50',  's20c' ],
                    [ 's150',  'p150',  'c150',  'c20',  'c50c',  'p20',  'c20c',  'c150c',  'p20c',  'p50',  'c50',  's50c',  'p150c',  's50',  'p50c',  's20',  's20c',  's150c' ],
                    [ 'p150c',  'c150',  's150',  's20',  's50c',  'c20',  's20c',  's150c',  'c20c',  'c50',  's50',  'p50',  'c150c',  'p50c',  'c50c',  'p20c',  'p20',  'p150' ]];

var LATIN_SQUARE_ROW = 8;
var PARTICIPANT_NO = 1;

// array with all log items
var logs = [];

// current log item
var log = {
  "participant": PARTICIPANT_NO,

  // updated for each task
  "condition": 0,
  "conditionId": LATIN_SQUARE[LATIN_SQUARE_ROW][0],

  // updated at beginning of new icon
  "iconId": 0,
  "iconPosition": 0,
  "trial": 0,
  "repeat": 0,

  "startTimestamp": 0,

  // updated at end of new icon
  "duration": 0,

  "movement": 0,
  "scrolling": 0,

  "errors": [],
};

// array with answers to quesitonnaire
var questionnaires = [];

var test = {};
test.s = [{}, {}, {}];

var stepContainer = document.getElementById("step-container");

AFRAME.registerComponent("hoverable", {
  schema: {
    clicked: {type: "boolean", default: false},
  },
  init: function () {
    this.data.clicked = false;
    this.el.addEventListener("mouseenter", hoverableMouseenter);
    this.el.addEventListener("mouseleave", hoverableMouseleave);
    this.el.addEventListener("mouseup", hoverableMouseup);
  },
  reset: function () {
    this.el.setAttribute("animation__hover", {
      "property": "scale",
      "dur": 200,
      "easing": "easeOutQuad",
      "to": "1 1 1",
    });
    this.data.clicked = false;
  },
});


function hoverableMouseenter(e) {
  if (!e.target.components.hoverable.data.clicked) {
    e.target.setAttribute("animation__hover", {
      "property": "scale",
      "dur": 200,
      "easing": "easeOutQuad",
      "to": "1.2 1.2 1",
    });
  }
}

function hoverableMouseleave(e) {
  if (!e.target.components.hoverable.data.clicked) {
    e.target.setAttribute("animation__hover", {
      "property": "scale",
      "dur": 200,
      "easing": "easeOutQuad",
      "to": "1 1 1",
    });
  }
}

function hoverableMouseup(e) {
  if (!e.target.components.hoverable.data.clicked) {
    e.target.setAttribute("animation__hover", {
      "property": "scale",
      "dur": 200,
      "easing": "easeOutQuad",
      "to": "0.6 0.6 1",
    });
    e.target.components.hoverable.data.clicked = true;
  }
}


AFRAME.registerComponent("trackmovement", {
  schema: {
    prevPosition: {type: "vec3", default: null},
  },
  tick: function () {
    if (document.getElementById("right-hand").components.position.attrValue != null) {
      var curr = document.getElementById("right-hand").components.position.attrValue;
      var prev = this.data.prevPosition;

      if (prev === null) {
        this.data.prevPosition = curr;
      }
      else {
        var length = Math.hypot(curr.x - prev.x, curr.y - prev.y, curr.z - prev.z);
        if (length > 0.003) {
          log.movement += length;
        }
        else {
        }

        this.data.prevPosition = curr;
      }
    }
  },
});
