var degC = true;

function updateElements() {
    console.log("Update!");

    document.getElementById("bg").src = "../img/"+city+".jpg";
    
    if(degC) {
        document.getElementById("value").innerHTML = temp + "°C";
    } else {
        document.getElementById("value").innerHTML = (temp*9/5)+32 + "°F";
    }

    //Dynamic web part
    if(temp > 20) {
        document.getElementById("icon").style.fill = "gold";
    }

    if(foundCity=="false") {
        document.getElementById("error-msg").style.visibility = "visible";
        document.getElementById("menu").style.visibility = "hidden";
    } else {
        //Hide error message + show results
        document.getElementById("error-msg").style.visibility = "hidden";
        document.getElementById("menu").style.visibility = "visible";
    }
}

function toggleFormat() {
    console.log("Test")
    degC = !degC;
    document.getElementById("celsius-btn").innerHTML = degC ? "Celsius" : "Fahrenheit";
    updateElements();
}