


var allImages = $( "img" );
var x;

for (x = 0; x < allImages.length; x += 1)
{
	
	 //$(allImages[x]).replaceWith( "<div>Kappi xxx is amazing</div>" );
	 //console.log(allImages[x].src);
	 var request = "https://lambda-face-detection-and-recognition.p.mashape.com/detect?images=" + allImages[x].src;
	 console.log(allImages[x]);


	 // put a mustache image here
	 $(allImages[x]).replaceWith("<div>" + allImages[x].outerHTML + "<img hidden='true' src='' id='" + allImages[x].src + "'></img></div>");
	
	$.ajax({
		url: request,
		type: 'GET',
		dataType: 'json',
		success: function(data) 
		{ 

			// the mustache we need to move based on data
			var mustache = $('#' + data.images[0].src);

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
