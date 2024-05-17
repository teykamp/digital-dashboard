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

const TACHOMETER_SEGMENTS = 45

const computeRpmIndexes = computed(() => Math.round(rpm.value / MAX_RPM * TACHOMETER_SEGMENTS))
</script>

<style>

</style>