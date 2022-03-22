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

const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(0, 5, 10)
scene.add(light)

// ----------------- 3d models -----------------

const sphere = new GLTFLoader()
sphere.load('../src/assets/models/sphere/Sphere.gltf', function (gltf) {
    scene.add(gltf.scene)
})



// ----------------- Render -----------------

const renderer = new THREE.WebGLRenderer({
    canvas: canvas_1,
    antialias: true,
    alpha: true
})

renderer.setSize(sizes.width, sizes.height)
document.body.appendChild(renderer.domElement)

// ----------------- Rotation -----------------

// controls = new OrbitControls(camera, renderer.domElement)






// ----------------- Mesh -----------------

// const geometry = new THREE.IcosahedronGeometry(1, 15)
// const hdrEquirect = new RGBELoader().load(
//     "../src/assets/images/HDRI/goegap_2k.hdr",
//     () => {
//         hdrEquirect.mapping = THREE.EquirectangularReflectionMapping
//     }
// )

// const textureLoader = new THREE.TextureLoader()
// const normalMapTexture = textureLoader.load("../src/assets/images/textures/GravelBig01_2K_Normal.png")
// normalMapTexture.wrapS = THREE.RepeatWrapping
// normalMapTexture.wrapT = THREE.RepeatWrapping

// const material = new THREE.MeshPhysicalMaterial({
//     roughness: 0.1,
//     transmission: 0.9,
//     thickness: 0.9,
//     envMap: hdrEquirect
// })

// const mesh = new THREE.Mesh(geometry, material)
// scene.add(mesh)

// const bgTexture = new THREE.TextureLoader().load("../src/assets/images/textures/GravelBig01_2K_Normal.png");
// const bgGeometry = new THREE.PlaneGeometry(4, 4)
// const bgMaterial = new THREE.MeshBasicMaterial({
//     map: bgTexture
// })
// const bgMesh = new THREE.Mesh(bgGeometry, bgMaterial)
// bgMesh.position.set(0, 0, -1)
// scene.add(bgMesh)

// ----------------- Helpers -----------------

// const gridHelper = new THREE.GridHelper(10, 10)
// scene.add(gridHelper)
// const axesHelper = new THREE.AxesHelper(5)
// scene.add(axesHelper)

// ----------------- Animation -----------------

function animate() {
    requestAnimationFrame(animate)
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