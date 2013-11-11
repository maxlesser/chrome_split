
var enableButton = document.getElementById("enable");
enableButton.addEventListener("click", function() {
  chrome.extension.sendMessage({method: "setLocalStorage", isDisabled: false});
});

var disableButton = document.getElementById("disable");
disableButton.addEventListener("click", function() { 
  chrome.extension.sendMessage({method: "setLocalStorage", isDisabled: true});
});


// if(enableButton.addEventListener){
//          enableButton.addEventListener("click", function() { alert("alert");});
//     } else {
//          enableButton.attachEvent("click", function() { alert("alert");});
//     };
// };

// console.log("done");

// enableStaches: function() {
  
//   alert("enabling");
//   console.log("enabling");
//   chrome.runtime.sendMessage({method: "setLocalStorage", isDisabled: false});
// };

// disableStaches: function() {
  
//   alert("enabling");
//   console.log("enabling");
//   chrome.runtime.sendMessage({method: "setLocalStorage", isDisabled: true});
// };