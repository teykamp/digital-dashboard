import { ref, computed } from 'vue'
import type { Ref } from 'vue'

// have weather use api

const useTripComputer = (speed: Ref<number>, trip: Ref<1 | 2>) => {
  const showColonOnClock = ref(false)
  const hours = ref(0)
  const minutes = ref(0)
  const speedSum = ref([0, 0, 0])
  
  const updateClock = () => {
    showColonOnClock.value = !showColonOnClock.value
    const currentDate = new Date()
    hours.value = currentDate.getHours()
    minutes.value = currentDate.getMinutes() 
  }

  const updateOdometer = () => {
    speedSum.value[trip.value] += speed.value
    speedSum.value[0] += speed.value
  }

  setInterval(() => {
    updateClock()
    updateOdometer()
  }, 1000)
  
  return {
    showColonOnClock,
    hours,
    minutes,
    odometerValue: computed(() => speedSum.value.map((x: number) => (x / 3600))),
  }
}

export default useTripComputer