<template>
  <div>
    <div>
      Speed: {{ Math.floor(speed) }}
      {{ gear }}
    </div>
    <div
      :style="{
        position: 'absolute',
        background: 'red',
        height: '50px',
        width: `${speed + 1}px`,
      }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const speed = ref(0)
const isAccelerating = ref(false)

const speedMultiplierPerGear = [1, 2.5, 4, 5.5, 8, 10.5]
// const maxRpmPerGear = [2000, 2500, 3000, 3500, 4000, 4500]
const gear = ref(1)
const MAXGEARS = 6

const handleKeyPress = (event: KeyboardEvent) => {
  if (event.code === "Space") return isAccelerating.value = true
  if (event.code === "ArrowUp") return gear.value = gear.value === MAXGEARS ? MAXGEARS : gear.value + 1
  if (event.code === "ArrowDown") return gear.value = gear.value === 1 ? 1 : gear.value - 1
}

const handleKeyUp = (event: KeyboardEvent) => {
  if (event.code === "Space") isAccelerating.value = false
}

const gameLoopActive = ref(false)

const gameLoop = () => {
  if (isAccelerating.value) speed.value = speed.value + 1 * speedMultiplierPerGear[gear.value - 1]
  
  speed.value *= 0.99


  if (gameLoopActive.value) {
    requestAnimationFrame(gameLoop)
  }
}

onMounted(() => {
  window.addEventListener("keydown", handleKeyPress)
  window.addEventListener("keyup", handleKeyUp)
  gameLoopActive.value = true
  gameLoop()
})

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyPress)
  window.removeEventListener("keyup", handleKeyUp)
  gameLoopActive.value = false
})
</script>
