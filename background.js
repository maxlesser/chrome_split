


var allImages = $( "img" );
var x;
alert('yo');
console.log("werk");
for (x = 0; x < allImages.length; x += 1)
{
	
	 //$(allImages[x]).replaceWith( "<div>Kappi xxx is amazing</div>" );
	 //console.log(allImages[x].src);
	 var imagay = allImages[x];
	 var request = "https://lambda-face-detection-and-recognition.p.mashape.com/detect?images=" + allImages[x].src;
	 
	
	$.ajax({
		url: request,
		type: 'GET',
		dataType: 'json',
		success: function(data) 
		{ 
			//console.log(imagay);
			//imagay.replaceWith("<div>Kappi is amazing</div>");
			console.log($(allImages[x]));
		},
		error: function() { alert('sadness!'); },
		beforeSend: setHeader
	});

	function setHeader(xhr) {
		xhr.setRequestHeader('X-Mashape-Authorization', 'E4SntsExPG3lTSYKunjBQmVMJIbMtHFc');
	}
}
chrome.browserAction.onClicked.addListener(
  function(text) {
    alert('You just moustached.');
  });