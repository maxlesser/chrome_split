

chrome.extension.onRequest.addListener(function(request, sendResponse) {
    if (request.method == "getLocalStorage") {
    	chrome.storage.local.get('stache-disabled', function(result){
        	sendResponse(result.stache-disabled);
    	});
    } else if (request.method == "setLocalStorage") {
    	chrome.storage.local.set({'stache-disabled': request.isDisabled});
	} else {
      sendResponse(false); // snub them.
    }
});