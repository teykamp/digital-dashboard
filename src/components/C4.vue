<template>
  <div style="position: relative;">
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
    <div :style="{
      position: 'absolute',
      height: '270px',
      width: '260px',
      top: '-30px',
      left: '15px',
      background: '#203a2c',
    }"></div>
    <div :style="{
      position: 'absolute',
      height: '270px',
      width: '167px',
      top: '-25px',
      left: '850px',
      background: '#203a2c',
    }"></div>
    <div :style="{
      position: 'absolute',
      height: '270px',
      width: '32px',
      top: '-25px',
      left: '1017px',
      background: '#7f5b28',
    }"></div>
    <div :style="{
      position: 'absolute',
      height: '270px',
      width: '35px',
      top: '-25px',
      left: '1049px',
      background: '#6b2f27',
    }"></div>
  </div>
  
  <div style="position: relative; margin-top: -60px; left: 10px; top: -100px">
    <div 
      v-for="index in computeSpeedIndexes"
      :style="{
        position: 'absolute',
        height: `${SEGMENT_HEIGHT}px`,
        width: '260px',
        left: '10px',
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
      <!-- following should be componentized -->
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
  <div
    :style="{
      position: 'relative',
      height: '30px',
      width: '70px',
      borderRadius: '10px',
      background: '#3C2712',
      top: '-424px',
      left: '402px',
      zIndex: '2',
      'font-family': 'DSEG7-Classic-MINI',
      'font-weight': 'bold',
      color: '#E6A325',
      fontSize: '25px',
      transform: 'skew(-5deg)',
    }"
  ><p style="margin-top: 0px; transform: translateY(-4px); text-align: right; margin-right: 4px;">
    {{ computeOilTemp }}
  </p></div>
  <div
    :style="{
      position: 'relative',
      height: '30px',
      width: '70px',
      borderRadius: '10px',
      background: '#3C2712',
      top: '-452px',
      left: '645px',
      zIndex: '2',
      'font-family': 'DSEG7-Classic-MINI',
      'font-weight': 'bold',
      color: '#E6A325',
      fontSize: '25px',
      transform: 'skew(-5deg)',
    }"
  ><p style="margin-top: 0px; transform: translateY(-4px); text-align: right; margin-right: 4px;">
    {{ computeCoolantTemp }}
  </p></div>
  <div
    :style="{
      position: 'relative',
      height: '30px',
      width: '88px',
      borderRadius: '10px',
      background: '#3C2712',
      top: '-384px',
      left: '393px',
      zIndex: '2',
      'font-family': 'DSEG7-Classic-MINI',
      'font-weight': 'bold',
      color: '#E6A325',
      fontSize: '25px',
      transform: 'skew(-5deg)',
    }"
  ><p style="margin-top: 0px; transform: translateY(-4px); text-align: right; margin-right: 4px;">
    {{ computedOdometerValue[1].toFixed(1) }}
  </p></div>
  <div style="position: relative;">
    <img
      v-show="rpm >= 2500"
      src="../assets/C4/upshift.svg"
      style="position: absolute; height: 80px; left: 820px; top: -460px;"
    >
    <img
      v-show="gear >= 4"
      src="../assets/C4/od.svg"
      style="position: absolute; height: 25px; left: 993px; top: -315px;"
    >
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

const { speed, rpm, gear } = useEngineController()
const { trip, speedometerMode, toggleSpeedometerMode, signals } = useDashButtons([
  {
    keyCode: 'KeyU',
    action: () => toggleSpeedometerMode()
  }
])

const { odometerValue } = useTripComputer(speed, trip)

const SPEEDOMETER_SEGMENTS = 34
const TACHOMETER_SEGMENTS = 31
const SEGMENT_HEIGHT = 7
const MAX_SPEED = 85
const MAX_TACHOMETER = 6000

const computeSpeedIndexes = computed(() => Math.round(Math.min(speed.value / MAX_SPEED, 1) * SPEEDOMETER_SEGMENTS))
const computeRpmIndexes = computed(() => Math.round(Math.min(rpm.value / MAX_TACHOMETER, 1) * TACHOMETER_SEGMENTS))

const computedSpeed = useUnitComputation(speed, speedometerMode) as ComputedRef<number>
const computedOdometerValue = useUnitComputation(odometerValue, speedometerMode) as ComputedRef<number[]>
const computedRpm = computed(() => Math.round(rpm.value / 100))
const computeOilTemp = computed(() => speedometerMode.value === 'mph' ? '202' : '94')
const computeCoolantTemp = computed(() => speedometerMode.value === 'mph' ? '198' : '92')
</script>

<style>
img {
  position: relative;
  top: -100px;
  z-index: 1;
  transform: rotate(1deg);
}
</style>