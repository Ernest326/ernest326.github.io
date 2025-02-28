function updateElements() {
    console.log("Update!");
    document.getElementById("value").innerHTML = wind;
    document.getElementById("bg").src = "../img/"+city+".jpg";
    //Dynamic web part
    if(wind.substring(0, wind.length-2) > 20) {
        document.getElementById("icon").style.fill = "red";
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