
	var el = document.getElementsByClassName('photoPageNextNav');
	if (el.item(0) != null){
		el.item(0).addEventListener("click", sexypants, false);
	}
	

	var el2 = document.getElementsByClassName('photoPagePrevNav');
	if (el2.item(0) != null){
		el2.item(0).addEventListener("click", sexypants, false);
	}

chrome.extension.sendMessage({method: "getLocalStorage"}, sexypants);

function sexypants(isDisabled){
	if(document.domain == 'www.youtube.com')
		return;

	if (isDisabled) {
		return;
	}

	var allImages = $( "img" );

	//allImages += $("div:has(img)");

	var x;
console.log(allImages.length);
for (x = 0; x < allImages.length; x += 1)
{
	if(allImages[x].width < 35 || allImages[x].height < 35)
		continue;

	var request = "https://lambda-face-detection-and-recognition.p.mashape.com/detect?images=" + allImages[x].src;

	// put a mustache image here
	$(allImages[x]).replaceWith("<div><img src='http://i.imgur.com/FoyEVvt.png' id='" + allImages[x].src + 
		"' style='display:none; z-index:1000; background:none; border:none; -webkit-box-shadow:none; " + 
		"text-align:left; float:left; box-shadow:none; height:auto; width:auto; min-width:0px; min-height:0px'></img>" + allImages[x].outerHTML + "</div>");

	$.ajax({
		url: request,
		type: 'GET',
		dataType: 'json',
		success: function(data) 
		{ 
			if (data.photos && data.photos[0] && data.photos[0].tags.length != 0){
				console.log("successful detection of mustache");
				//console.log(data.images[0]);
				var cur = data.images[0].replace(/\ /g, '%20');
				//console.log(data.images[0]);

				if (document.getElementById(cur)) {
					var actualImage = $('img[src="' + data.images[0] + '"]');
					if (!actualImage[0]) {
						actualImage = $('img[src="' + data.images[0].replace("http:", "") + '"]');
						if(!actualImage[0])
							return;
					}
					
					var mouthAvg = (data.photos[0].tags[0].mouth_left.x + data.photos[0].tags[0].mouth_right.x) / 2;
					var eyeAvg = (data.photos[0].tags[0].eye_left.x + data.photos[0].tags[0].eye_right.x) / 2;
					var mouthDiff = Math.abs(data.photos[0].tags[0].mouth_left.x - data.photos[0].tags[0].mouth_right.x);
					//console.log(Math.abs(mouthAvg - eyeAvg));
					//console.log(mouthDiff);

					if(Math.abs(mouthAvg - eyeAvg) > mouthDiff/5)
					{
						return;
					}
					document.getElementById(cur).style.marginLeft = -data.photos[0].width + "px";

					//console.log(actualImage);
					var ratioX = actualImage[0].width / data.photos[0].width;
					var ratioY = actualImage[0].height / data.photos[0].height;
					//console.log(ratioX);
					//console.log(ratioY);

					var width = (data.photos[0].tags[0].mouth_right.x - data.photos[0].tags[0].mouth_left.x) * ratioX * 3;

					document.getElementById(cur).style.width = width + "px";
					var mouthAvgX = (data.photos[0].tags[0].mouth_center.x + data.photos[0].tags[0].mouth_left.x + data.photos[0].tags[0].mouth_right.x) / 3 * ratioX;
					var mouthAvgY = (data.photos[0].tags[0].mouth_center.y + data.photos[0].tags[0].mouth_left.y + data.photos[0].tags[0].mouth_right.y) / 3 * ratioY;
					var YVALUE = data.photos[0].tags[0].nose.y * ratioY;

					document.getElementById(cur).style.marginLeft =  (mouthAvgX - (width/2)) + "px";
					document.getElementById(cur).style.marginTop = YVALUE + "px";

					if(YVALUE > actualImage[0].height || (mouthAvgX - (width/2)) > actualImage[0].width || YVALUE < 0 || (mouthAvgX - (width/2)) < 0)
						return;

					document.getElementById(cur).style.display = 'inline-block';
					document.getElementById(cur).style.position = 'absolute';
				}
			}
		},
		error: function() {  },
		beforeSend: setHeader
	});

	function setHeader(xhr) {
		xhr.setRequestHeader('X-Mashape-Authorization', 'XeUhzwVKif8G2DoVGhDuJ791hTW9bBxC');
	}
}

}





