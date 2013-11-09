


var allImages = $( "img" );
var x;

for (x = 0; x < allImages.length; x += 1)
{
	var request = "https://lambda-face-detection-and-recognition.p.mashape.com/detect?images=" + allImages[x].src;

	// put a mustache image here
	$(allImages[x]).replaceWith("<div>" + allImages[x].outerHTML + "<img src='https://h-gvineyards.com/wp-content/uploads/2013/10/moustache_png_by_tatidebieber-d56bqe2.png' id='" + allImages[x].src + "'></img></div>");
	document.getElementById(allImages[x].src).style.display = 'none';

	$.ajax({
		url: request,
		type: 'GET',
		dataType: 'json',
		success: function(data) 
		{ 
			if (data.photos[0].tags.length != 0){
				console.log("SUCCESSS BITCHES");
				document.getElementById(data.images[0]).style.display = 'inline-block';
				//$('#' + data.images[0].src);
			}
			//if (data.photos[0].tags)
			// get location of the face from data
			// move mustache if there is any face data
			// set hidden to false

		},
		error: function() {  },
		beforeSend: setHeader
	});

	function setHeader(xhr) {
		xhr.setRequestHeader('X-Mashape-Authorization', 'E4SntsExPG3lTSYKunjBQmVMJIbMtHFc');
	}
}
