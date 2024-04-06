<template>
  <div>
    <div>
      Speed: {{ Math.floor(speed) }}
      {{ gear }}
    </div>
    <div>
      RPM: {{ Math.floor(rpm) }}
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
// 
const MAX_GEARS = 6
const BAD_GEAR_RATIO_PENALTY = 10
const MAX_RPM = 3004 // not sure why 4 is significant (rounds it to 3000)
// 
const speed = ref(0)
const rpm = ref(0)
const isAccelerating = ref(false)

const speedMultiplierPerGear = [0.2, 0.3, 0.4, 0.5, 0.7, 0.9]
const optimalSpeedPerGear = [10, 15, 30, 40, 60, 80]
const gear = ref(1)

const transmission = ref(1)

const shiftGear = () => {
  transmission.value = 1
}


const handleKeyPress = (event: KeyboardEvent) => {
  if (event.code === "Space") return isAccelerating.value = true
  if (event.code === "ArrowUp") {
    transmission.value = 0
    rpm.value = rpm.value / 4
    setTimeout(shiftGear, 150)
    gear.value = Math.min(gear.value + 1, MAX_GEARS)
    return
  }
  if (event.code === "ArrowDown") {
    rpm.value *= 2
    gear.value = Math.max(gear.value - 1, 1)
    return
  }
}

const handleKeyUp = (event: KeyboardEvent) => {
  if (event.code === "Space") isAccelerating.value = false
}


const gameLoopActive = ref(false)

const gameLoop = () => {
  const x = 1-(Math.abs((speed.value - optimalSpeedPerGear[gear.value - 1]) === 0 ? 1 : (speed.value - optimalSpeedPerGear[gear.value - 1]) / optimalSpeedPerGear[gear.value - 1]) / 30)

  if (isAccelerating.value) {
    rpm.value = Math.min(MAX_RPM, rpm.value + 20)
    speed.value = speed.value + 1 * transmission.value * ( x > 1 ? 1: x ) * speedMultiplierPerGear[gear.value - 1]
  }
  
  speed.value *= (0.99)
  rpm.value *= (0.999)


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
