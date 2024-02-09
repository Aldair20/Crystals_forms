import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Sizes
const sizes = {
    width: 450,
    height: 450
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setClearColor(0xffffff); // Color blanco en formato hexadecimal

// Create an OBJ loader
const objLoader = new OBJLoader()

// Container for the objects
const objectsContainer = new THREE.Group();
scene.add(objectsContainer);

let thirdObject = null;
let isThirdObjectVisible = true;

// Load the third OBJ file
objLoader.load(
    'assets/Ejes.obj',
    function (object) {
        thirdObject = object;

        // Ajusta la posición, rotación o escala del tercer objeto si es necesario
        thirdObject.position.set(0, 0, 0);
        thirdObject.scale.set(1, 1, 1);

        // Aplica un material azul translúcido al tercer objeto
        const blueMaterial = new THREE.MeshBasicMaterial({
            color: 0x0000ff, // Azul
            transparent: false, 
            opacity: 1 // Establece la opacidad a 50%
        });

        // Itera a través de los subobjetos y aplica el material
        thirdObject.traverse(child => {
            if (child instanceof THREE.Mesh) {
                child.material = blueMaterial;
            }
        });

        // Oculta inicialmente el tercer objeto
        thirdObject.visible = false;

        // Agrega el tercer objeto cargado al contenedor
        objectsContainer.add(thirdObject);
    },
    // Progreso
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    // Error
    function (error) {
        console.error('Error loading model:', error);
    }
);

// Load the first OBJ file
objLoader.load(
    'assets/24Faces/Tetrahexahedron.obj',
    function (loadedObject) {
        // Ajusta la posición, rotación, o escala del primer objeto si es necesario
        loadedObject.position.set(0, 0, 0);
        loadedObject.scale.set(1, 1, 1);

        // Aplica material al objeto
        const material = new THREE.MeshBasicMaterial({
            color: 0xff0000, // Rojo
            transparent: true, // Habilita transparencia
            opacity: 0.3, // Establece la opacidad a 30%
			side: THREE.DoubleSide // Dibuja el material por ambos lados
        });

        // Itera a través de los subobjetos y aplica el material
        loadedObject.traverse(child => {
            if (child instanceof THREE.Mesh) {
                child.material = material;
            }
        });

        // Agrega el primer objeto cargado al contenedor
        objectsContainer.add(loadedObject);
    },
    // Progreso
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    // Error
    function (error) {
        console.error('Error loading model:', error);
    }
);

// Load the second OBJ file
objLoader.load(
    'assets/24Faces/Tetrahexahedron_A.obj',
    function (secondObject) {
        // Ajusta la posición, rotación o escala del segundo objeto si es necesario
        secondObject.position.set(0, 0, 0);
        secondObject.scale.set(1, 1, 1);

        // Aplica un material negro translúcido al segundo objeto
        const blackMaterial = new THREE.MeshBasicMaterial({
            color: 0x000000, // Negro
            transparent: false, 
            opacity: 1.0, // Establece la opacidad a 100%
			side: THREE.DoubleSide // Dibuja el material por ambos lados
        });

        // Itera a través de los subobjetos y aplica el material
        secondObject.traverse(child => {
            if (child instanceof THREE.Mesh) {
                child.material = blackMaterial;
            }
        });

        // Agrega el segundo objeto cargado al contenedor
        objectsContainer.add(secondObject);
    },
    // Progreso
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    // Error
    function (error) {
        console.error('Error loading model:', error);
    }
);

// Función para mostrar u ocultar el tercer objeto al presionar la tecla 't'
function toggleThirdObject() {
    if (thirdObject) {
        isThirdObjectVisible = !isThirdObjectVisible;
        thirdObject.visible = isThirdObjectVisible;
    }
}

// Event listener para la tecla 't' para mostrar u ocultar el tercer objeto
document.addEventListener('keydown', (event) => {
    if (event.key === 't') {
        toggleThirdObject();
    }
});

// Variables para control de rotación con el mouse
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };

// Event listener para clic del mouse
canvas.addEventListener('mousedown', (event) => {
    isDragging = true;
    previousMousePosition = {
        x: event.clientX,
        y: event.clientY
    };
});

// Event listener para movimiento del mouse
canvas.addEventListener('mousemove', (event) => {
    if (isDragging) {
        const deltaX = event.clientX - previousMousePosition.x;
        const deltaY = event.clientY - previousMousePosition.y;
        
        // Rotar el contenedor de objetos según el movimiento del mouse
        objectsContainer.rotation.x += deltaY * 0.01; // Rotar en el eje X según el movimiento vertical del mouse
        objectsContainer.rotation.y += deltaX * 0.01; // Rotar en el eje Y según el movimiento horizontal del mouse

        previousMousePosition = {
            x: event.clientX,
            y: event.clientY
        };
    }
});

// Event listener para fin del clic del mouse
canvas.addEventListener('mouseup', () => {
    isDragging = false;
});

// Animación de renderizado
var animate = function(){
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
}

animate();
