chrome.omnibox.onInputEntered.addListener(
  function(text) {
    alert('You just typed "' + text + '"');
  });