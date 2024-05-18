<template>
  <div>
    <img 
      v-show="speedometerMode === 'kph'"
      src="../assets/firebird/firebirdeu.svg" 
      alt="" 
      height="400rem"
      rel="preload"
    >
    <img 
      v-show="speedometerMode === 'mph'" 
      src="../assets/firebird/firebirdus.svg" 
      alt="" 
      height="400rem"
      rel="preload"
    >
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
          background: index >= (TACHOMETER_SEGMENTS - 7) ? (index >= (TACHOMETER_SEGMENTS - 3) ? '#DA4D3F' : '#E6A325') : '#a4e324',
          boxShadow: index >= (TACHOMETER_SEGMENTS - 7) ? (index >= (TACHOMETER_SEGMENTS - 3) ? '0 0 5px #DA4D3F' : '0 0 5px #E6A325') : '0 0 5px #289f2e',
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
</template>

<script setup lang="ts">
import { computed, ComputedRef } from 'vue'
import SegmentDisplay from './SegmentDisplay.vue'
import TurnSignal from './TurnSignal.vue'
import computeDigits from '../functions/useComputeDigits'
import useEngineController from '../composables/useEngineController'
import useTripComputer from '../composables/useTripComputer'
import { useDashButtons } from '../composables/useDashButtons'
import useHexToRGBA from '../functions/useHexToRGBA'
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

const computedSpeed = useUnitComputation(speed, speedometerMode) as ComputedRef<number>
const computedOdometerValue = useUnitComputation(odometerValue, speedometerMode) as ComputedRef<number[]>

const SEGMENT_HEIGHT = 35
const SEGMENT_WIDTH = 10
const SEGMENT_SPACING = 20

const DIGIT_HEIGHT = SEGMENT_HEIGHT * 2 + SEGMENT_WIDTH + 4
const DIGIT_WIDTH = SEGMENT_WIDTH * 2 + SEGMENT_HEIGHT + 1

const TOTAL_WIDTH = DIGIT_WIDTH * 3 + 1 + SEGMENT_SPACING * 2

const TACHOMETER_SEGMENTS = 24

const computeRpmIndexes = computed(() => Math.round(rpm.value / MAX_RPM * TACHOMETER_SEGMENTS))
</script>

<style>
img {
  z-index: 1;
}
</style>