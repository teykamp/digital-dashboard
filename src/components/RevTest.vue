<template>
  <div>
    <div>
    </div>
    <div>
      accelerating: {{ isAccelerating }}
    </div>
    <div style="background: green">
      Gear: {{ gear }}
    </div>
    <div
      :style="{
        position: 'absolute',
        background: 'red',
        height: '50px',
        width: `${speed + 1}px`,
      }"
    >
    Speed: {{ Math.floor(speed) }}
  </div>
    <div
      :style="{
        top: '50px',
        position: 'absolute',
        background: 'blue',
        height: '50px',
        width: `${(rpm + 1) / 20}px`,
      }"
    >
    RPM: {{ Math.floor(rpm) }}

  </div>

    <div>
      <div style="transform: skew(-10deg)">
        <SegmentDisplay 
          :display-number="1"
          :car-type="'S2000'"
          :color="'red'"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SegmentDisplay from './SegmentDisplay.vue'

import { ref, onMounted, onUnmounted } from 'vue'

// CONSTANTS  
const MAX_GEARS = 6
const MAX_RPM = 8000
const MIN_RPM = 800
const GEAR_RATIOS = [0.1, 0.15, 0.3, 0.4, 0.6, 0.8]
const MAX_SPEED_PER_GEAR = [10, 15, 30, 40, 60, 80]
//


const speed = ref(0)
const rpm = ref(0)
const rpmGain = ref(0)
const acceleration = ref(0)
const isAccelerating = ref(false)
const isShifting = ref(false)

const gear = ref(1)

const shiftGear = () => {
  isShifting.value = false
}


const handleKeyPress = (event: KeyboardEvent) => {
  if (event.code === "Space") return isAccelerating.value = true
  if (event.code === "ArrowUp") {
    isShifting.value = true
    setTimeout(shiftGear, 150)
    gear.value = Math.min(gear.value + 1, MAX_GEARS)
    rpmGain.value -= Math.sqrt(rpm.value)
    return
  }
  if (event.code === "ArrowDown") {
    gear.value = Math.max(gear.value - 1, 1)
    isShifting.value = true
    setTimeout(shiftGear, 150)
    rpm.value += Math.sqrt(rpm.value) * 40
    return
  }
}

const handleKeyUp = (event: KeyboardEvent) => {
  if (event.code === "Space") isAccelerating.value = false
}

const gameLoopActive = ref(false)

const gameLoop = () => {
  if (isAccelerating.value && !isShifting.value) {
    rpm.value += 85
  }

  if (rpm.value > MAX_RPM) rpm.value *= 0.95
  rpm.value = Math.max(rpm.value * .99, MIN_RPM)
  
  // rpm.value = Math.min(rpm.value, MIN_RPM)
  rpmGain.value *= (0.99)

  rpm.value += rpmGain.value

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


<!-- 

  max rpm and min rpm
   3000 and 250

   when you accel -> rpm goes fast at low number and slow at high number
   when shift up -> rpm drops 1/ proprtional rpm at previous gear



 -->
