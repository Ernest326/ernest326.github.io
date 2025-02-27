var usingServer = false;

var temp=0;
var humidity=0;
var uv = 0;
var wind = 0;
var foundCity = false;
var city = "";

//Load session storage
function tryLoadValues() {
    temp = sessionStorage.getItem("temp");
    humidity = sessionStorage.getItem("humidity");
    uv = sessionStorage.getItem("uv");
    wind = sessionStorage.getItem("wind");
    city = sessionStorage.getItem("city");
    foundCity = sessionStorage.getItem("foundCity");
    
    if(temp!=null&&humidity!=null&&uv!=null&&wind!=null&&city!=null&&foundCity!=null) {
        updateElements();
        console.log("Found data!");
    }
}

//Switch to server running locally to prevent CORS error
function useServer() {
    usingServer = true;
    return "Using server!";
}

//Submit city and request data
function submit() {

    //Get city name
    var cityName = document.getElementById('city-input').value;
    sessionStorage.setItem("city", cityName);

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
            foundCity = false;
            sessionStorage.setItem("foundCity", false);
        }//City found
        else {

            //Set values
            temp = target.temperatureCelsius;
            humidity = target.humidity;
            uv = target.uvIndex;
            wind = target.windSpeed;
            foundCity = true;

            //Set values in sessionStorage
            sessionStorage.setItem("temp", temp);
            sessionStorage.setItem("humidity", humidity);
            sessionStorage.setItem("uv", uv);
            sessionStorage.setItem("wind", wind);

            updateElements();
            
        }

    
    //Error handling
    }).catch((err) => {
        alert("Error! Cannot fetch data!\n\nERROR: " + err);
    });
}

//Update element values
function updateElements() {

    document.getElementById("temp-value").innerHTML = temp;
    document.getElementById("humidity-value").innerHTML = humidity;
    document.getElementById("uv-value").innerHTML = uv;
    document.getElementById("wind-value").innerHTML = wind;

    if(foundCity==false) {
        document.getElementById("error-msg").style.visibility = "visible";
        Array.from(document.getElementsByClassName("result-box")).forEach((box) => box.style.visibility = "hidden");
    } else {
        //Hide error message + show results
        document.getElementById("error-msg").style.visibility = "hidden";
        Array.from(document.getElementsByClassName("result-box")).forEach((box) => box.style.visibility = "visible");
    }
}

tryLoadValues();