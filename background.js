

chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.method == "getLocalStorage") {
    	chrome.storage.local.get('stache', function(result){
        	sendResponse(result.stache);
    	});
    } else if (message.method == "setLocalStorage") {
    	chrome.storage.local.set({'stache': message.isDisabled});
	} else {
      sendResponse(false); // snub them.
    }
    return true;
});