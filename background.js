var allImages = $( "img" );
var x;

for (x = 0; x < allImages.length; x += 1)
{
	var request = "https://lambda-face-detection-and-recognition.p.mashape.com/detect?images=" + allImages[x].src;

	// put a mustache image here
	$(allImages[x]).replaceWith("<div>" + allImages[x].outerHTML + "<img src='http://i.imgur.com/FoyEVvt.png' id='" + allImages[x].src + "' style='display:none'></img></div>");

	$.ajax({
		url: request,
		type: 'GET',
		dataType: 'json',
		success: function(data) 
		{ 
				console.log(data);
			if (data.photos[0].tags.length != 0){
				console.log("successful detection of mustache");
				var cur = data.images[0].replace(/\ /g, '%20');
				document.getElementById(cur).style.display = 'inline-block';
				document.getElementById(cur).style.position = 'absolute';
				document.getElementById(cur).style.marginLeft = -data.photos[0].width + "px";
				var width = (data.photos[0].tags[0].mouth_right.x - data.photos[0].tags[0].mouth_left.x) * 3.5;
				var height = data.photos[0].height*(width/data.photos[0].width);
				document.getElementById(cur).style.width = width + "px";
				var XVALUE = data.photos[0].tags[0].mouth_center.x - (width/2);
				var YVALUE = data.photos[0].tags[0].mouth_center.y -height/3;
				document.getElementById(cur).style.marginLeft = -data.photos[0].width + XVALUE + "px";
				document.getElementById(cur).style.marginTop = YVALUE + "px";
			}
		},
		error: function() {  },
		beforeSend: setHeader
	});

	function setHeader(xhr) {
		xhr.setRequestHeader('X-Mashape-Authorization', 'E4SntsExPG3lTSYKunjBQmVMJIbMtHFc');
	}
}
