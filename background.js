chrome.omnibox.onInputEntered.addListener(
  function(text) {
    alert('You just typed "' + text + '"');
  });

chrome.omnibox.setDefaultSuggestion(
	{description: 'DESCRIPTION?!?'});