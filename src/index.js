import * as THREE from '../src/modules/three.module.js'
import { gsap } from '../node_modules/gsap/gsap-core.js'
import { OrbitControls } from '../src/modules/OrbitControls.js'
import { GUI } from '../node_modules/dat.gui/build/dat.gui.module.js'
import { RGBELoader } from '../src/modules/RGBELoader.js'
import { GLTFLoader } from '../src/modules/GLTFLoader.js'

// Instantiate a loader
const loader = new GLTFLoader()

// ----------------- Canvas 1-----------------

const canvas_1 = document.querySelector('canvas.canvas-1')

// ----------------- Scene -----------------

const scene = new THREE.Scene()


// ----------------- Sizes -----------------

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// ----------------- Camera -----------------

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
camera.position.x = -1.5
camera.position.y = 1.5
camera.position.z = 5

// ----------------- Lights -----------------



// ----------------- 3d models -----------------

// const gltfLoader = new GLTFLoader()


// ----------------- Render -----------------

const renderer = new THREE.WebGLRenderer({
    canvas: canvas_1,
    antialias: true,
    alpha: true
})

renderer.setSize(sizes.width, sizes.height)
document.body.appendChild(renderer.domElement)

// ----------------- Mesh -----------------

const geometry = new THREE.BoxGeometry(2, 2, 2)

const material = new THREE.MeshBasicMaterial({
    color: 0x7161F5
})
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

// ----------------- Helpers -----------------

const gridHelper = new THREE.GridHelper(10, 10);
scene.add(gridHelper);
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// ----------------- Loop -----------------

function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
}
animate();

// ----------------- Resize -----------------

function onWindowResize() {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
}
window.addEventListener('resize', onWindowResize, false);