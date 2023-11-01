const myVideo = document.querySelector('#myVideo');
const myCanvas = document.querySelector('#myCanvas');
const cameraBtn = document.querySelector('#cameraBtn');
const btnReturn = document.querySelector('#btnReturn');
const shootBtn = document.querySelector('#shootBtn');

const constraints = {
    video: {
        width: { ideal: 1280 },
        height: { ideal: 720 },
        facingMode: { exact: "environment" }
    }
};

// navigator.mediaDevices.getUserMedia({ video: true});

navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
    myVideo.srcObject = stream;
});

// start the program
myCanvas.style.display = "none"
myVideo.style.display = "none"
shootBtn.style.display = "none"
btnReturn.style.display = "none"
cameraBtn.style.display = "block"

cameraBtn.addEventListener( "click", () => {
    activateCamera();

    myCanvas.width = myVideo.videoWidth*0.5;
    myCanvas.height = myVideo.videoHeight*0.5;
    myCanvas.getContext('2d').drawImage(myVideo, 0, 0);
});

// alert("Hello");
shootBtn.addEventListener( "click", () => {
    myVideo.style.dispay = "none";
    myCanvas.style.display = "block";
    btnReturn.style.display = "block";
    cameraBtn.style.display = "none";

    myCanvas.toDataURL()

});

btnReturn.addEventListener( "click", () => {
    myVideo.style.dispay = "block";
    myCanvas.style.dispay = "none";
    btnReturn.style.display = "none";
    cameraBtn.style.display = "none";

})

function activateCamera() {
    cameraBtn.style.display = "none";
    btnReturn.style.display = "block";
    shootBtn.style.display = "block";
    myVideo.style.display = "block";
    myCanvas.style.display = "none";
}

function desactivateCamera(myVideo) {
    myVideo.style.dispay = "block";
    myCanvas.style.dispay = "none";
    btnReturn.style.display = "none";
    cameraBtn.style.display = "none";
    shootBtn.style.display = "none";

    
    myVideo.srcObject.getTracks().forEach(track => track.stop());
}

// function whereAmI() {
//     var map = L.map('map').setView([51.505, -0.09], 13);

//     L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         maxZoom: 19,
//         attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//     }).addTo(map);
// }

// const whereAmIBtn = document.querySelector('#posNow');
// whereAmIBtn.addEventListener('click', whereAmI);