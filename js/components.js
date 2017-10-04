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

// current questionnaire
var questionnaire = {
  "conditionId": LATIN_SQUARE[LATIN_SQUARE_ROW][0],
  "answers": [0,0,0,0],
}

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



AFRAME.registerComponent("questionnaire", {
  schema: {
  },
  init: function () {
  },
  setup: function () {
    var q = document.createElement("a-entity");
    q.setAttribute("class", "questionnaire");
    hideControllerIcons();

    questionnaire.answers = [0,0,0,0];
    questionnaire.conditionId = this.el.components.task.id;

    var bgRect = document.createElement("a-box");
    bgRect.setAttribute("scale", "1.7 1.6 0.02");
    bgRect.setAttribute("position", "0 1.46 0.5");
    bgRect.setAttribute("material", "color: black; opacity: 0.8");
    q.appendChild(bgRect);

    var question1 = document.createElement("a-entity");
    question1.setAttribute("position", "-0.51 2 0.54");
    question1.setAttribute("material", "color: white");
    question1.setAttribute("text-geometry", "value: I could memorize the position of the items; size: 0.04; height: 0.001;");
    q.appendChild(question1);

    var question2 = document.createElement("a-entity");
    question2.setAttribute("position", "-0.53 1.7 0.54");
    question2.setAttribute("material", "color: white");
    question2.setAttribute("text-geometry", "value: I was overwhelmed by the number of items; size: 0.04; height: 0.001;");
    q.appendChild(question2);

    var question3 = document.createElement("a-entity");
    question3.setAttribute("position", "-0.46 1.4 0.54");
    question3.setAttribute("material", "color: white");
    question3.setAttribute("text-geometry", "value: I found the layout efficient to navigate; size: 0.04; height: 0.001;");
    q.appendChild(question3);

    var question4 = document.createElement("a-entity");
    question4.setAttribute("position", "-0.53 1.1 0.54");
    question4.setAttribute("material", "color: white");
    question4.setAttribute("text-geometry", "value: I could easily find the item I was looking for; size: 0.04; height: 0.001;");
    q.appendChild(question4);

    var infoleft = document.createElement("a-entity");
    infoleft.setAttribute("position", "-0.53 0.82 0.54");
    infoleft.setAttribute("material", "color: white");
    infoleft.setAttribute("text-geometry", "value: 1 = not true at all; size: 0.03; height: 0.001;");
    q.appendChild(infoleft);

    var inforight = document.createElement("a-entity");
    inforight.setAttribute("position", "0.3 0.82 0.54");
    inforight.setAttribute("material", "color: white");
    inforight.setAttribute("text-geometry", "value: 7 = very true; size: 0.03; height: 0.001;");
    q.appendChild(inforight);

    for (var i=0; i<4; i++) {
      for (var j=0; j<7; j++) {

        var ratingButton = document.createElement("a-entity");
        ratingButton.setAttribute("class", "rating-row-" + (i+1));
        ratingButton.setAttribute("position", (-0.45 + j*0.15) + " " + (1.89 - i*0.3) + " 0.56");
        ratingButton.setAttribute("scale", "1 1 1");
        ratingButton.setAttribute("geometry", "primitive: box; width: 0.12; height: 0.12; depth: 0.08");
        ratingButton.setAttribute("material", "color: white; opacity: 0.01");
        ratingButton.setAttribute("ratingButton", "question: " + (i+1) + "; rating: " + (j+1));
        ratingButton.setAttribute("hoverable", "");

        var ratingRect = document.createElement("a-box");
        ratingRect.setAttribute("scale", "0.12 0.12  0.02");
        ratingRect.setAttribute("position", "0 0 0");
        ratingRect.setAttribute("material", "color: white; opacity: 0.8");
        ratingButton.appendChild(ratingRect);

        var ratingNum = document.createElement("a-entity");
        ratingNum.setAttribute("position", "-0.017 -0.018 0.01");
        ratingNum.setAttribute("material", "color: black");
        ratingNum.setAttribute("text-geometry", "value: " + (j+1) + "; size: 0.04; height: 0.001;");
        ratingButton.appendChild(ratingNum);

        ratingButton.addEventListener("mouseup", function (e) {
          console.log("CLICKING RATING BUTTON");
          var btn = e.target.components.ratingButton.attrValue;
          console.log("question",btn.question,"rating",btn.rating);

          // reset all other rating buttons
          var otherRatings = $(".rating-row-" + btn.question).not(e.target);
          [].forEach.call(otherRatings, function(otherRating) {
            otherRating.components.hoverable.reset();
          });

          // write data to questionnaire
          questionnaire.answers[btn.question-1] = btn.rating;
          if (questionnaire.answers.every(isntZero)) {
            console.log("questionnaire complete!");

            var new_q = JSON.parse(JSON.stringify(questionnaire));
            questionnaires.push(new_q);

            $(".questionnaire").remove();
            setTimeout(
              function() {
                $(".active-task").get(0).components.task.showNextDialog();
            }, 300);
          }
        });

        q.appendChild(ratingButton);
      }
    }
    this.el.appendChild(q);
  },
});


AFRAME.registerComponent("ratingButton", {
  schema: {
    question: {type: "int"},
    rating: {type: "int"},
  },
  init: function() {
  },
});

function isntZero(a) {
  return a > 0;
}
