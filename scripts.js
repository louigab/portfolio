// 3D stars
let scene, camera, renderer, stars;
let currentSpeed = 0.05; 
const finalSpeed = 0.001;
const slowdownFactor = 0.95;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    let starGeometry = new THREE.BufferGeometry();
    let starVertices = [];
    let numStars = 500000;

    let spreadX = 5000; 
    let spreadY = 50000; 
    let spreadZ = 5000; 

    for (let i = 0; i < numStars; i++) {
        let x = (Math.random() - 0.5) * spreadX;
        let y = (Math.random() - 0.5) * spreadY;
        let z = (Math.random() - 0.5) * spreadZ;
        starVertices.push(x, y, z);
    }

    starGeometry.setAttribute("position", new THREE.Float32BufferAttribute(starVertices, 3));

    let starTexture = new THREE.TextureLoader().load("icons-logos/star.png");

    let starMaterial = new THREE.PointsMaterial({
        map: starTexture,
        size: 5,
        transparent: true,
        depthWrite: false,
    });

    stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    camera.position.z = 1000;
}

function animate() {
    requestAnimationFrame(animate);
    
    if (currentSpeed > finalSpeed) {
        currentSpeed *= slowdownFactor;
    } else {
        currentSpeed = finalSpeed;
    }
    
    stars.rotation.y += currentSpeed;
    renderer.render(scene, camera);
}

window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

init();
animate();

// Dark Mode/Light Mode 
function changeMode() {
    document.body.classList.toggle("mode");
    let modeBtn = document.getElementById("ModeBtn");

    if (document.body.classList.contains("mode")) {
        modeBtn.src = "icons-logos/sun.png";
        localStorage.setItem("mode", "light");
    } else {
        modeBtn.src = "icons-logos/moon.png";
        localStorage.setItem("mode", "dark");
    }
}

function initializeMode() {
    const savedMode = localStorage.getItem("mode");
    const modeBtn = document.getElementById("ModeBtn");
    
    if (savedMode === "light") {
        document.body.classList.add("mode");
        modeBtn.src = "icons-logos/sun.png";
    } else {
        document.body.classList.remove("mode");
        modeBtn.src = "icons-logos/moon.png";
    }
}
document.addEventListener("DOMContentLoaded", initializeMode);

// Hamburger Menu
function toggleMenu() {
    document.getElementById("mobile-menu").classList.toggle("hidden");
}

// Certificate Modal
const modal = document.getElementById('certificateModal');
const modalImg = document.getElementById('modalImage');
const certificateImages = document.querySelectorAll('.certificate-img');

certificateImages.forEach(img => {
    img.addEventListener('click', () => {
        modalImg.src = img.src;
        modalImg.alt = img.alt;
        modal.classList.remove('hidden');
    });
});

modal.addEventListener('click', () => {
    modal.classList.add('hidden');
});
