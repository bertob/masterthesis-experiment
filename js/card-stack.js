var list_length = 20;
var visible_items = 5;
var scroll_position = 0; // 0...(list_length - visible_items)

var x_offset = 0;
var y_offset = 1.1; // 1.3m from the floor
var z_offset = 0.1; // 60cm before viewer

var card_w = 0.17;
var card_h = card_w;
var card_d = 0.0009;

var y_gap = 0.007;

var top_baseline = y_offset + (visible_items - 1) * (card_h + y_gap);
var bottom_baseline = y_offset;

var triggerdown = false;

AFRAME.registerComponent("card-stack", {
  schema: {
    size: {type: "int"}, // number of cards in stack
    iconList: {type: "array"},
  },
  setup: function (iconList) {
    this.teardown();
    this.data.iconList = iconList;

    for (var i=0; i<this.data.iconList.length; i++) {
      var card = document.createElement("a-entity");
      card.setAttribute("id", "s" + this.data.size + "_" + i);
      card.setAttribute("card", "id: " + this.data.iconList[i] + "; position: " + i);
      card.setAttribute("stacked", "list_position: " + i);
      this.el.appendChild(card);
    }
  },
  teardown: function () {
    $(this.el).empty();
  },
  update: function () {},
  tick: function () {},
  remove: function () {},
  pause: function () {},
  play: function () {}
});

AFRAME.registerComponent("stacked", {
  schema: {
    list_position: {type: "int"},
  },
  init: function () {
    // console.log("INIT STACKED CARD");
    this.start = {};
    this.prev = {};
    this.moving = false;

    var x, y, z;
    var real_position = this.data.list_position - scroll_position;
    var theoretical_y = y_offset + 0.6 - real_position * (card_h + y_gap);

    var position = getCardPosition(theoretical_y, bottom_baseline, x_offset, z_offset);
    x = position[0];
    y = position[1];
    z = position[2];

    this.el.setAttribute("position", new THREE.Vector3( x, y, z ));
    this.prev.position = [x, theoretical_y, z];
  },
  update: function () {},
  tick: function (time) {
    var now = {};
    var start = this.start;
    var prev = this.prev;

    if (triggerdown && this.isPlaying) {
      // console.log("TICK + TRIGGERDOWN");
      now.cursorY = getCursorY();

      if (!this.moving) {
        // console.log("start");
        start.cursorY = now.cursorY;
        start.cardY = prev.position[1];
        start.position = prev.position;
        prev.cursorY = now.cursorY;
        prev.absDeltaY = 0;

        this.start = start;
        this.prev = prev;
        this.moving = true;
      }
      else {
        // console.log("moving");
        now.relDeltaY = now.cursorY - prev.cursorY;
        now.absDeltaY = prev.absDeltaY + now.relDeltaY * 12;
        now.cardY = start.cardY + now.absDeltaY;

        if (now.relDeltaY !== 0) {
          var x, y, z;
          var position = getCardPosition(now.cardY, bottom_baseline, x_offset, z_offset);
          x = position[0];
          y = position[1];
          z = position[2];
          this.el.setAttribute("position", new THREE.Vector3( x, y, z ));

          this.prev.position = [x, now.cardY, z];
          this.prev.absDeltaY = now.absDeltaY;
          this.prev.cursorY = now.cursorY;
        }
      }
    }
    else {
      this.start = {};
      this.moving = false;
    }

  },
  remove: function () {},
  pause: function () {},
  play: function () {}
});

function getCardPosition (new_y, bottom_baseline, x_offset, z_offset) {
  var y, z;

  if (new_y < bottom_baseline) {
    // stacked on bottom
    var y_below = bottom_baseline - new_y; // how far below bottom baseline
    y = bottom_baseline - getStackedY(y_below);
    z = z_offset - getCardDepth(y_below);
  }
  else if (new_y > top_baseline) {
    // stacked on top
    var y_above = new_y - top_baseline; // how far above top baseline
    y = top_baseline + getStackedY(y_above);
    z = z_offset - getCardDepth(y_above);
  }
  else {
    // visible in list
    y = new_y;
    z = z_offset;
    visible = true;
  }
  return [x_offset, y, z];
}

// returns y position of stacked card
function getStackedY(y) {
  var steepness = 0.09; // the higher, the steeper the curve
  return Math.sqrt(y * steepness);
}

// returns z position as a function of how far
// outside the visible area the card is
function getCardDepth(y) {
  var z_distance = 0.14;
  return y * z_distance;
}

function getCursorY() {
  return document.getElementById("right-hand").components.position.attrValue.y;
}
