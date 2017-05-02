$(document).ready(function(){

//     IJS.load('north.jpg').then(function(image) {
//		image = image.grey();
//
//		image = image.scale({width: 500, height: 500});
//		
//		//		$("#my_div").html(image.getCanvas());
//	})
//	
	var base64file;

	$("#submit").click(function () {
		get_picture($("#chooser").val())
	})
	
	function get_picture(picture)
	{
		var request = new XMLHttpRequest();   
		request.onload = function() {
			var file = new FileReader();
		 	file.onloadend = function() {
				base64file = file.result;
				//console.log(base64file)
				send_pic()
			}
			file.readAsDataURL(request.response);   
		};   
					 
		request.open('GET', picture + '.jpg');   
		request.responseType = 'blob';              
		request.send(); 
	}
	
	function send_pic()
	{
		$.ajax({
			headers: {
				"Access-Control-Allow-Origin"  : "*"
			},
			method: "post",
			//contentType: 'application/json',
			
			url: "http://54.243.1.4:8080/",
			//url:"http://localhost:3000",
			crossDomain:true,
			success: function(result){
				//console.log(result);
				$("#my_div").html(result.building)
			},
			error: function(error){
				console.log(error);
			},
			
		
			data: {"image": base64file}
		});
	}
	
				
	
});
