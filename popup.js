chrome.extension.sendMessage({method: "getState"}, setState);

function setState(state) {
  var text;
  if (state) {
    text = "disabled";
  } else {
    text = "enabled";
  }
  document.getElementById("state").innerHTML = text;
}

var enableButton = document.getElementById("enable");
enableButton.addEventListener("click", function() {
  chrome.extension.sendMessage({method: "setState", isDisabled: false});
  window.close();
});

var disableButton = document.getElementById("disable");
disableButton.addEventListener("click", function() { 
  chrome.extension.sendMessage({method: "setState", isDisabled: true});
  window.close();
});