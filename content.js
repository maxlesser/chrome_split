
	var el = document.getElementsByClassName('photoPageNextNav');
	if (el.item(0) != null){
		el.item(0).addEventListener("click", sexypants, false);
	}
	

	var el2 = document.getElementsByClassName('photoPagePrevNav');
	if (el2.item(0) != null){
		el2.item(0).addEventListener("click", sexypants, false);
	}

sexypants();


function sexypants(){
	var allImages = $( "img" );
	var x;

for (x = 0; x < allImages.length; x += 1)
{
	var request = "https://lambda-face-detection-and-recognition.p.mashape.com/detect?images=" + allImages[x].src;

	// put a mustache image here
	$(allImages[x]).replaceWith("<div style='float:left'><img src='http://i.imgur.com/FoyEVvt.png' id='" + allImages[x].src + 
		"' style='display:none; z-index:1000; background:none; border:none; -webkit-box-shadow:none; box-shadow:none; height:auto; min-height:0px'></img>" + allImages[x].outerHTML + "</div>");

	$.ajax({
		url: request,
		type: 'GET',
		dataType: 'json',
		success: function(data) 
		{ 
			console.log(data);
			if (data.photos && data.photos[0] && data.photos[0].tags.length != 0){
				console.log("successful detection of mustache");
				console.log(data.images[0]);
				var cur = data.images[0].replace(/\ /g, '%20');
				console.log(data.images[0]);

				if (document.getElementById(cur)) {
					var actualImage = $('img[src="' + data.images[0] + '"]');
					if (!actualImage[0]) {
						actualImage = $('img[src="' + data.images[0].replace("http:", "") + '"]');
						//console.log("returning here");
						//return;
					}

					document.getElementById(cur).style.display = 'inline-block';
					document.getElementById(cur).style.position = 'absolute';
					document.getElementById(cur).style.marginLeft = -data.photos[0].width + "px";

					var ratioX = actualImage[0].width / data.photos[0].width;
					var ratioY = actualImage[0].height / data.photos[0].height;
					console.log($('img[src="' + cur + '"]'));
					console.log(ratioX);
					console.log(ratioY);

					var width = (data.photos[0].tags[0].mouth_right.x - data.photos[0].tags[0].mouth_left.x) * ratioX * 3;

					document.getElementById(cur).style.width = width + "px";
					var mouthAvgX = (data.photos[0].tags[0].mouth_center.x + data.photos[0].tags[0].mouth_left.x + data.photos[0].tags[0].mouth_right.x) / 3 * ratioX;
					var mouthAvgY = (data.photos[0].tags[0].mouth_center.y + data.photos[0].tags[0].mouth_left.y + data.photos[0].tags[0].mouth_right.y) / 3 * ratioY;
					var YVALUE = data.photos[0].tags[0].nose.y * ratioY;
					document.getElementById(cur).style.marginLeft =  (mouthAvgX - (width/2)) + "px";

					document.getElementById(cur).style.marginTop = YVALUE + "px";
				}
			}
		},
		error: function() {  },
		beforeSend: setHeader
	});

	function setHeader(xhr) {
		xhr.setRequestHeader('X-Mashape-Authorization', 'E4SntsExPG3lTSYKunjBQmVMJIbMtHFc');
	}
}

}





