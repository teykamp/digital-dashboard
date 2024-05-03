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
        left: `${(SEGMENT_HEIGHT + 1) * index + 325}px`,
        bottom: '3px',
        background: index >= (TACHOMETER_SEGMENTS - 7) ? (index >= (TACHOMETER_SEGMENTS - 3) ? '#DA4D3F' : '#E6A325') : '#639D59',
        boxShadow: index >= (TACHOMETER_SEGMENTS - 7) ? (index >= (TACHOMETER_SEGMENTS - 3) ? '0 0 5px #DA4D3F' : '0 0 5px #E6A325') : '0 0 5px #639D59',
      }"
    ></div>

    <div
      v-for="index in 3"
      :style="{
        width: '35px',
        height: '55px',
        background: computeDigits(computedSpeed, true)[3 - index] === 10 ? '#0F1719' : '#3C2712',
        position: 'absolute',
        bottom: '25px',
        borderRadius: '10px',
        left: `-${(index - 1) * 40 + 260}px`,
        zIndex: '2',
        transform: 'skew(-5deg)',
        fontSize: '45px',
        'font-family': 'DSEG7-Classic-MINI',
        'font-weight': 'bold',
        color: '#E6A325',
      }"
    >
      <p style="margin-top: -6px; margin-left: -1px;">
        {{ computeDigits(computedSpeed, true)[3 - index] === 10 ? '' : computeDigits(computedSpeed, true)[3 - index] }}
      </p>
    </div>
    <div
      v-for="index in 2"
      :style="{
        width: '35px',
        height: '55px',
        background: computeDigits(computedRpm, true)[index] === 10 ? '#0F1719' : '#3C2712',
        position: 'absolute',
        bottom: '10px',
        borderRadius: '10px',
        left: `${index * 40 + 425}px`,
        zIndex: '2',
        transform: 'skew(-5deg)',
        fontSize: '45px',
        'font-family': 'DSEG7-Classic-MINI',
        'font-weight': 'bold',
        color: '#E6A325',
      }"
    >
      <p style="margin-top: -6px; margin-left: -1px;">
        {{ computeDigits(computedRpm, true)[index] === 10 ? '' : computeDigits(computedRpm, true)[index] }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ComputedRef } from 'vue'
// import TurnSignal from './TurnSignal.vue'
import useEngineController from '../composables/useEngineController'
import { useDashButtons } from '../composables/useDashButtons';
import useTripComputer from '../composables/useTripComputer'
import computeDigits from '../functions/useComputeDigits'
import useUnitComputation from '../composables/useUnitComputation'

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

const { showColonOnClock, hours, minutes, odometerValue } = useTripComputer(speed, trip)


const SPEEDOMETER_SEGMENTS = 34
const TACHOMETER_SEGMENTS = 31
const SEGMENT_HEIGHT = 7
const MAX_SPEED = 85

const computeSpeedIndexes = computed(() => Math.round(Math.min(speed.value / MAX_SPEED, 1) * SPEEDOMETER_SEGMENTS))
const computeRpmIndexes = computed(() => Math.round(rpm.value / MAX_RPM * TACHOMETER_SEGMENTS))

const computedSpeed = useUnitComputation(speed, speedometerMode) as ComputedRef<number>
const computedOdometerValue = useUnitComputation(odometerValue, speedometerMode) as ComputedRef<number[]>
const computedRpm = computed(() => Math.round(rpm.value / 100))
</script>

<style>
img {
  position: relative;
  top: -100px;
  z-index: 1;
  transform: rotate(1deg);
}
</style>