import { ref } from 'vue'

// have weather use api

const useTripComputer = () => {
  const showColonOnClock = ref(false)
  const hours = ref(0)
  const minutes = ref(0)
  
  const updateClock = () => {
    showColonOnClock.value = !showColonOnClock.value
    const currentDate = new Date()
    hours.value = currentDate.getHours()
    minutes.value = currentDate.getMinutes() 
  
  }
  setInterval(updateClock, 1000)
  
  return {
    showColonOnClock,
    hours,
    minutes,
  }
}

export default useTripComputer