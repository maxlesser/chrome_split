function setEnabled() {
  chrome.runtime.sendMessage({method: "setLocalStorage", isDisabled: false});
};

function setDisabled() {
  chrome.runtime.sendMessage({method: "setLocalStorage", isDisabled: true});
};