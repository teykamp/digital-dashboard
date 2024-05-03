import { ref, onMounted, onUnmounted } from 'vue'

interface KeyPressEvent {
  keyCode: string;
  action: (event: KeyboardEvent) => void;
}

export type SpeedometerMode = 'mph' | 'kph'

export const useDashButtons = (eventListeners: KeyPressEvent[] = []) => {

  const trip = ref<1 | 2>(1)
  const toggleTrip = () => {
    trip.value = trip.value === 1 ? 2 : 1
  }

  const speedometerMode = ref<SpeedometerMode>('mph')
  const toggleSpeedometerMode = () => {
    speedometerMode.value = speedometerMode.value === 'mph' ? 'kph' : 'mph'
  }

  const signalIntervalId = ref<undefined | ReturnType<typeof setTimeout>>(undefined)
  const signals = ref<(('left' | 'right' | 'hazards' | null) | boolean)[]>([false, false, null])

  const toggleSignal = (direction: 'left' | 'right' | 'hazards' | null) => {
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
    if (direction) signalIntervalId.value = setTimeout(() => toggleSignal(direction), 300)
    else signals.value = [false, false, null]

  }

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.code === "ArrowRight") {
      if (signals.value[2] === "right")  {
        toggleSignal(null)
        return
      }
      toggleSignal(null)
      toggleSignal('right')  
    }
    if (event.code === "ArrowLeft") {
      if (signals.value[2] === "left") {
        toggleSignal(null)
        return
      }
      toggleSignal(null)
      toggleSignal('left')
    }
    if (event.code === "KeyH") {
      if (signals.value[2] === "hazards") {
        toggleSignal(null)
        return
      }
      toggleSignal(null)
      toggleSignal('hazards')
    }

    eventListeners.forEach(listener => {
      if (event.code === listener.keyCode) {
          listener.action(event)
      }
  })
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
    signalIntervalId,

    toggleTrip,
    toggleSpeedometerMode,
  }
}