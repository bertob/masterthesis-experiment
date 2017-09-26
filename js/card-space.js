AFRAME.registerComponent("card-space", {
  schema: {
    size: {type: "int"},
    iconList: {type: "array"},
    degrees: {type: "int", default: 120},
  },
  init: function () {
  },
  setup: function (iconList) {
    this.teardown();
    this.data.iconList = iconList;

    for (var i=0; i<this.data.iconList.length; i++) {
      var card = document.createElement("a-entity");
      if (this.data.size <= 15) {
        card.setAttribute("id", "p15_" + i);
        card.setAttribute("position", getGridPosition20(i));
      }
      else if (this.data.size <= 20) {
        card.setAttribute("id", "p20_" + i);
        card.setAttribute("position", getGridPosition20(i));
      }
      else if (this.data.size <= 50) {
        card.setAttribute("id", "p50_" + i);
        card.setAttribute("position", getGridPosition50(i));
      }
      else if (this.data.size <= 150) {
        this.data.degrees = 120;
        var angular_gap = this.data.degrees/15;
        card.setAttribute("id", "p150_" + i);
        card.setAttribute("position", getGridPosition150(i, this.data.degrees, angular_gap, 15));
        card.setAttribute("rotation", getGridRotation150(i, this.data.degrees, angular_gap));
      }
      else if (this.data.size <= 250) {
        this.data.degrees = 200;
        var angular_gap = this.data.degrees/25;
        card.setAttribute("id", "p250_" + i);
        card.setAttribute("position", getGridPosition150(i, this.data.degrees, angular_gap, 25));
        card.setAttribute("rotation", getGridRotation150(i, this.data.degrees, angular_gap));
      }
      else if (this.data.size <= 450) {
        this.data.degrees = 360;
        var angular_gap = this.data.degrees/45;
        card.setAttribute("id", "p450_" + i);
        card.setAttribute("position", getGridPosition150(i, this.data.degrees, angular_gap, 45));
        card.setAttribute("rotation", getGridRotation150(i, this.data.degrees, angular_gap));
      }

      card.setAttribute("card", "id: " + this.data.iconList[i] + "; position: " + i);
      this.el.appendChild(card);
    }
  },
  teardown: function () {
    console.log();
    $(this.el).find("[card]").remove();
  },

});

function getGridPosition20 (index) {
  var columns = 5;
  var gap = 0.02;

  var row_width = (columns * card_w) + ((columns - 1) * gap);
  var base_x = -1 * (row_width / 2);
  var base_y = 1.8;
  var base_z = z_offset;

  var x = base_x + (index % columns) * (card_w + gap);
  var y = base_y - Math.floor(index / columns) * (card_h + gap);
  var z = base_z;

  return new THREE.Vector3( x, y, z );
}

function getGridPosition50 (index) {
  var columns = 10;
  var gap = 0.02;

  var row_width = (columns * card_w) + ((columns - 1) * gap);
  var base_x = -1 * (row_width / 2);
  var base_y = 1.8;
  var base_z = z_offset;

  var x = base_x + (index % columns) * (card_w + gap);
  var y = base_y - Math.floor(index / columns) * (card_h + gap);
  var z = base_z;

  return new THREE.Vector3( x, y, z );
}

var ring = {};
ring.x = 0;
ring.y = 1;
ring.z = 1;
ring.radius = 1.4;
ring.vertical_gap = 0.2; // vertical distance between rows

function getGridPosition150 (i, fov, angular_gap, icons_per_row) {
  var x, y, z;
  var a = (i*angular_gap)%fov + (180 + (90 - fov/2) + angular_gap/2);

  x = ring.x + Math.cos(a*Math.PI/180) * ring.radius;
  y = ring.y - (Math.floor(i/icons_per_row) * ring.vertical_gap) + 1.1;
  z = ring.z + Math.sin(a*Math.PI/180) * ring.radius;
  return new THREE.Vector3( x, y, z );
}
function getGridRotation150(i, fov, angular_gap) {
  var a = (i*angular_gap)%fov + (180 + (90 - fov/2) + angular_gap/2);
  return new THREE.Vector3( 0, 90-a, 0 );
}
