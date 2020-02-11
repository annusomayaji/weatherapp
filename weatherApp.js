
$(document).ready(function(){
	
	});	
	
function getCurrentWeather(){	
	var bannerElement=$(".banner")[0];
	var iconElement=$("#weather_icon").prop('src');
	var notificationElement=$(".notification")[0];
	var temperatureElement=$(".temperature p")[0];
	var descriptionElement=$(".description p")[0];    //var descriptionElement=document.querySelector(".description p");   (javascript equivalent)
	var locationElement=$(".location p")[0];
	const key="b3a62f27b608a0cc3e00e05fb21ed5cd";
	const weatherData={};
	console.log((bannerElement));
	
	
	//set current location using geolocation service or show error
	if (navigator.geolocation){
		navigator.geolocation.getCurrentPosition(setPosition, showError); 
	}
	else{
		
		descriptionElement.innerHTML="<p>Geolocation not supported<p>";
	}
	
	function setPosition(position){
		let latitude=position.coords.latitude;
		let longitude=position.coords.longitude;
		console.log(latitude);
		console.log(longitude);
		
		getWeather(latitude,longitude);
	}
	
	function showError(error){
		//console.log(error.message);
		notificationElement.innerHTML=`${error.message}`;
		$(".getCurrentWeather")[0].innerHTML="Try again";
	}
	
	//ajax request to weather API
	
	/*$.get("todo.docx", function(data,status){
		alert(data);
	});*/
	
	function getWeather(latitude,longitude){
		let api=`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${key}` ;
		
		console.log(api);
		fetch(api).then(function(response){
			var data=response.json();
			console.log(data);
			return data;
		}).then(function(data){
			
			weatherData.city=data.name;
			weatherData.temperature=data.main.temp;
			var weathertype=data.weather[0].description;
			weatherData.description=weathertype.charAt(0).toUpperCase()+weathertype.slice(1); //capitalize first letter of weather description
			var weatherIcon=data.weather[0].icon;
			weatherData.icon="http://openweathermap.org/img/w/" + weatherIcon + ".png";
			console.log(weatherData.icon);
			return 	weatherIcon;		
		}).then(function(){
			displayWeather();
			
		});
		
	
	}
		function displayWeather(){
			$(".banner").hide();
			$(".getCurrentWeather")[0].innerHTML="";
			notificationElement.innerHTML="";
			locationElement.innerHTML=weatherData.city;
			temperatureElement.innerHTML=Math.round(weatherData.temperature-273.15)+"&deg;C";// convert Kelvin to Celcius and round the result. 
			descriptionElement.innerHTML=weatherData.description;
			
			//$('.location').html(weatherData.city);
			//$('.temperature').html(weatherData.temperature);
			//$('.description').html(weatherData.description);
			$('#weather_icon').prop('src', weatherData.icon);
			console.log(weatherData.icon);			// Set the property and value: $(selector).prop(property, value) 
			
		}
	
}


//weather forecast page

function getForecast(){	
		const weatherData={};
		const key="b3a62f27b608a0cc3e00e05fb21ed5cd";
		var cityName=$("#city")[0].value;
		console.log(cityName);
		let api=`http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&cnt=7&mode=json&APPID=${key}` ; //requesting weather data from API by passing city name.
		console.log(api);
		fetch(api).then(function(response){
		var data=response.json();
		console.log(data);
		return data;
	}).then(function(data){
		
		
		var forecastTable="";
		var d = new Date();
		var j=0;
		console.log(d);
		var weekday=new Array(7);
		weekday[0]="Sunday";
		weekday[1]="Monday";
		weekday[2]="Tuesday";
		weekday[3]="Wednesday";
		weekday[4]="Thursday";
		weekday[5]="Friday";
		weekday[6]="Saturday";
		for(var i=0;i<data.list.length;i++){
			
			forecastTable += "<tr class='border_bottom'>";
			
			
			
			if (d.getDay()+i<7)
			forecastTable += "<td>" + weekday[d.getDay()+i] + "</td>";
			if (d.getDay()+i>=7)   // when the end of the array is reached, counter variable j (line 109)is used to iterate from the beginning of the array.
			{
				
				forecastTable += "<td>" + weekday[j] + "</td>";
				j++;
			}
			forecastTable += "<td>" + Math.round(data.list[i].main.temp-273.15)+ "&deg;C" + "</td>";
			/*forecastTable += "<td>" + data.list[i].weather[0].icon + "</td>";*/ 
			forecastTable += "<td>" + '<img src="' +"http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + '.png" />' + "</td>";
			forecastTable += "<td>" + data.list[i].weather[0].description + "</td>";
			forecastTable += "</tr>";
			
		}
		$("#forecast-data").html(forecastTable);
		
		
	}).then(function()
	{
		
	});
		
		
	}



function expandfunction(){	

	var x=$("#navigationBar")[0];  //JQuery equivalent to document.getElementById("navigationBar")
									// $(~id) returns JQuery object. $(#id)[0] returns the underlying DOM object.
	if (x.className=="navigation")
	{
	x.className += " responsive";
	}
	else{
	x.className = "navigation";
	}

}


