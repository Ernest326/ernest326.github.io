var usingServer = false;

//Switch to server running locally to prevent CORS error
function useServer() {
    usingServer = true;
    return "Using server!";
}

//Submit city and request data
function submit() {

    //Get city name
    var cityName = document.getElementById('city-input').value;

    //Set new URL values for param
    document.getElementById("temp-btn").href = "./Temperature/index.html?city="+cityName;
    document.getElementById("humidity-btn").href = "./Humidity/index.html?city="+cityName;
    document.getElementById("uv-btn").href = "./UV/index.html?city="+cityName;
    document.getElementById("wind-btn").href = "./Wind/index.html?city="+cityName;

    //Set URL for GET request
    var req_url = "./sample.json";
    if(usingServer) {
        req_url = "http://localhost:3000/"+cityName;
    }

    //Grab JSON data and parse
    fetch(req_url).then((res) => {
        if(res.ok) { //Server found city
            return res.json();
        } else { //If server can't find city (error 404)
            console.log("Server didn't like the data - ERROR:" + res.status);
            return null;
        }
        
    }).then((data) => {
        console.log(data);
        target=null;

        //Find city from local if we arent fetching from server
        if(!usingServer) {
            data.forEach((city) => {
                if(city.cityName == cityName) {
                    target=city;
                }
            });
        }//Otherwise we set target to the data found by server
        else {
            target=data;
        }
        
        //No city found
        if(target == null) {
            //Show error message
            document.getElementById("error-msg").style.visibility = "visible";
            Array.from(document.getElementsByClassName("result-box")).forEach((box) => box.style.visibility = "hidden");
        }//City found
        else {
            //Hide error message + show results
            document.getElementById("error-msg").style.visibility = "hidden";
            Array.from(document.getElementsByClassName("result-box")).forEach((box) => box.style.visibility = "visible");

            document.getElementById("temp-value").innerHTML = target.temperatureCelsius;
            document.getElementById("humidity-value").innerHTML = target.humidity;
            document.getElementById("uv-value").innerHTML = target.uvIndex;
            document.getElementById("wind-value").innerHTML = target.windSpeed;
        }

    
    //Error handling
    }).catch((err) => {
        alert("Error! Cannot fetch data!\n\nERROR: " + err);
    });
}