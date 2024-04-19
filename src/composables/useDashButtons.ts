import { ref } from 'vue'

const useDashButtons = () => {

  const trip = ref<1 | 2>(1)
  const toggleTrip = () => {
    trip.value = trip.value === 1 ? 2 : 1
  }

  const speedometerMode = ref<'mph' | 'kph'>('mph')
  const toggleSpeedometerMode = () => {
    speedometerMode.value = speedometerMode.value === 'mph' ? 'kph' : 'mph'
  }

  return {
    trip,
    speedometerMode,

    toggleTrip,
    toggleSpeedometerMode,
  }
}

export default useDashButtons