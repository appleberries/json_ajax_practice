// https://learnwebcode.github.io/json-example/animals-1.json
// XMLHttpRequest - establish a connection to a url that we specify and let us send or receive dat
var btn = document.getElementById("btn");
var animalContainer = document.getElementById("animal-info");
var hr = document.getElementById("hr");
var pageCounter = 1;

btn.addEventListener("click", function(){ // anonymous function, not named
	var ourRequest = new XMLHttpRequest(); // new instance
	// 1st arg: send or receive data (get/post). 2nd arg: URL. also dynamic, used pageCounter    
	ourRequest.open('GET', 'https://learnwebcode.github.io/json-example/animals-'+ pageCounter +'.json');  

	ourRequest.onload = function(){
		if(ourRequest.status >= 200 && ourRequest.status < 400){
			//console.log(ourRequest.responseText); // at this point, we've defined our request
			var ourData = JSON.parse(ourRequest.responseText); // store to a variable and treat it as JSON not string
			//console.log(ourData[0]);
			renderHTML(ourData); // call renderHTML function and pass ourData 
		}else{
			// what should happen if server fails???
			// kaw na bahala lol
			//console.log("Server Error");
		}
	};

	ourRequest.onerror = function(){
		// what should happen if connection fails???
		// kaw na bahala lol
		//console.log("Connection Error"); 
	}
	ourRequest.send(); // send the request
	pageCounter++;

	if(pageCounter > 3){
		btn.classList.add("hide-me");
	}
});

function renderHTML(data){ // function that creates html
	var htmlString = "";

	for(i = 0; i < data.length; i++){
		htmlString += "<p>" + data[i].name + " is a " + data[i].species + " that likes to eat ";

		for(j = 0; j < data[i].foods.likes.length; j++){
			if(j == 0){
				htmlString += data[i].foods.likes[j];
			}else{
				htmlString += " and " + data[i].foods.likes[j];
			}
		}
		htmlString += " and dislikes ";

		for(j = 0; j < data[i].foods.dislikes.length; j++){
			if(j == 0){
				htmlString += data[i].foods.dislikes[j];
			}else{
				htmlString += " and " + data[i].foods.dislikes[j];
			}
		}
		htmlString += ".</p>"
	}
	animalContainer.insertAdjacentHTML('beforeend', htmlString);
}

