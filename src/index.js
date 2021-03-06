import * as THREE from '../src/modules/three.module.js'
// import { gsap } from '../node_modules/gsap/dist/gsap.js'
import {
    OrbitControls
} from '../src/modules/OrbitControls.js'
import {
    color,
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

// ----------------- Scene -----------------

const scene = new THREE.Scene()

// ----------------- Particles -----------------

const textureLoader = new THREE.TextureLoader()
const particleTexture = textureLoader.load('../src/assets/particles/twirl_03.png')

// Geometry
const particlesGeometry = new THREE.BufferGeometry()
const count = 20000

const positions = new Float32Array(count * 3)
for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 100
}

particlesGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(positions, 3)
)

// Material
const particlesMaterial = new THREE.PointsMaterial()
particlesMaterial.size = 0.25
particlesMaterial.sizeAttenuation = true
particlesMaterial.color = new THREE.Color('#7161F5')
particlesMaterial.transparent = true
particlesMaterial.alphaMap = particleTexture

// Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particles)

gsap.to(particles.rotation, {
    duration: 1000,
    delay: 0,
    y: -5,
    repeat: -1
})

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

// const hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 4)
// scene.add(hemiLight)

// const spotLight = new THREE.SpotLight(0xffffff, 4)
// spotLight.position.set(-50, 50, 50)
// spotLight.castShadow = true
// spotLight.shadow.bias = -0.0001
// spotLight.shadow.mapSize.width = 1024 * 4
// spotLight.shadow.mapSize.height = 1024 * 4
// scene.add(spotLight)

// ----------------- HDRI -----------------

new RGBELoader()
    .load("../src/assets/images/HDRI/gamrig_1k.hdr", function (texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping
        scene.environment = texture
    })

// ----------------- 3d models -----------------

let modelsDistance = 5

// Model 1
let model_1 = new GLTFLoader()
model_1.load('../src/assets/models/sphere2/sphere2.gltf', function (gltf) {
    // Model
    model_1 = gltf.scene
    gltf.scene.scale.set(1, 1, 1)
    gltf.scene.position.set(0, 0, 0)
    gltf.scene.position.y = -modelsDistance * 0

    // Texture
    // const textureLoader = new THREE.TextureLoader()
    // const normalMapTexture = textureLoader.load("../src/assets/models/test/Marble06_4K_Normal.png")
    // const modelColorTexture = textureLoader.load('../src/assets/models/test/Marble06_4K_BaseColor.png')
    // normalMapTexture.wrapS = THREE.RepeatWrapping
    // normalMapTexture.wrapT = THREE.RepeatWrapping


    // Material
    const newMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x7161F5,
        // map: modelColorTexture,
        // normalMap: normalMapTexture,
        // clearcoatNormalMap: normalMapTexture,
        metalness: 1,
        roughness: 0,
        transmission: 1,
        thickness: 0,
    })
    model_1.traverse((o) => {
        if (o.isMesh) o.material = newMaterial
    })

    model_1.traverse(n => {
        if (n.isMesh) {
            n.castShadow = true
            n.receiveShadow = true
            if (n.material.map) n.material.map.anisotropy = 16
        }
    })

    scene.add(model_1)

    // Animation
    gsap.to(model_1.rotation, {
        duration: 500,
        delay: 0,
        y: -15,
        repeat: -1
    })
})

// Model 2
let model_2 = new GLTFLoader()
model_2.load('../src/assets/models/sphere2/sphere2.gltf', function (gltf) {
    model_2 = gltf.scene
    gltf.scene.scale.set(1, 1, 1)
    gltf.scene.position.set(-0.5, 0, -3)
    gltf.scene.position.y = -modelsDistance * 1

    // Material
    const newMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xF57061,
        metalness: 1,
        roughness: 0,
        transmission: 1,
        thickness: 0,
    })
    model_2.traverse((o) => {
        if (o.isMesh) o.material = newMaterial
    })

    model_2.traverse(n => {
        if (n.isMesh) {
            n.castShadow = true
            n.receiveShadow = true
            if (n.material.map) n.material.map.anisotropy = 16
        }
    })

    scene.add(model_2)

    // Animation
    gsap.to(model_2.rotation, {
        duration: 500,
        delay: 0,
        x: -5,
        y: 7,
        repeat: -1
    })
})

