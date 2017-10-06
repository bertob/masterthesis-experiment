
AFRAME.registerComponent("questionnaire", {
  schema: {
    answers: {type: "array", default: [0,0,0,0]},
    conditionId: {type:"string"},
  },
  init: function () {
  },
  setup: function () {
    var q = document.createElement("a-entity");
    q.setAttribute("class", "questionnaire");
    hideControllerIcons();

    this.data.answers = [0,0,0,0];
    this.data.conditionId = this.el.components.task.data.id;

    var bgRect = document.createElement("a-box");
    bgRect.setAttribute("scale", "1.7 1.6 0.02");
    bgRect.setAttribute("position", "0 1.46 " + (BUTTON_Z + 0.08));
    bgRect.setAttribute("material", "color: black; opacity: 0.8");
    q.appendChild(bgRect);

    var question1 = document.createElement("a-entity");
    question1.setAttribute("position", "-0.51 2 " + (BUTTON_Z + 0.12));
    question1.setAttribute("material", "color: white");
    question1.setAttribute("text-geometry", "value: I could memorize the position of the items; size: 0.04; height: 0.001;");
    q.appendChild(question1);

    var question2 = document.createElement("a-entity");
    question2.setAttribute("position", "-0.53 1.7 " + (BUTTON_Z + 0.12));
    question2.setAttribute("material", "color: white");
    question2.setAttribute("text-geometry", "value: I was overwhelmed by the number of items; size: 0.04; height: 0.001;");
    q.appendChild(question2);

    var question3 = document.createElement("a-entity");
    question3.setAttribute("position", "-0.46 1.4 " + (BUTTON_Z + 0.12));
    question3.setAttribute("material", "color: white");
    question3.setAttribute("text-geometry", "value: I found the layout efficient to navigate; size: 0.04; height: 0.001;");
    q.appendChild(question3);

    var question4 = document.createElement("a-entity");
    question4.setAttribute("position", "-0.53 1.1 " + (BUTTON_Z + 0.12));
    question4.setAttribute("material", "color: white");
    question4.setAttribute("text-geometry", "value: I could easily find the item I was looking for; size: 0.04; height: 0.001;");
    q.appendChild(question4);

    var infoleft = document.createElement("a-entity");
    infoleft.setAttribute("position", "-0.53 0.82 " + (BUTTON_Z + 0.12));
    infoleft.setAttribute("material", "color: white");
    infoleft.setAttribute("text-geometry", "value: 1 = not true at all; size: 0.03; height: 0.001;");
    q.appendChild(infoleft);

    var inforight = document.createElement("a-entity");
    inforight.setAttribute("position", "0.3 0.82 " + (BUTTON_Z + 0.12));
    inforight.setAttribute("material", "color: white");
    inforight.setAttribute("text-geometry", "value: 7 = very true; size: 0.03; height: 0.001;");
    q.appendChild(inforight);

    for (var i=0; i<4; i++) {
      for (var j=0; j<7; j++) {

        var ratingButton = document.createElement("a-entity");
        ratingButton.setAttribute("class", "rating-row-" + (i+1));
        ratingButton.setAttribute("position", (-0.45 + j*0.15) + " " + (1.89 - i*0.3) + " " + (BUTTON_Z + 0.12));
        ratingButton.setAttribute("scale", "1 1 1");
        ratingButton.setAttribute("geometry", "primitive: box; width: 0.12; height: 0.12; depth: 0.02");
        ratingButton.setAttribute("material", "color: white; opacity: 0.01");
        ratingButton.setAttribute("ratingbutton", "question: " + (i+1) + "; rating: " + (j+1));
        ratingButton.setAttribute("hoverable", "");

        var ratingRect = document.createElement("a-box");
        ratingRect.setAttribute("scale", "0.12 0.12  0");
        ratingRect.setAttribute("position", "0 0 0");
        ratingRect.setAttribute("material", "color: white; opacity: 0.8");
        ratingButton.appendChild(ratingRect);

        var ratingNum = document.createElement("a-entity");
        ratingNum.setAttribute("position", "-0.017 -0.018 0.018");
        ratingNum.setAttribute("material", "color: black");
        ratingNum.setAttribute("text-geometry", "value: " + (j+1) + "; size: 0.04; height: 0.001;");
        ratingButton.appendChild(ratingNum);

        ratingButton.addEventListener("mouseup", function (e) {
          var btn = e.target.components.ratingbutton.attrValue;

          // reset all other rating buttons
          var otherRatings = $(".rating-row-" + btn.question).not(e.target);
          [].forEach.call(otherRatings, function(otherRating) {
            otherRating.components.hoverable.reset();
          });

          // write data to questionnaire
          $(".active-task").get(0).components.questionnaire.data.answers[btn.question-1] = btn.rating;
          if ($(".active-task").get(0).components.questionnaire.data.answers.every(isntZero)) {
            var new_q = JSON.parse(JSON.stringify($(".active-task").get(0).components.questionnaire.data));
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


AFRAME.registerComponent("ratingbutton", {
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
