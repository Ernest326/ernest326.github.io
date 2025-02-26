function submit() {
    var city = document.getElementById("city-input").value;
    fetch('./sample.json').then((res) => res.json()).then((data) => {
        console.log(data);
    });
}