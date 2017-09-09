
var CONDITION_IDS = ["s20", "s50", "s250", "c20", "c50", "c250", "p20", "p50", "p250"];
var CONDITION_SIZE = [20, 50, 250, 20, 50, 250, 20, 50, 250];

var LATIN_SQUARE = [[ 's50', 's20', 'c20', 'c250', 'p50', 'c50', 'p250', 'p20', 's250' ],
                    [ 'p20', 'c250', 'p250', 's50', 'c20', 's20', 'c50', 's250', 'p50' ],
                    [ 's250', 's50', 'c50', 'p20', 'p250', 'c250', 's20', 'p50', 'c20' ],
                    [ 'c50', 'c20', 'p20', 'p250', 's50', 'p50', 's250', 's20', 'c250' ],
                    [ 'c250', 'c50', 'p50', 's20', 's250', 'p250', 'c20', 's50', 'p20' ],
                    [ 'p50', 'p20', 's20', 's250', 'c50', 's50', 'c250', 'c20', 'p250' ],
                    [ 'p250', 'p50', 's50', 'c20', 'c250', 's250', 'p20', 'c50', 's20' ],
                    [ 's20', 'p250', 's250', 'c50', 'p20', 'c20', 'p50', 'c250', 's50' ],
                    [ 'c20', 's250', 'c250', 'p50', 's20', 'p20', 's50', 'p250', 'c50' ]];

var LATIN_SQUARE_ROW = 0;

var conditions = {};
var targets = {};

for (var i=0; i<9; i++) {

  // generate iconset
  var n = CONDITION_SIZE[i];
  var id = CONDITION_IDS[i];
  conditions[id] = randomList(n);

  // generate target iconset
  targets[id] = {
    initial: [],
    repeat: []
  };
  for (var j=0; j<5; j++) {
    // one icon per quintile
    var index = (n/5 * j) + Math.floor(Math.random() * n/5);
    targets[id].initial.push([conditions[id][index],index]);
  }
  // shuffle targets so they are no longer in original order
  targets[id].initial = shuffle(targets[id].initial);

  // avoid having the last target be the first repeat target
  var tmp = targets[id].initial.slice(0,4);
  var first = [tmp[0]];
  var tmp2 = shuffle(targets[id].initial.slice(1,));
  first = first.concat(tmp2);

  // cut off the first 3
  targets[id].repeat = first.slice(0,3);
}

var row = LATIN_SQUARE[LATIN_SQUARE_ROW];
for (i=0; i<row.length; i++) {
  document.getElementById(row[i]).setAttribute("step", "number: " + (i+2));
}


document.getElementById("left-hand").addEventListener("trackpadup", function() {
  console.log("NEXT STEP");
  document.getElementById("step-container").components.stepcontainer.next();

});
document.getElementById("left-hand").addEventListener("menuup", function() {
  console.log("PREV STEP");
  document.getElementById("step-container").components.stepcontainer.previous();
});


document.getElementById("left-hand").addEventListener("triggerdown", function() {
  triggerdown = true;
});
document.getElementById("left-hand").addEventListener("triggerup", function() {
  triggerdown = false;
});

function randomList(length) {
  var list = shuffle(generateList(250));
  return list.slice(0,length-1);
}

function shuffle(array) {
  var i = array.length;
  var j = 0;
  var temp;

  while (i--) {
    j = Math.floor(Math.random() * (i+1));

    // swap randomly chosen element with current element
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function generateList(length) {
  var list = [];
  for (var i=1; i<=length; i++) {
    list.push(i);
  }
  return list;
}


// document.getElementById("left-hand").addEventListener("triggerdown", function() {
//   console.log("TRIGGER DOWN");
//   triggerdownLeft = true;
// });
// document.getElementById("left-hand").addEventListener("triggerup", function() {
//   console.log("TRIGGER UP");
//   triggerdownLeft = false;
// });


// for (var i=0; i<list_length; i++) {
//   var card = document.createElement("a-entity");
//   card.setAttribute("card");
//   card.setAttribute("stacked", "list_position: " + i);
//   document.getElement -
// for (var i=0; i<list_length; i++) {
//   var card = document.createElement("a-entity");
//   card.setAttribute("card");
//   card.setAttribute("stacked", "list_position: " + i);
//   document.getElementById("stack").appendChild(card);
// }