// Model 3
let model_3 = new GLTFLoader()
model_3.load('../src/assets/models/sphere2/sphere2.gltf', function (gltf) {
    model_3 = gltf.scene
    gltf.scene.scale.set(1, 1, 1)
    gltf.scene.position.set(-2, 0, -1)
    gltf.scene.position.y = -modelsDistance * 2

    // Material
    const newMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x61F570,
        metalness: 0.9,
        roughness: 0.1,
        transmission: 0.9,
        thickness: 0.1,
    })
    model_3.traverse((o) => {
        if (o.isMesh) o.material = newMaterial
    })

    model_3.traverse(n => {
        if (n.isMesh) {
            n.castShadow = true
            n.receiveShadow = true
            if (n.material.map) n.material.map.anisotropy = 16
        }
    })

    scene.add(model_3)

    // Animation
    gsap.to(model_3.rotation, {
        duration: 500,
        delay: 0,
        y: -5,
        z: 7,
        repeat: -1
    })
})

// Model 4
let model_4 = new GLTFLoader()
model_4.load('../src/assets/models/sphere2/sphere2.gltf', function (gltf) {
    model_4 = gltf.scene
    gltf.scene.scale.set(1, 1, 1)
    gltf.scene.position.set(0.5, 0, -4)
    gltf.scene.position.y = -modelsDistance * 2.75

    // Material
    const newMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x7161F5,
        metalness: 0.9,
        roughness: 0.1,
        transmission: 0.9,
        thickness: 0.1,
    })
    model_4.traverse((o) => {
        if (o.isMesh) o.material = newMaterial
    })

    model_4.traverse(n => {
        if (n.isMesh) {
            n.castShadow = true
            n.receiveShadow = true
            if (n.material.map) n.material.map.anisotropy = 16
        }
    })

    scene.add(model_4)

    // Animation
    gsap.to(model_4.rotation, {
        duration: 500,
        delay: 0,
        x: -5,
        y: 7,
        repeat: -1
    })
})

// Model 5
let model_5 = new GLTFLoader()
model_5.load('../src/assets/models/sphere2/sphere2.gltf', function (gltf) {
    model_5 = gltf.scene
    gltf.scene.scale.set(1, 1, 1)
    gltf.scene.position.set(-2.5, 0, -1)
    gltf.scene.position.y = -modelsDistance * 3.6

    // Material
    const newMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x040117,
        metalness: 0.9,
        roughness: 0.1,
        transmission: 0.9,
        thickness: 0.1,
    })
    model_5.traverse((o) => {
        if (o.isMesh) o.material = newMaterial
    })

    model_5.traverse(n => {
        if (n.isMesh) {
            n.castShadow = true
            n.receiveShadow = true
            if (n.material.map) n.material.map.anisotropy = 16
        }
    })

    scene.add(model_5)

    // Animation
    gsap.to(model_5.rotation, {
        duration: 500,
        delay: 0,
        x: -5,
        y: 7,
        repeat: -1
    })
})

// Model 6
let model_6 = new GLTFLoader()
model_6.load('../src/assets/models/sphere2/sphere2.gltf', function (gltf) {
    model_6 = gltf.scene
    gltf.scene.scale.set(1, 1, 1)
    gltf.scene.position.set(-1, 0, -1)
    gltf.scene.position.y = -modelsDistance * 4.65

    // Material
    const newMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x61F570,
        metalness: 0.9,
        roughness: 0.1,
        transmission: 0.9,
        thickness: 0.1,
    })
    model_6.traverse((o) => {
        if (o.isMesh) o.material = newMaterial
    })

    model_6.traverse(n => {
        if (n.isMesh) {
            n.castShadow = true
            n.receiveShadow = true
            if (n.material.map) n.material.map.anisotropy = 16
        }
    })

    scene.add(model_6)

    // Animation
    gsap.to(model_6.rotation, {
        duration: 500,
        delay: 0,
        x: -5,
        y: 7,
        repeat: -1
    })
})

