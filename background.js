var allImages = $( "img" );
var x;

for (x = 0; x < allImages.length; x += 1)
{
	var request = "https://lambda-face-detection-and-recognition.p.mashape.com/detect?images=" + allImages[x].src;

	// put a mustache image here
	$(allImages[x]).replaceWith("<div>" + allImages[x].outerHTML + "<img src='http://i.imgur.com/FoyEVvt.png' id='" + allImages[x].src + "'></img></div>");
	document.getElementById(allImages[x].src).style.display = 'none';
	console.log(allImages[x].src);

	$.ajax({
		url: request,
		type: 'GET',
		dataType: 'json',
		success: function(data) 
		{ 
			if (data.photos[0].tags.length != 0){
				console.log("SUCCESSS BITCHES");
				
				var cur = data.images[0].replace(/\ /g, '%20');
				document.getElementById(cur).style.display = 'inline-block';
				document.getElementById(cur).style.position = 'absolute';
				document.getElementById(cur).style.marginLeft = -data.photos[0].width;
				var width = (data.photos[0].tags[0].mouth_right.x - data.photos[0].tags[0].mouth_left.x) * 2;
				console.log(width);
				var height = data.photos[0].height*(width/data.photos[0].width);
				console.log(height);
				document.getElementById(cur).style.width = width;
				var XVALUE = data.photos[0].tags[0].mouth_center.x - (width/2);
				console.log(XVALUE);
				var YVALUE = data.photos[0].tags[0].mouth_center.y -height/3;
				console.log(YVALUE + "\n\n");
				document.getElementById(cur).style.marginLeft = -data.photos[0].width + XVALUE;
				document.getElementById(cur).style.marginTop = YVALUE;
			}
		},
		error: function() {  },
		beforeSend: setHeader
	});

	function setHeader(xhr) {
		xhr.setRequestHeader('X-Mashape-Authorization', 'E4SntsExPG3lTSYKunjBQmVMJIbMtHFc');
	}
}
