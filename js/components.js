var CONDITION_IDS = ["s20", "s50", "s250", "c20", "c50", "c250", "p20", "p50", "p250"];
var CONDITION_SIZE = [20, 50, 250, 20, 50, 250, 20, 50, 250];

var LATIN_SQUARE = [[ 's50', 's20', 'c20', 'c250', 'p50', 'c50', 'p250', 'p20', 's250' ],
                    [ 'p20', 'c250', 'p250', 's50', 'c20', 's20', 'c50', 's250', 'p50' ],
                    [ 's250', 's50', 'c50', 'p20', 'p250', 'c250', 's20', 'p50', 'c20' ],
                    [ 'c50', 'c20', 'p20', 'p250', 's50', 'p50', 's250', 's20', 'c250' ],
                    [ 'c250', 'c50', 'p50', 's20', 's250', 'p250', 'c20', 's50', 'p20' ],
                    [ 'p50', 'p20', 's20', 's250', 'c50', 's50', 'c250', 'c20', 'p250' ],
                    [ 'p250', 'p50', 's50', 'c20', 'c250', 's250', 'p20', 'c50', 's20' ],
                    [ 's20', 'p250', 's250', 'c50', 'p20', 'c20', 'p50', 'c250', 's50' ],
                    [ 'c20', 's250', 'c250', 'p50', 's20', 'p20', 's50', 'p250', 'c50' ]];

var LATIN_SQUARE_ROW = 1;

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
