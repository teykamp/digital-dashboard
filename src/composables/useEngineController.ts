import { ref, onMounted, onUnmounted } from 'vue'

const useEngineController = () => {
  // CONSTANTS  
  const MAX_GEARS = 6
  const MAX_RPM = 8000
  const MIN_RPM = 800
  const GEAR_RATIOS = [0.1, 0.15, 0.3, 0.4, 0.6, 0.8]
  //

  const speed = ref(0)
  const rpm = ref(0)
  const rpmGain = ref(300)
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
      speed.value += 2 * GEAR_RATIOS[gear.value - 1]
    }    

    rpm.value = Math.max(Math.min(rpm.value * 0.99, MAX_RPM), MIN_RPM)
    
    rpmGain.value *= (0.99)

    rpm.value += rpmGain.value

    speed.value *= (0.99)

    if (gameLoopActive.value) {
      requestAnimationFrame(gameLoop)
    }
  }

  onMounted(() => {
    window.addEventListener("keydown", handleKeyPress)
    window.addEventListener("keyup", handleKeyUp)
    gameLoopActive.value = true
    setTimeout(() => {
      rpmGain.value = -100
    }, 800);
    gameLoop()
  })

  onUnmounted(() => {
    window.removeEventListener("keydown", handleKeyPress)
    window.removeEventListener("keyup", handleKeyUp)
    gameLoopActive.value = false
  })

  return {
    speed,
    rpm,
    rpmGain,
    isAccelerating,
    isShifting,
    gear,
    MAX_RPM,
  }
}

export default useEngineController

