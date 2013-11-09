


var allImages = $( "img" );
var x;
for (x = 0; x < allImages.length; x += 1)
{
	$(allImages[x]).replaceWith( "<div>Kappi is amazing</div>" );
	
	$.ajax({
		url: "https://lambda-face-detection-and-recognition.p.mashape.com/detect?images=http%3A%2F%2Fwww.lambdal.com%2Ftest2.jpg",
		type: 'GET',
		dataType: 'json',
		success: function(data) 
		{ 
			alert('hello!'); 
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