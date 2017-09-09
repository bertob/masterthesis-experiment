AFRAME.registerComponent("card-space", {
  schema: {
    size: {type: "int"},

  },
  init: function () {

    if (this.data.size <= 50) {
      // 20 or 50 elements case

      for (var i=0; i<this.data.size; i++) {
        var card = document.createElement("a-entity");

        if (this.data.size <= 20) {
          card.setAttribute("card", "id: " + conditions.p20[i]);
          card.setAttribute("position", getGridPosition20(i));
        }
        else if (this.data.size <= 50) {
          card.setAttribute("card", "id: " + conditions.p50[i]);
          card.setAttribute("position", getGridPosition50(i));
        }

        this.el.appendChild(card);
      }

    }
    else {
      // 250 elements case

      for (var i=0; i<this.data.size; i++) {
        var parentPanelId = Math.floor(i/50);
        var parentPanel = document.getElementById("panel-" + parentPanelId);

        var card = document.createElement("a-entity");
        card.setAttribute("card", "id: " + conditions.p250[i]);
        card.setAttribute("position", getGridPosition250(i, parentPanelId));

        parentPanel.appendChild(card);
      }

    }

  }
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

function getGridPosition250 (index, parentPanelId) {
  var columns = 5;
  var gap = 0.02;

  var relative_index = index - (parentPanelId*50)

  var row_width = (columns * card_w) + ((columns - 1) * gap);
  var base_x = -1 * (row_width / 2);
  var base_y = 2;
  var base_z = z_offset;

  var x = base_x + (relative_index % columns) * (card_w + gap);
  var y = base_y - Math.floor(relative_index / columns) * (card_h + gap);
  var z = base_z;

  return new THREE.Vector3( x, y, z );
}
