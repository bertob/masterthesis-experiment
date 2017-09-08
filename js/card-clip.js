var visible_items_clip = 12;
var top_baseline_clip = y_offset + (visible_items_clip - 1) * (card_h + y_gap);

AFRAME.registerComponent("card-clip", {
  schema: {
    size: {type: "int"}, // number of cards in stack
  },
  init: function () {
    for (var i=0; i<this.data.size; i++) {
      var card = document.createElement("a-entity");
      card.setAttribute("card", "");
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
    topBarrier.setAttribute("material", "color: #1b2252");
    topBarrier.setAttribute("position", new THREE.Vector3( 0, top_baseline_clip, z_offset ));
    this.el.appendChild(topBarrier);

    var bottomBarrier = document.createElement("a-entity");
    bottomBarrier.setAttribute("box", "");
    bottomBarrier.setAttribute("geometry", "primitive: box; width:" + barrier_w +
                         "; height:" + barrier_h + "; depth: " + barrier_d + ";");
    bottomBarrier.setAttribute("material", "color: #113");
    bottomBarrier.setAttribute("position", new THREE.Vector3( 0, (bottom_baseline), z_offset ));
    this.el.appendChild(bottomBarrier);
  },
  update: function () {},
  tick: function (time) {},
  remove: function () {},
  pause: function () {},
  play: function () {}
});

AFRAME.registerComponent("clipped", {
  schema: {
    list_position: {type: "int"},
  },
  init: function () {
    console.log("INIT STACKED CARD");
    this.start = {};
    this.prev = {};
    this.moving = false;
    var x, y, z;
    x = x_offset;

    var real_position = this.data.list_position - scroll_position;

    y = y_offset + real_position * (card_h + y_gap);
    z = z_offset;

    // var id = Math.floor(Math.random()*250) + 1;
    // this.el.setAttribute("geometry", "primitive: box; width:" + card_w +
                        //  "; height:" + card_h + "; depth: " + card_d + ";");
    // this.el.setAttribute("material", "color: white; src: #img" + id);
    this.el.setAttribute("position", new THREE.Vector3( x, y, z ));
    this.prev.position = [x, y, z];
  },
  update: function () {},
  tick: function (time) {
    var now = {};
    var start = this.start;
    var prev = this.prev;

    if (triggerdown && this.isPlaying) {
      // console.log("TICK + TRIGGERDOWN");
      now.cursorPosition = document.getElementById("left-hand").components.position.attrValue;
      now.cursorY = now.cursorPosition.y;

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
        now.absDeltaY = prev.absDeltaY + now.relDeltaY * 3;
        now.cardY = start.cardY + now.absDeltaY;

        if (now.relDeltaY !== 0) {
          var x, y, z;
          x = x_offset;
          var new_y = now.cardY; // theoretical new y value
          var visible = false;

          y = new_y;
          z = z_offset;

          if (new_y < bottom_baseline) {
            // stacked on bottom
            // var y_below = bottom_baseline - new_y; // how far below bottom baseline
            // y = bottom_baseline - getStackedY(y_below);
            // z = z_offset - getCardDepth(y_below);
          }
          else if (new_y > top_baseline_clip) {
            // stacked on top
            // var y_above = new_y - top_baseline_clip; // how far above top baseline
            // y = top_baseline_clip + getStackedY(y_above);
            // z = z_offset - getCardDepth(y_above);
          }
          else {
            // visible in list
            visible = true;
          }
          if (visible === false) {
            this.el.setAttribute("material", "opacity: 0; transparent: true");
          }
          else {
            this.el.setAttribute("material", "opacity: 1; transparent: false");
          }
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
