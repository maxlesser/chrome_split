

chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.method == "getState") {
    	chrome.storage.local.get('stache', function(result){
        	sendResponse(result.stache);
    	});
    } else if (message.method == "setState") {
    	chrome.storage.local.set({'stache': message.isDisabled});
	} else {
      sendResponse(false);
    }
    return true;
});