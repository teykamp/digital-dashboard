import { ref, onMounted, onUnmounted } from 'vue'

const useDashButtons = () => {

  const trip = ref<1 | 2>(1)
  const toggleTrip = () => {
    trip.value = trip.value === 1 ? 2 : 1
  }

  const speedometerMode = ref<'mph' | 'kph'>('mph')
  const toggleSpeedometerMode = () => {
    speedometerMode.value = speedometerMode.value === 'mph' ? 'kph' : 'mph'
  }

  const signalIntervalId = ref<undefined | ReturnType<typeof setTimeout>>(undefined)
  const signals = ref<(('left' | 'right' | 'hazards' | null) | boolean)[]>([false, false, null])
  const toggleSignal = (direction: 'left' | 'right' | 'hazards') => {
    clearTimeout(signalIntervalId.value)
    if (direction === 'left') {
      signals.value[0] = !signals.value[0]
    }
    else if (direction === 'right') {
      signals.value[1] = !signals.value[1]
    }
     else if (direction === 'hazards') {
      signals.value[0] = !signals.value[0]
      signals.value[1] = !signals.value[1]
    }
    signals.value[2] = direction
    signalIntervalId.value = setTimeout(() => toggleSignal(direction), 300)
  }


  const handleKeyPress = (event: KeyboardEvent) => {
    signals.value = [false, false, null]
    if (event.code === "ArrowRight") {
      toggleSignal('right')  
    }
    if (event.code === "ArrowLeft") {
      toggleSignal('left')
    }
    if (event.code === "KeyH") {
      toggleSignal('hazards')
    }
  }

  onMounted(() => {
    window.addEventListener("keydown", handleKeyPress)
  })

  onUnmounted(() => {
    window.removeEventListener("keydown", handleKeyPress)
  })

  return {
    trip,
    speedometerMode,
    signals,

    toggleTrip,
    toggleSpeedometerMode,
  }
}

export default useDashButtons