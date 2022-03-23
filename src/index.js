import * as THREE from '../src/modules/three.module.js'
// import { gsap } from '../node_modules/gsap/dist/gsap.js'
import {
    OrbitControls
} from '../src/modules/OrbitControls.js'
import {
    GUI
} from '../node_modules/dat.gui/build/dat.gui.module.js'
import {
    RGBELoader
} from '../src/modules/RGBELoader.js'
import {
    GLTFLoader
} from '../src/modules/GLTFLoader.js'

// ----------------- Canvas 1-----------------

const canvas_1 = document.querySelector('canvas.canvas-1')

// ----------------- Scene -----------------

const scene = new THREE.Scene()

// ----------------- Particles -----------------


// ----------------- Sizes -----------------

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// ----------------- Camera -----------------

const camera = new THREE.PerspectiveCamera(30, sizes.width / sizes.height, 0.1, 1000)
camera.position.x = -1
camera.position.y = 0.15
camera.position.z = 6

// ----------------- Lights -----------------

// const light = new THREE.PointLight(0xffffff, 1)
// light.position.set(-1, -2, 5)
// scene.add(light)

// ----------------- 3d models -----------------

const sphere = new GLTFLoader()
sphere.load('../src/assets/models/sphere/Sphere.gltf', function (gltf) {
    gltf.scene.position.set(0, 0, 0)
    scene.add(gltf.scene)

})

// ----------------- HDRI -----------------

new RGBELoader()
    .load("../src/assets/images/HDRI/abandoned_workshop_1k.hdr", function (texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping
        scene.environment = texture
    })

// ----------------- Render -----------------

const renderer = new THREE.WebGLRenderer({
    canvas: canvas_1,
    antialias: true,
    alpha: true
})

renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 0.15
renderer.outputEncoding = THREE.sRGBEncoding

renderer.setSize(sizes.width, sizes.height)
document.body.appendChild(renderer.domElement)

// ----------------- Orbit controls -----------------

const controls = new OrbitControls(camera, renderer.domElement)
controls.autoRotate = true
controls.autoRotateSpeed = -0.25
controls.enableDamping = true
controls.enableZoom = false
// ----------------- Helpers -----------------

// const gridHelper = new THREE.GridHelper(10, 10)
// scene.add(gridHelper)
// const axesHelper = new THREE.AxesHelper(5)
// scene.add(axesHelper)

// ----------------- Animation -----------------

function animate() {
    requestAnimationFrame(animate)
    controls.update()
    renderer.render(scene, camera)
}
animate()

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