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
        background: 'darkgreen',
        bottom: `${(SEGMENT_HEIGHT + 1) * index}px`,
        zIndex: '0'
      }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import useEngineController from '../composables/useEngineController'
// import useTripComputer from '../composables/useTripComputer'

import { computed } from 'vue'
// import TurnSignal from './TurnSignal.vue'

import useDashButtons from '../composables/useDashButtons';

const { speed, rpm, MAX_RPM } = useEngineController()


const SPEEDOMETER_SEGMENTS = 34
const TACHOMETER_SEGMENTS = 26
const SEGMENT_HEIGHT = 7
const MAX_SPEED = 85

const computeSpeedIndexes = computed(() => Math.round(Math.min(speed.value / MAX_SPEED, 1) * SPEEDOMETER_SEGMENTS))

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
</script>

<style>
img {
  position: relative;
  top: -100px;
  z-index: 1;
}
</style>