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

var row = LATIN_SQUARE[LATIN_SQUARE_ROW];
for (i=0; i<row.length; i++) {
  console.log("3905349580340895345089", i, row[i]);
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
  // console.log("GRIP DOWN");
  triggerdown = true;
});
document.getElementById("left-hand").addEventListener("triggerup", function() {
  // console.log("GRIP UP");
  triggerdown = false;
});

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