// Model 7
let model_7 = new GLTFLoader()
model_7.load('../src/assets/models/sphere2/sphere2.gltf', function (gltf) {
    model_7 = gltf.scene
    gltf.scene.scale.set(1, 1, 1)
    gltf.scene.position.set(-2.5, 0, -1.5)
    gltf.scene.position.y = -modelsDistance * 5.65

    // Material
    const newMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x040117,
        metalness: 0.9,
        roughness: 0.1,
        transmission: 0.9,
        thickness: 0.1,
    })
    model_7.traverse((o) => {
        if (o.isMesh) o.material = newMaterial
    })

    model_7.traverse(n => {
        if (n.isMesh) {
            n.castShadow = true
            n.receiveShadow = true
            if (n.material.map) n.material.map.anisotropy = 16
        }
    })

    scene.add(model_7)

    // Animation
    gsap.to(model_7.rotation, {
        duration: 500,
        delay: 0,
        x: -5,
        y: 7,
        repeat: -1
    })
})



// // Animated cube
// let mixer
// let model1 = new GLTFLoader()

// model1.load('../src/assets/models/test/test.gltf', function (gltf) {
//     // Model
//     model1 = gltf.scene
//     gltf.scene.scale.set(0.35, 0.35, 0.35)
//     gltf.scene.position.set(-2, 0, 0)
//     gltf.scene.position.y = -modelsDistance * 0

//     // Texture
//     const textureLoader = new THREE.TextureLoader()
//     const normalMapTexture = textureLoader.load("../src/assets/models/test/Marble03_4K_Normal.png")
//     const modelColorTexture = textureLoader.load('../src/assets/models/test/Marble03_4K_BaseColor.png')
//     normalMapTexture.wrapS = THREE.RepeatWrapping
//     normalMapTexture.wrapT = THREE.RepeatWrapping

//     // Material
//     const newMaterial = new THREE.MeshPhysicalMaterial({
//         color: 0x7161F5,
//         map: modelColorTexture,
//         normalMap: normalMapTexture,
//         metalness: 0.75,
//         roughness: 0.25,
//         transmission: 0.25,
//         thickness: 0.75,
//     })
//     model1.traverse((o) => {
//         if (o.isMesh) o.material = newMaterial
//     })

//     scene.add(gltf.scene)

//     // Animation
//     mixer = new THREE.AnimationMixer(model1)
//     const clips = gltf.animations
//     clips.forEach(function (clip) {
//         mixer.clipAction(clip).play()
//     })
//     const animationClock = new THREE.Clock()

//     function animate() {
//         mixer.update(animationClock.getDelta())
//         renderer.render(scene, camera)
//     }

//     renderer.setAnimationLoop(animate)

//     // Rotation
//     gsap.to(model1.rotation, {
//         duration: 500,
//         delay: 0,
//         y: -15,
//         repeat: -1
//     })
// })

// ----------------- Render -----------------

// Render 1
const renderer = new THREE.WebGLRenderer({
    canvas: canvas_1,
    antialias: true,
    alpha: true
})

renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 1
renderer.outputEncoding = THREE.sRGBEncoding

renderer.setSize(sizes.width, sizes.height)
document.body.appendChild(renderer.domElement)

// ----------------- Section paralax -----------------

let scrollY = window.scrollY

window.addEventListener('scroll', () => {
    scrollY = window.scrollY
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

// ----------------- GUI -----------------/

// const gui = new GUI()

// gui.add(directionalLight, 'intensity').min(0).max(1).step(0.001).name('directionalLight intensity')
// gui.addColor(directionalLight, 'color').name('directionalLight color')
// gui.add(directionalLight.position, 'x').min(- 3).max(3).step(0.01).name('directionalLight X')
// gui.add(directionalLight.position, 'y').min(- 3).max(3).step(0.01).name('directionalLight Y')
// gui.add(directionalLight.position, 'z').min(- 3).max(3).step(0.01).name('directionalLight Z')

// ----------------- Clock -----------------/

const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Animate camera
    camera.position.y = -scrollY / sizes.height * modelsDistance

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

// ----------------- Animation -----------------

function animate() {
    requestAnimationFrame(animate)

    // spotLight.position.set(
    //     camera.position.x + 10,
    //     camera.position.y + 10,
    //     camera.position.z + 10
    // )

    // controls.update()
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

    // Casting shadows
    renderer.shadowMap.enabled = true
}
window.addEventListener('resize', onWindowResize, false)