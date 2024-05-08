<!-- <template>
  <canvas ref="target"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshBasicMaterial, Mesh } from 'three'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js'

const target = ref<HTMLCanvasElement | null>(null)

const scene = new Scene()
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
scene.add(camera)

const loader = new OBJLoader()
loader.load( './assets/s2k.obj', () => {
  console.log('loaded')
})

camera.position.z = 5

function animate() {
  requestAnimationFrame(animate)

}

onMounted(() => {
  const renderer = new WebGLRenderer({
    canvas: target.value as unknown as HTMLCanvasElement,
    antialias: true,
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.render(scene, camera)

    animate()
})

// onMounted(() => {
// })
</script> -->

<template>
  <vue3dLoader
    @load="onLoad()"
    :height="700"
    :width="700"
    :filePath="['src\\assets\\3d\\s2k.obj', 'src\\assets\\3d\\nissan.obj']"
    :backgroundAlpha="0"
    :rotation="rotation"
    :controlsOptions="{
        enablePan: false,
        enableZoom: true,
        enableRotate: true,
      }"
    :scale="[{ x: 2, y: 2, z: 2 }, { x: 0.3, y: 0.3, z: 0.3 }]"
  ></vue3dLoader>
</template>

<script setup lang="ts">
import { vue3dLoader } from "vue-3d-loader"
import { ref } from "vue"
const rotation = ref()
rotation.value = [{
  x: 0,
  y: -Math.PI / 2,
  z: 0,
},
{
  x: 0,
  y: 0,
  z: 0,
}]

const onLoad = () => {
  rotate()
}
const rotate = () => {
  requestAnimationFrame(rotate)
  for (const object of rotation.value) {
    object.y += 0.001
  }
}
</script>