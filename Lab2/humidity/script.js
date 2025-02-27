function updateElements() {
    console.log("Update!");
    document.getElementById("value").innerHTML = humidity;

    //Dynamic web part
    if(humidity > 0.5) {
        document.getElementById("icon").style.fill = "blue";
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