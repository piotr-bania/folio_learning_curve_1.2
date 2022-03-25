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

// ----------------- Canvas -----------------

const canvas_1 = document.querySelector('canvas.canvas-1')
// const canvas_2 = document.querySelector('canvas.canvas-2')

// ----------------- Scene -----------------

const scene = new THREE.Scene()

// ----------------- Textures -----------------

const textureLoader = new THREE.TextureLoader()
const particleTexture = textureLoader.load('../src/assets/particles/twirl_03.png')

// ----------------- Particles -----------------

// // Geometry
// const particlesGeometry = new THREE.BufferGeometry()
// const count = 10000

// const positions = new Float32Array(count * 3)
// for (let i = 0; i < count * 3; i++) {
//     positions[i] = (Math.random() - 0.5) * 10
// }

// particlesGeometry.setAttribute(
//     'position',
//     new THREE.BufferAttribute(positions, 3)
// )

// // Material
// const particlesMaterial = new THREE.PointsMaterial()
// particlesMaterial.size = 0.025
// particlesMaterial.sizeAttenuation = true
// particlesMaterial.color = new THREE.Color('#ABABAB')
// particlesMaterial.transparent = true
// particlesMaterial.alphaMap = particleTexture

// // Points
// const particles = new THREE.Points(particlesGeometry, particlesMaterial)
// scene.add(particles)

// ----------------- Sizes -----------------

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// ----------------- Camera -----------------

const camera = new THREE.PerspectiveCamera(30, sizes.width / sizes.height, 0.1, 1000)
camera.position.x = -1
camera.position.y = 0
camera.position.z = 6

// ----------------- Lights -----------------

const light = new THREE.PointLight(0xffffff, 2)
light.position.set(-2, -1, 0)
scene.add(light)

// ----------------- 3d models -----------------

let modelsDistance = 4
// Model 1

let model_1 = new GLTFLoader()
model_1.load('../src/assets/models/sphere/Sphere.gltf', function (gltf) {
    model_1 = gltf.scene
    gltf.scene.scale.set(1, 1, 1)
    gltf.scene.position.set(0, 0, 0)
    gltf.scene.position.y = - modelsDistance * 0
    scene.add(model_1)
    
    // Animation
    gsap.to(model_1.rotation, { duration: 500, delay: 0, y: -15, repeat: -1})
})

// Model 2

let model_2 = new GLTFLoader()
model_2.load('../src/assets/models/sphere/Sphere.gltf', function (gltf) {
    model_2 = gltf.scene
    gltf.scene.scale.set(1, 1, 1)
    gltf.scene.position.set(1, 0, -2)
    gltf.scene.position.y = - modelsDistance * 1.16
    scene.add(model_2)
    
    // Animation
    gsap.to(model_2.rotation, { duration: 500, delay: 0, x: -15, repeat: -1})
})

// Model 3

let model_3 = new GLTFLoader()
model_3.load('../src/assets/models/sphere/Sphere.gltf', function (gltf) {
    model_3 = gltf.scene
    gltf.scene.scale.set(1, 1, 1)
    gltf.scene.position.set(-3, 0, -2)
    gltf.scene.position.y = - modelsDistance * 2.32
    scene.add(model_3)
    
    // Animation
    gsap.to(model_3.rotation, { duration: 500, delay: 0, z: -15, repeat: -1})
})

// Model 4

let model_4 = new GLTFLoader()
model_4.load('../src/assets/models/sphere/Sphere.gltf', function (gltf) {
    model_4 = gltf.scene
    gltf.scene.scale.set(1, 1, 1)
    gltf.scene.position.set(1, 0, -2)
    gltf.scene.position.y = - modelsDistance * 3.48
    scene.add(model_4)
    
    // Animation
    gsap.to(model_4.rotation, { duration: 500, delay: 0, y: -15, repeat: -1})
})

// Model 5

let model_5 = new GLTFLoader()
model_5.load('../src/assets/models/sphere/Sphere.gltf', function (gltf) {
    model_5 = gltf.scene
    gltf.scene.scale.set(1, 1, 1)
    gltf.scene.position.set(-3, 0, -2)
    gltf.scene.position.y = - modelsDistance * 4.64
    scene.add(model_5)
    
    // Animation
    gsap.to(model_5.rotation, { duration: 500, delay: 0, x: -15, repeat: -1})
})

// Model 6

let model_6 = new GLTFLoader()
model_6.load('../src/assets/models/sphere/Sphere.gltf', function (gltf) {
    model_6 = gltf.scene
    gltf.scene.scale.set(1, 1, 1)
    gltf.scene.position.set(1, 0, -2)
    gltf.scene.position.y = - modelsDistance * 6
    scene.add(model_6)
    
    // Animation
    gsap.to(model_6.rotation, { duration: 500, delay: 0, z: -15, repeat: -1})
})

// ----------------- HDRI -----------------

new RGBELoader()
    .load("../src/assets/images/HDRI/abandoned_workshop_1k.hdr", function (texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping
        scene.environment = texture
    })

// ----------------- Render -----------------

// Render 1
const renderer = new THREE.WebGLRenderer({
    canvas: canvas_1,
    antialias: true,
    alpha: true
})

renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 0.3
renderer.outputEncoding = THREE.sRGBEncoding

renderer.setSize(sizes.width, sizes.height)
document.body.appendChild(renderer.domElement)

// ----------------- Section paralax -----------------

let scrollY = window.scrollY

window.addEventListener('scroll', () => {
    scrollY = window.scrollY
    console.log(scrollY)
})

// ----------------- Orbit controls -----------------

// const controls = new OrbitControls(camera, renderer.domElement)
// controls.autoRotate = true
// controls.autoRotateSpeed = -0.25
// controls.enableDamping = true
// controls.enableZoom = false

// ----------------- Helpers -----------------

// const gridHelper = new THREE.GridHelper(10, 10)
// scene.add(gridHelper)
// const axesHelper = new THREE.AxesHelper(5)
// scene.add(axesHelper)

// ----------------- Clock -----------------/

const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Animate camera
    camera.position.y = - scrollY / sizes.height * modelsDistance

        // Render
        renderer.render(scene, camera)

        // Call tick again on the next frame
        window.requestAnimationFrame(tick)
}

tick()

// ----------------- Animation -----------------

function animate() {
    requestAnimationFrame(animate)
    // controls.update()
    renderer.render(scene, camera)
    // renderer_2.render(scene, camera)
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
    // renderer_2.setSize(sizes.width, sizes.height)
}
window.addEventListener('resize', onWindowResize, false);