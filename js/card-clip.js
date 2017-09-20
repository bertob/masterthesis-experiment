var visible_items_clip = 12;
var top_baseline_clip = y_offset + (visible_items_clip - 1) * (card_h + y_gap);

AFRAME.registerComponent("card-clip", {
  schema: {
    size: {type: "int"}, // number of cards in stack
    iconList: {type: "array"},
  },
  setup: function (iconList) {
    this.teardown();
    this.data.iconList = iconList;

    for (var i=0; i<this.data.iconList.length; i++) {
      var card = document.createElement("a-entity");
      card.setAttribute("id", "c" + this.data.size + "_" + i);
      card.setAttribute("card", "id: " + this.data.iconList[i]);
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
    bottomBarrier.setAttribute("position", new THREE.Vector3( 0, (bottom_baseline), z_offset ));
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

    var x, y, z;
    var real_position = this.data.list_position - scroll_position;

    x = x_offset;
    y = y_offset + 1.68 - real_position * (card_h + y_gap);
    z = z_offset;

    var visible = getVisibility(y, bottom_baseline, top_baseline_clip);
    if (visible === false) {
      this.el.setAttribute("material", "opacity: 0; transparent: true");
    }
    else {
      this.el.setAttribute("material", "opacity: 1; transparent: false");
    }

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
      now.cursorPosition = document.getElementById("right-hand").components.position.attrValue;
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
          var new_y = now.cardY; // theoretical new y value

          x = x_offset;
          y = new_y;
          z = z_offset;

          var visible = getVisibility(new_y, bottom_baseline, top_baseline_clip);

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

function getVisibility(new_y, bottom_baseline, top_baseline_clip) {
  var visible;
  if (new_y < bottom_baseline || new_y > top_baseline_clip) {
    visible = false;
  }
  else {
    visible = true;
  }
  return visible;
}
