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

console.save = function(data, filename) {

  if (!data) {
    console.error('Console.save: No data');
    return;
  }

  if (!filename) filename = 'console.json';

  if (typeof data === "object") {
    data = JSON.stringify(data, undefined, 4);
  }

  var blob = new Blob([data], {type: 'text/json'});
  var e = document.createEvent('MouseEvents');
  var a = document.createElement('a');

  a.download = filename;
  a.href = window.URL.createObjectURL(blob);
  a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':');
  e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  a.dispatchEvent(e);
}
