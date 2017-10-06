// // CONTROLLER EVENT LISTENERS
document.getElementById("right-hand").addEventListener("trackpadup", function() {
  document.getElementById("step-container").components.stepcontainer.next();

});
document.getElementById("right-hand").addEventListener("menuup", function() {
  document.getElementById("step-container").components.stepcontainer.previous();
});

var othersPaused = false;

document.getElementById("right-hand").addEventListener("triggerdown", function() {
  triggerdown = true;
  if (othersPaused) {
    playAllCards();
  }
});
document.getElementById("right-hand").addEventListener("triggerup", function() {
  triggerdown = false;
});

function exportLogs() {
  var detailedLog = logs;
  var csvLog = convertArrayOfObjectsToCSV(logs);


  console.log("exporting logfiles", logs, csvLog);
  console.save(detailedLog, log.participant + "_detailed.json");
  console.save(csvLog, log.participant + "_simple.csv");

  var csvQuestions = convertArrayOfObjectsToCSV(questionnaires);
  console.log("exporting questionnaires", csvQuestions);
  console.save(csvQuestions, log.participant + "_questions.csv");
}

function convertArrayOfObjectsToCSV(data) {
  var result, ctr, keys, columnDelimiter, lineDelimiter, data;

  if (data == null || !data.length) {
    return null;
  }

  columnDelimiter = ',';
  lineDelimiter = '\n';

  keys = Object.keys(data[0]);

  result = '';
  result += keys.join(columnDelimiter);
  result += lineDelimiter;

  data.forEach(function(item) {
    ctr = 0;
    keys.forEach(function(key) {
      if (ctr > 0) result += columnDelimiter;

      if (key === "errors") {
        result += item.errors.length;
      }
      if (item[key].constructor === Array) {
        item[key].forEach(function(arrItem) {
          result += arrItem + columnDelimiter;
          console.log("result",result);
        });
      }
      else {
        result += item[key];
      }
      ctr++;
    });
    result += lineDelimiter;
  });

  return result;
}

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
