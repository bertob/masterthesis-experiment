var card_w = 0.17;
var card_h = card_w;
var card_d = 0.0009;

AFRAME.registerComponent("card", {
  schema: {
    id: {type: "int", default: -1},
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
    this.el.removeEventListener("mouseenter", cardMouseover);
    this.el.removeEventListener("mouseleave", cardMouseleave);
    this.el.removeEventListener("mouseup", cardMouseup);
  },
  play: function () {
    this.el.addEventListener("mouseenter", cardMouseover);
    this.el.addEventListener("mouseleave", cardMouseleave);
    this.el.addEventListener("mouseup", cardMouseup);
  },
});

function cardMouseover(e) {
  if (!e.target.dataset.clicked) {
    this.setAttribute("animation__hover", {
      "property": "scale",
      "dir": "alternate",
      "dur": 100,
      "easing": "easeOutQuad",
      "to": "1.2 1.2 1",
    });
  }
}

function cardMouseleave(e) {
  if (!e.target.dataset.clicked) {
    this.setAttribute("animation__hover", {
      "property": "scale",
      "dir": "alternate",
      "dur": 100,
      "easing": "easeOutQuad",
      "to": "1 1 1",
    });
  }
}

function cardMouseup(e) {
  if (!e.target.dataset.clicked) {
    this.setAttribute("animation__hover", {
      "property": "scale",
      "dir": "alternate",
      "dur": 100,
      "easing": "easeOutQuad",
      "to": "0.6 0.6 1",
    });
    e.target.dataset.clicked = true;
  }
}
