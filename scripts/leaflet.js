
var map = L.map('map').setView(getLocation(), 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);



function getLocation() {
    let x = document.getElementById("x");
    x.style.display = "block";
    navigator.geolocation.getCurrentPosition(position => {
        let x = document.getElementById("x");
        x.innerHTML = JSON.stringify({x: position.coords.latitude, y: position.coords.longitude});
    });

    console.log(x.innerHTML);
    let data = x.innerHTML;
    x.style.display = "none";
    return [data.x, data.y];
}