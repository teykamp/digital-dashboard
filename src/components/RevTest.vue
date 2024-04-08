<template>
  <div>
    <div>
      Speed: {{ Math.floor(speed) }}
    </div>
    <div>
      accelerating: {{ isAccelerating }}
    </div>
    <div style="background: green">
      Gear: {{ gear }}
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

// CONSTANTS  
const MAX_GEARS = 6
const BAD_GEAR_RATIO_PENALTY = 10
const MAX_RPM = 3000
const GEAR_RATIOS = [0.1, 0.15, 0.3, 0.4, 0.5, 0.6]
//


const speed = ref(0)
const rpm = ref(0)
const isAccelerating = ref(false)
const isShifting = ref(false)
const rpmGain = ref(0)

// const optimalSpeedPerGear = [10, 15, 30, 40, 60, 80]
const gear = ref(1)

const shiftGear = () => {
  isShifting.value = false
}


const handleKeyPress = (event: KeyboardEvent) => {
  if (event.code === "Space") return isAccelerating.value = true
  if (event.code === "ArrowUp") {
    rpmGain.value = 0
    isShifting.value = true
    setTimeout(shiftGear, 150)
    gear.value = Math.min(gear.value + 1, MAX_GEARS)

    return
  }
  if (event.code === "ArrowDown") {
    gear.value = Math.max(gear.value - 1, 1)
    return
  }
}

const handleKeyUp = (event: KeyboardEvent) => {
  if (event.code === "Space") isAccelerating.value = false
}


const gameLoopActive = ref(false)

const gameLoop = () => {
  if (isAccelerating.value && !isShifting.value) {
    // rpm.value = Math.min(MAX_RPM, rpm.value + 30)
    rpmGain.value += 0.3
  }
  // down shifting jumps to max

  rpm.value += rpmGain.value
  rpmGain.value *= 0.99
  rpm.value *= (0.99)

  speed.value += ((rpm.value * GEAR_RATIOS[gear.value - 1] / 8)- speed.value) / 10


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
