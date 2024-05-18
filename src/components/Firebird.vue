<template>
  <div>
    <img style="z-index: 2;"
      v-show="speedometerMode === 'kph'"
      src="../assets/firebird/firebirdeu.svg" 
      alt="" 
      height="400rem"
      rel="preload"
    >
    <img style="z-index: 2;"
      v-show="speedometerMode === 'mph'" 
      src="../assets/firebird/firebirdus.svg" 
      alt="" 
      height="400rem"
      rel="preload"
    >
  </div>

  <div style="position: absolute;">
  <img style="top: -470px; left: 104px; z-index: 0;" src="../assets/firebird/back.svg" height="180rem">
  </div>

  <div style="position:absolute;">
  <p :style="{
        position: 'relative',
        'font-family': 'DSEG7-Classic-MINI',
        'font-weight': 'bold',
        color: '#ffb497',
        fontSize: '45px',
        transform: 'scaleX(1.5) scaleY(.8)',
        top: '-520px',
        left: '345px',
        zIndex: '99',
        textAlign: 'right',
        width: '140px',
      }">{{ Math.round(computedSpeed) }}</p>
      </div>


<div :style="{
      position: 'relative',
      top: '-248px',
      left: '335px',
      zIndex: '0'
    }">
      <div
        v-for="index in computeRpmIndexes"
        :style="{
          position: 'absolute',
          left: `${-220 * Math.cos(index / 18 + 0.19)}px`,
          top: `${-220 * Math.sin(index / 18 + 0.35)}px`,
          rotate: `${index / 12 + Math.PI / 3.6 + 0.60}rad`,
          height: '95px',
          width: '4px',
          background: index >= (TACHOMETER_SEGMENTS - 7) ? (index >= (TACHOMETER_SEGMENTS - 5) ? '#DA4D3F' : '#E6A325') : '#a4e324',
          boxShadow: index >= (TACHOMETER_SEGMENTS - 7) ? (index >= (TACHOMETER_SEGMENTS - 5) ? '0 0 5px #DA4D3F' : '0 0 5px #E6A325') : '0 0 5px #289f2e',
        }"
      ></div>
    </div>

<div style="position:absolute;">
<div
    style="position: relative; display: flex; justify-content: space-between; width: 200px; margin-top: -330px; z-index: 99; left: 355px; scale: 0.6;"
  >
  <TurnSignal
    v-for="index in 2" 
    :style="{
      opacity: signals[index - 1] ? 1 : 0
    }"
    :direction="index === 1 ? 'left' : 'right'" 
  />
  </div>
</div>

<div style="position: relative;">
  <img v-show="rpm >= 2500" src="../assets/firebird/upshift.svg"
   style="position: absolute; height: 50px; left: 50px; top: -480px;">
</div>
</template>

<script setup lang="ts">
import { computed, ComputedRef } from 'vue'
import TurnSignal from './TurnSignal.vue'
import useEngineController from '../composables/useEngineController'
import useTripComputer from '../composables/useTripComputer'
import { useDashButtons } from '../composables/useDashButtons'
import useUnitComputation from '../composables/useUnitComputation'

const { speed, rpm, MAX_RPM } = useEngineController()

const { trip, speedometerMode, toggleSpeedometerMode, signals } = useDashButtons([
  {
    keyCode: 'KeyU',
    action: () => toggleSpeedometerMode()
  }
])

const { odometerValue } = useTripComputer(speed, trip)

const computedSpeed = useUnitComputation(speed, speedometerMode) as ComputedRef<number>
const computedOdometerValue = useUnitComputation(odometerValue, speedometerMode) as ComputedRef<number[]>

const TACHOMETER_SEGMENTS = 24

const computeRpmIndexes = computed(() => Math.round((800 + rpm.value) / MAX_RPM * TACHOMETER_SEGMENTS))
</script>

<style scoped>
/* img {
  z-index: 1;
} */
</style>