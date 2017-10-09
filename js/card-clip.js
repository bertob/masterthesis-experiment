var visible_items_clip = 7;
var top_baseline_clip = y_offset + (visible_items_clip - 1) * (card_h + y_gap);
var bottom_baseline_clip = 0.6;
var clip_start_offset = 0.4;

AFRAME.registerComponent("card-clip", {
  schema: {
    size: {type: "int"}, // number of cards in stack
    iconList: {type: "array"},
    color: {type: "boolean", default: false},
  },
  setup: function (iconList, color) {
    this.teardown();
    this.data.iconList = iconList;
    this.data.color = color;
    var isColor = "";
    if (this.data.color) isColor = "c";

    for (var i=0; i<this.data.iconList.length; i++) {
      var card = document.createElement("a-entity");
      card.setAttribute("id", "c" + this.data.size + isColor + "_" + i);
      card.setAttribute("card", "id: " + this.data.iconList[i] + "; position: " + i);
      card.setAttribute("clipped", "list_position: " + i);
      this.el.appendChild(card);
    }

    var barrier_w = 0.4;
    var barrier_h = 0.3;
    var barrier_d = 0.05;

    var topBarrier = document.createElement("a-entity");
    topBarrier.setAttribute("box", "");
    topBarrier.setAttribute("geometry", "primitive: box; width:" + barrier_w +
                         "; height:" + barrier_h + "; depth: " + barrier_d + ";");
    topBarrier.setAttribute("material", "color: #113");
    topBarrier.setAttribute("position", new THREE.Vector3( 0, top_baseline_clip, z_offset ));
    this.el.appendChild(topBarrier);

    var bottomBarrier = document.createElement("a-entity");
    bottomBarrier.setAttribute("box", "");
    bottomBarrier.setAttribute("geometry", "primitive: box; width:" + barrier_w +
                         "; height:" + barrier_h + "; depth: " + barrier_d + ";");
    bottomBarrier.setAttribute("material", "color: #113");
    bottomBarrier.setAttribute("position", new THREE.Vector3( 0, (bottom_baseline_clip), z_offset ));
    this.el.appendChild(bottomBarrier);
  },
  teardown: function () {
    $(this.el).empty();
  },
});

AFRAME.registerComponent("clipped", {
  schema: {
    list_position: {type: "int"},
  },
  init: function () {
    // console.log("INIT CLIPPED CARD");
    this.start = {};
    this.prev = {};
    this.moving = false;

    var x, y, z, new_y;
    var real_position = this.data.list_position - scroll_position;

    x = x_offset;
    new_y = y_offset + clip_start_offset - real_position * (card_h + y_gap);
    y = getClippedY(new_y, bottom_baseline_clip, top_baseline_clip);
    z = z_offset;

    this.el.setAttribute("position", new THREE.Vector3( x, y, z ));
    this.prev.position = [x, new_y, z];
  },
  update: function () {},
  tick: function (time) {
    var now = {};
    var start = this.start;
    var prev = this.prev;

    if (triggerdown && this.isPlaying) {
      now.cursorY = getCursorY();

      if (!this.moving) {
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
        now.relDeltaY = now.cursorY - prev.cursorY;
        now.absDeltaY = prev.absDeltaY + now.relDeltaY * 12;
        now.cardY = start.cardY + now.absDeltaY;

        // use the first card to measure scrolling distance
        if (this.data.list_position === 0) {
          log.scrolling += Math.abs(now.relDeltaY * 12);
        }

        if (now.relDeltaY !== 0) {
          var x, y, z;
          var new_y = now.cardY; // theoretical new y value

          x = x_offset;
          y = getClippedY(new_y, bottom_baseline_clip, top_baseline_clip);
          z = z_offset;

          this.el.setAttribute("position", new THREE.Vector3( x, y, z ));

          this.prev.position = [x, new_y, z];
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

function getClippedY(new_y, bottom, top) {
  return Math.min(Math.max(new_y, bottom), top);
}
