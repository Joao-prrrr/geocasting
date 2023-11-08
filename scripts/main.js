const myVideo = document.querySelector('#myVideo');
const myCanvas = document.querySelector('#myCanvas');
const cameraBtn = document.querySelector('#cameraBtn');
const btnReturn = document.querySelector('#btnReturn');
const shootBtn = document.querySelector('#shootBtn');
const switchCamera = document.querySelector('#switchCamera');

const constraints = {
    video: {
        width: { ideal: 1920 },
        height: { ideal: 1080 },
        facingMode: { exact: "user" }
    }
};

// navigator.mediaDevices.getUserMedia({ video: true});


// start the program
myCanvas.style.display = "none"
myVideo.style.display = "none"
shootBtn.style.display = "none"
btnReturn.style.display = "none"
switchCamera.style.display = "none"
cameraBtn.style.display = "block"

window.addEventListener('deviceorientation',  (e) => {
    if(e.alpha == 90 || e.alpha == 270) {
        switchOrientation();
    }
})

cameraBtn.addEventListener( "click", () => {
    activateCamera();
});

shootBtn.addEventListener( "click", () => {
    myCanvas.width = myVideo.videoWidth;
    myCanvas.height = myVideo.videoHeight;
    myCanvas.getContext('2d').drawImage(myVideo, 0, 0);   
    myCanvas.toDataURL()
    desactivate();
});

btnReturn.addEventListener( "click", () => {
    desactivate();
})

switchCamera.addEventListener( "click", fnSwitchCamera)

function switchOrientation() {
    // const myVideo = document.querySelector('#myVideo');
    myVideo.srcObject.getTracks().forEach(track => track.stop());

    constraints = {
        video: {
            width: { ideal: 1920 },
            height: { ideal: 1080 },
            facingMode: constraints.video.facingMode
        }
    }
    
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        myVideo.srcObject = stream;
    });
}

function fnSwitchCamera() {
    const myVideo = document.querySelector('#myVideo');
    
    myVideo.srcObject.getTracks().forEach(track => track.stop());
    constraints.video.facingMode.exact = (constraints.video.facingMode.exact == "user") ? "environment" : "user";
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        myVideo.srcObject = stream;
    });
}

function activateCamera() {
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        myVideo.srcObject = stream;
    });

    cameraBtn.style.display = "none";
    btnReturn.style.display = "block";
    shootBtn.style.display = "block";
    switchCamera.style.display = "block";
    myVideo.style.display = "block";
    myCanvas.style.display = "none";
}

function desactivate() {
    myVideo.srcObject.getTracks().forEach(track => track.stop());

    myVideo.style.display = "none";
    myCanvas.style.display = "block";
    btnReturn.style.display = "none";
    shootBtn.style.display = "none";
    switchCamera.style.display = "none";
    cameraBtn.style.display = "block";
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