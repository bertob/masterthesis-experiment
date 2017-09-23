var CONDITION_IDS = ["s20", "s50", "s150", "c20", "c50", "c150", "p20", "p50", "p150"];
var CONDITION_SIZE = [20, 50, 150, 20, 50, 150, 20, 50, 150];

var LATIN_SQUARE = [[ 's50', 's20', 'c20', 'c150', 'p50', 'c50', 'p150', 'p20', 's150' ],
                    [ 'p20', 'c150', 'p150', 's50', 'c20', 's20', 'c50', 's150', 'p50' ],
                    [ 's150', 's50', 'c50', 'p20', 'p150', 'c150', 's20', 'p50', 'c20' ],
                    [ 'c50', 'c20', 'p20', 'p150', 's50', 'p50', 's150', 's20', 'c150' ],
                    [ 'c150', 'c50', 'p50', 's20', 's150', 'p150', 'c20', 's50', 'p20' ],
                    [ 'p50', 'p20', 's20', 's150', 'c50', 's50', 'c150', 'c20', 'p150' ],
                    [ 'p150', 'p50', 's50', 'c20', 'c150', 's150', 'p20', 'c50', 's20' ],
                    [ 's20', 'p150', 's150', 'c50', 'p20', 'c20', 'p50', 'c150', 's50' ],
                    [ 'c20', 's150', 'c150', 'p50', 's20', 'p20', 's50', 'p150', 'c50' ]];

var LATIN_SQUARE_ROW = 1;
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
  }
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
