
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
