// global navigation between steps
var globalIndex = 0;

document.getElementById("left-hand").addEventListener("trackpadup", function() {
  console.log("NEXT STEP");
  globalIndex++;
  // document.getElementById("step-container").setAttribute("position", new THREE.Vector3( globalIndex*(-5), 0, 0 ));
  document.getElementById("step-container").setAttribute("animation__move", {
    "property": "position",
    "dir": "alternate",
    "dur": 800,
    "easing": "easeOutElastic",
    "to": new THREE.Vector3( globalIndex*(-5), 0, -1 ),
  });
});
document.getElementById("left-hand").addEventListener("menuup", function() {
  console.log("PREV STEP");
  globalIndex--;
  // document.getElementById("step-container").setAttribute("position", new THREE.Vector3( globalIndex*(-5), 0, 0 ));
  document.getElementById("step-container").setAttribute("animation__move", {
    "property": "position",
    "dir": "alternate",
    "dur": 800,
    "easing": "easeOutElastic",
    "to": new THREE.Vector3( globalIndex*(-5), 0, -1 ),
  });
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
