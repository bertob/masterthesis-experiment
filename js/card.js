var card_w = 0.17;
var card_h = card_w;
var card_d = 0.0009;

AFRAME.registerComponent("card", {
  schema: {
    id: {type: "int", default: -1},
    clicked: {type: "boolean", default: false},
  },
  init: function () {
    var id = this.data.id;
    if (id === -1)
      id = Math.floor(Math.random()*250) + 1;

    this.el.setAttribute("geometry", "primitive: box; width:" + card_w +
                         "; height:" + card_h + "; depth: " + card_d + ";");
    this.el.setAttribute("material", "color: white; src: #img" + id);
  },
  pause: function () {
    // console.log("card paused");
    this.el.removeEventListener("mouseenter", cardMouseover);
    this.el.removeEventListener("mouseleave", cardMouseleave);
    this.el.removeEventListener("mousedown", cardMousedown);
    this.el.removeEventListener("mouseup", cardMouseup);
  },
  play: function () {
    // console.log("card playing");
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
}

function cardMouseup(e) {
  var allOtherCards = $(document).find("[card]").not(e.target);
  [].forEach.call(allOtherCards, function(otherCard) {
    otherCard.components.card.play();
  });

  if (!e.target.components.card.data.clicked) {
    e.target.setAttribute("animation__hover", {
      "property": "scale",
      "dir": "alternate",
      "dur": 200,
      "easing": "easeOutQuad",
      "to": "0.6 0.6 1",
    });
    e.target.components.card.data.clicked = true;
    setTimeout(
      function() {
        // reset to normal after 1 second
        resetIcon(e)
    }, 1000);
  }
}

function iconSelected(e) {
  // remove event listener from this icon
  e.target.removeEventListener("mouseup", iconSelected);

  // e.target.setAttribute("rotation", "0 0 0");

  // TODO: highlight icon as correctly selected for 1s, then reset

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
  e.target.components.card.data.clicked = false;
}
