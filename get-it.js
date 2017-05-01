$(document).ready(function(){

//     IJS.load('north.jpg').then(function(image) {
//		image = image.grey();
//
//		image = image.scale({width: 500, height: 500});
//		
//		image = image.sobelFilter({
//			kernelY: [[3],[2],[1]],
//			//channels: .00000001
//			
//		});
//		$("#my_div").html(image.getCanvas());
//	})
//	
//	var base64file;
//	
//	var request = new XMLHttpRequest();   
//	request.onload = function() {
//		var file = new FileReader();
//	 	file.onloadend = function() {
//			base64file = file.result;
//			send_pic()
//		}
//		file.readAsDataURL(request.response);   
//	};   
//				 
//	request.open('GET', 'north.jpg');   
//	request.responseType = 'blob';              
//	request.send(); 
	
	function send_pic()
	{
		$.ajax({
			headers: {
				"Access-Control-Allow-Origin"  : "*"
			},
			method: "post",
			
			url: "http://localhost:3000",
			crossDomain:true,
			success: function(result){
				console.log(result);
				//$("#my_div").html(result)
			},
			error: function(error){
				console.log(error);
			},
			data: {image: base64file}
		});
	}
	
				
	
});
