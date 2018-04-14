$(document).ready(function(){
	vedioOpen();
	screenShot();
});

function vedioOpen(){
	var video = document.getElementById('video');

	// Get access to the camera!
	if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
	    // Not adding `{ audio: true }` since we only want video now
	    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
	        video.src = window.URL.createObjectURL(stream);
	        video.play();
	    });
	}
}

function screenShot(){
	// Elements for taking the snapshot
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');
	var video = document.getElementById('video');

	c2 = document.getElementById('c2');
    ctx2 = c2.getContext('2d');

	// Trigger photo take
	document.getElementById("snap").addEventListener("click", function() {
		context.drawImage(video, 0, 0, 640, 480);
		let frame = context.getImageData(0, 0, 960,720);

	    console.log(frame);
	    ctx2.putImageData(frame, 0, 0);
		UploadOnData(frame);
	});
}

function GetServerUrl(){
	return "http://localhost";
}

// function AjaxGet(apiUrl,callback){
// 	$(document).ready(function(){
// 		$.ajax({
// 			type: "GET",
// 			url: apiUrl,
// 			success: function(msg){
// 				callback(msg);
// 			},
// 		   	error: function(xhr, textStatus, error){
// 		        console.log(xhr.statusText);
// 		   	}
// 		});
// 	});
// }

function AjaxPost(apiUrl,postData,callback,errorCallback=DefaultErrorCallback){
	$(document).ready(function(){ 
		$.ajax({
			type: "POST",
			url: apiUrl,
			data: postData,
			success: function(msg){
				callback(msg);
			},
		   	error: function(xhr, textStatus, error){
		        errorCallback(xhr, textStatus, error);
		   	}
		});
	});
}

function DefaultErrorCallback(xhr, textStatus, error){
	console.log(xhr.statusText);
}

function UploadOnData(video){
	var apiUrl = GetServerUrl() + "/image/pic";
	var callback = function(msg){
	}
	AjaxPost(apiUrl,video,callback);
}
