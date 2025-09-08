// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75, 
    window.innerWidth / window.innerHeight, 
    0.1, 
    1000
);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Geometries
const geometries = [
    { geom: new THREE.BoxGeometry(1, 1, 1), color: 0xff0000, position: [-3, 0, 0] },
    { geom: new THREE.SphereGeometry(0.8, 32, 32), color: 0x00ff00, position: [3, 0, 0] },
    { geom: new THREE.ConeGeometry(0.8, 2, 32), color: 0x0000ff, position: [0, 3, 0] },
    { geom: new THREE.CylinderGeometry(0.5, 0.5, 2, 32), color: 0xffff00, position: [0, -3, 0] },
    { geom: new THREE.TorusGeometry(1, 0.3, 16, 100), color: 0xff00ff, position: [0, 0, -3] },
];

const meshes = [];

geometries.forEach(obj => {
    const material = new THREE.MeshStandardMaterial({ color: obj.color });
    const mesh = new THREE.Mesh(obj.geom, material);
    mesh.position.set(...obj.position);
    scene.add(mesh);
    meshes.push(mesh);
});

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// Camera Position
camera.position.z = 10;

// Animation
function animate() {
    requestAnimationFrame(animate);

    meshes.forEach((mesh, index) => {
        mesh.rotation.x += 0.01 + index * 0.005;
        mesh.rotation.y += 0.01 + index * 0.005;
    });

    renderer.render(scene, camera);
}

animate();

// Handle Window Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
