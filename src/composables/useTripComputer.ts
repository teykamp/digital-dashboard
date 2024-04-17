import { ref, computed } from 'vue'
import type { Ref } from 'vue'

// have weather use api

const useTripComputer = (speed: Ref) => {
  const showColonOnClock = ref(false)
  const hours = ref(0)
  const minutes = ref(0)
  const speedSum = ref(0)
  
  const updateClock = () => {
    showColonOnClock.value = !showColonOnClock.value
    const currentDate = new Date()
    hours.value = currentDate.getHours()
    minutes.value = currentDate.getMinutes() 
  }

  const updateOdometer = () => {
    speedSum.value += speed.value
  }

  setInterval(() => {
    updateClock()
    updateOdometer()
  }, 1000)
  
  return {
    showColonOnClock,
    hours,
    minutes,
    odometerValue: computed(() => Math.floor(speedSum.value / 3600 + 1)),
  }
}

export default useTripComputer