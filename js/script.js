// CONTROLLER EVENT LISTENERS
document.getElementById("right-hand").addEventListener("trackpadup", function() {
  // console.log("NEXT STEP");
  document.getElementById("step-container").components.stepcontainer.next();

});
document.getElementById("right-hand").addEventListener("menuup", function() {
  // console.log("PREV STEP");
  document.getElementById("step-container").components.stepcontainer.previous();
});


document.getElementById("right-hand").addEventListener("triggerdown", function() {
  triggerdown = true;
});
document.getElementById("right-hand").addEventListener("triggerup", function() {
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
