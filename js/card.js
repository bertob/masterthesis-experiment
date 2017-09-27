var card_w = 0.17;
var card_h = card_w;
var card_d = 0.0009;

var border_w = 0.002
var border_l = card_w + border_w;
var border_d = card_d + 0.001

AFRAME.registerComponent("card", {
  schema: {
    id: {type: "int", default: -1},
    position: {type: "int", default: 0},
    clicked: {type: "boolean", default: false},
    target: {type: "boolean", default: false},
    scrollStartY: {type: "int", default: 0},
  },
  init: function () {
    var id = this.data.id;
    if (id === -1)
      id = Math.floor(Math.random()*150) + 1;

    this.el.setAttribute("geometry", "primitive: box; width:" + card_w +
                         "; height:" + card_h + "; depth: " + card_d + ";");
    this.el.setAttribute("material", "color: white; src: #img" + id);

    var topBorder = document.createElement("a-entity");
    topBorder.setAttribute("position", "0 " + (card_w/2) + " 0.001");
    topBorder.setAttribute("geometry", "primitive: box; width: "+ border_l +"; height: "+ border_w +"; depth:"+ border_d);
    topBorder.setAttribute("material", "color: gray");
    topBorder.setAttribute("hoverable", "");
    this.el.appendChild(topBorder);

    var rightBorder = document.createElement("a-entity");
    rightBorder.setAttribute("position", (-card_w/2) + "0 0.001");
    rightBorder.setAttribute("geometry", "primitive: box; width: "+ border_w +"; height: "+ border_l +"; depth:"+ border_d);
    rightBorder.setAttribute("material", "color: gray");
    rightBorder.setAttribute("hoverable", "");
    this.el.appendChild(rightBorder);

    var bottomBorder = document.createElement("a-entity");
    bottomBorder.setAttribute("position", "0 " + (-card_w/2) + " 0.001");
    bottomBorder.setAttribute("geometry", "primitive: box; width: "+ border_l +"; height: "+ border_w +"; depth:"+ border_d);
    bottomBorder.setAttribute("material", "color: gray");
    bottomBorder.setAttribute("hoverable", "");
    this.el.appendChild(bottomBorder);

    var leftBorder = document.createElement("a-entity");
    leftBorder.setAttribute("position", (card_w/2) + "0 0.001");
    leftBorder.setAttribute("geometry", "primitive: box; width: "+ border_w +"; height: "+ border_l +"; depth:"+ border_d);
    leftBorder.setAttribute("material", "color: gray");
    leftBorder.setAttribute("hoverable", "");
    this.el.appendChild(leftBorder);
  },
  pause: function () {
    this.el.removeEventListener("mouseenter", cardMouseover);
    this.el.removeEventListener("mouseleave", cardMouseleave);
    this.el.removeEventListener("mousedown", cardMousedown);
    this.el.removeEventListener("mouseup", cardMouseup);
  },
  play: function () {
    this.el.addEventListener("mouseenter", cardMouseover);
    this.el.addEventListener("mouseleave", cardMouseleave);
    this.el.addEventListener("mousedown", cardMousedown);
    this.el.addEventListener("mouseup", cardMouseup);
  },
  // update: function () {
  //   this.el.setAttribute("material", "color: white; src: #img" + this.data.id);
  // }
});

function cardMouseover(e) {
  if (!e.target.components.card.data.clicked) {
    e.target.setAttribute("animation__hover", {
      "property": "scale",
      "dir": "alternate",
      "dur": 100,
      "easing": "easeOutQuad",
      "to": "1.1 1.1 1",
    });
  }
}

function cardMouseleave(e) {
  if (!e.target.components.card.data.clicked) {
    e.target.setAttribute("animation__hover", {
      "property": "scale",
      "dir": "alternate",
      "dur": 100,
      "easing": "easeOutQuad",
      "to": "1 1 1",
    });
  }
}

function cardMousedown(e) {
  var allOtherCards = $(document).find("[card]").not(e.target);
  [].forEach.call(allOtherCards, function(otherCard) {
    otherCard.components.card.pause();
  });

  // store cursor position at mousedown
  e.target.components.card.data.scrollStartY = e.target.components.position.data.y;
}

function cardMouseup(e) {
  var cardData = e.target.components.card.data;
  var allOtherCards = $(document).find("[card]").not(e.target);
  [].forEach.call(allOtherCards, function(otherCard) {
    otherCard.components.card.play();
  });

  var oldCursorY = cardData.scrollStartY;
  var newCursorY = e.target.components.position.data.y;

  // only register the click if the cursor hasn't moved too much
  if (Math.abs(newCursorY - oldCursorY) < 0.06) {
    if (!cardData.clicked) {
      e.target.setAttribute("animation__hover", {
        "property": "scale",
        "dir": "alternate",
        "dur": 200,
        "easing": "easeOutQuad",
        "to": "0.7 0.7 1",
      });
      cardData.clicked = true;

      setTimeout(
        function() {
          var correctness = "incorrect";
          if (cardData.target) correctness = "correct";
          else {
            log.errors.push({
              "iconId": cardData.id,
              "iconPosition": cardData.position,
              "timestamp": Date.now() - log.startTimestamp,
            });
          }
          e.target.setAttribute("material", "color: white; src: #" + correctness);
        }, 50);

      setTimeout(
        function() {
          // reset to normal after 1 second
          resetIcon(e)
        }, 1000);
    }
  }

}

function iconSelected(e) {
  // remove event listener from this icon
  e.target.removeEventListener("mouseup", iconSelected);

  // changes the highlight icon to a checkmark
  e.target.components.card.data.target = true;

  $(".active-task").get(0).components.task.nextIcon();
}

function resetIcon(e) {
  e.target.setAttribute("animation__hover", {
    "property": "scale",
    "dir": "alternate",
    "dur": 200,
    "easing": "easeOutQuad",
    "to": "1 1 1",
  });
  e.target.setAttribute("material", "color: white; src: #img" + e.target.components.card.data.id);
  e.target.components.card.data.clicked = false;
  e.target.components.card.data.target = false;
}

function testSelected(e) {
  e.target.removeEventListener("mouseup", testSelected);
  e.target.components.card.data.target = true;

  test.currentIcon++;

  if (test.currentIcon === 3) {
    // move to next step
    test.currentStep++;
    test.currentIcon = 0;
    test.currentId = test.stepIds[test.currentStep];

    setTimeout(
      function() {
        document.getElementById("step-container").components.stepcontainer.next();
      }, 1000);

    if (test.currentStep <= 4) {
      newTestIcon();
    }
  }
  else {
    newTestIcon();
  }
}

function newTestIcon() {
  var iconID = test.currentId + "_" + test.s[test.currentStep].targetList[test.currentIcon][1];
  updateControllerIcons(test.s[test.currentStep].targetList, test.currentIcon);
  document.getElementById(iconID).addEventListener("mouseup", testSelected);
}
