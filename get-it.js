// Written By Elias Kraihanzel
//
// This code sends an image to a server that can run the image through 
// a model and return what building is in the image 

$(document).ready(function(){
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
