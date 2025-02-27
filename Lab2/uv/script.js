function updateElements() {
    console.log("Update!");
    document.getElementById("value").innerHTML = uv;

    //Dynamic web part
    if(uv > 10) {
        document.getElementById("icon").style.stroke = "red";
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