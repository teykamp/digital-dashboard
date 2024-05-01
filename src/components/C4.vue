<template>
  <div>
    <img 
      v-show="speedometerMode === 'kph'"
      src="../assets/C4/c4eu.svg" 
      alt="" 
      height="400rem">
    <img 
      v-show="speedometerMode === 'mph'" 
      src="../assets/C4/c4us.svg" 
      alt="" 
      height="400rem"
    >
  </div>

  <div style="position: relative; margin-top: -60px; left: 10px; top: -100px">
    <div 
      v-for="index in computeSpeedIndexes"
      :style="{
        position: 'absolute',
        height: `${SEGMENT_HEIGHT}px`,
        width: '270px',
        background: '#639D59',
        bottom: `${(SEGMENT_HEIGHT + 1) * index}px`,
        boxShadow: '0 0 5px #639D59',
      }"
    ></div>
  </div>

  <div style="position: relative; margin-top: -60px; left: 500px; top: -100px">
    <div 
      v-for="index in computeRpmIndexes"
      :style="{
        position: 'absolute',
        height: '270px',
        width: `${SEGMENT_HEIGHT}px`,
        left: `${(SEGMENT_HEIGHT + 1) * index + 330}px`,
        bottom: '6px',
        background: index >= (TACHOMETER_SEGMENTS - 7) ? (index >= (TACHOMETER_SEGMENTS - 3) ? '#DA4D3F' : '#E6A325') : '#639D59',
        boxShadow: index >= (TACHOMETER_SEGMENTS - 7) ? (index >= (TACHOMETER_SEGMENTS - 3) ? '0 0 5px #DA4D3F' : '0 0 5px #E6A325') : '0 0 5px #639D59',
      }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
// import TurnSignal from './TurnSignal.vue'
import useEngineController from '../composables/useEngineController'
import useDashButtons from '../composables/useDashButtons';
// import useTripComputer from '../composables/useTripComputer'

const { speed, rpm, MAX_RPM } = useEngineController()
const { trip, toggleTrip, speedometerMode, toggleSpeedometerMode, signals } = useDashButtons([
  {
    keyCode: 'KeyT',
    action: () => toggleTrip()
  },
  {
    keyCode: 'KeyU',
    action: () => toggleSpeedometerMode()
  }
])

const SPEEDOMETER_SEGMENTS = 34
const TACHOMETER_SEGMENTS = 30
const SEGMENT_HEIGHT = 7
const MAX_SPEED = 85

const computeSpeedIndexes = computed(() => Math.round(Math.min(speed.value / MAX_SPEED, 1) * SPEEDOMETER_SEGMENTS))
const computeRpmIndexes = computed(() => Math.round(rpm.value / MAX_RPM * TACHOMETER_SEGMENTS))

</script>

<style>
img {
  position: relative;
  top: -100px;
  z-index: 1;
}
</style>