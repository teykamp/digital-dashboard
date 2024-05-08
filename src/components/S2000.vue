<template>
  <div>
    <img 
      v-show="speedometerMode === 'kph'"
      src="../assets/S2000/ap1kph.svg" 
      alt="" 
      height="400rem">
    <img 
      v-show="speedometerMode === 'mph'" 
      src="../assets/S2000/ap1mph.svg" 
      alt="" 
      height="400rem"
    >
  </div>

  <div style="position: absolute;">
    <div
      :style="{
        background: '#110000',
        height: `${DIGIT_HEIGHT}px`,
        width: `${TOTAL_WIDTH}px`,
        padding: '15px',
        paddingLeft: '20px',
        position: 'absolute',
        borderRadius: '10px',
        zIndex: '2',
        left: '500px',
        top: '-400px'
      }"
    >
      <div 
        v-for="index in 3"
        :style="{
          transform: 'skew(-5deg)',
          'padding-left': `${(index - 1) * (DIGIT_WIDTH + SEGMENT_SPACING)}px`,
        }"
      >
        <SegmentDisplay
          :display-number="computeDigits(computedSpeed, true)[index - 1]"
          :car-type="'S2000'"
          :color="'#fc5f40'"
          :show-off-segments="true" 
          :dimensions="{
            width: SEGMENT_WIDTH,
            height: SEGMENT_HEIGHT
          }"
        />
      </div>
    </div>
    
    <div :style="{
      position: 'absolute',
      top: '-400px'
    }">
    <div
      :style="{
        top: `${DIGIT_HEIGHT + 30 + 10}px`,
        position: 'absolute',
        background: '#110000',
        width: `${TOTAL_WIDTH + 35}px`,
        height: `${DIGIT_HEIGHT / 2 + 7}px`,
        borderRadius: '10px',
        'font-family': 'DSEG7-Classic-MINI',
        'font-weight': 'bold',
        fontStyle: 'italic',
        color: '#fc5f40',
        left: '500px',
        zIndex: '2'
      }"
    >
      
      <p style="margin-top: 0px">{{ hours.toString().padStart(2, '0') }}{{ showColonOnClock ? ':' : ' ' }}{{  minutes.toString().padStart(2, '0') }}</p>
      <div style="background: #fc5f40; height: 1px; width: 98%; margin-top: -16px; margin-left: 1%"></div>
      <div style="margin-top: -16px; display: flex; justify-content: space-between; padding-left: 10px; padding-right: 10px;">
        
        <p>{{ Math.floor(computedOdometerValue[0]).toString().padStart(6, '0') }}</p>
        <p :style="{
          fontFamily: 'Arial, Helvetica, sans-serif', 
          fontStyle: 'normal',
          color: useHexToRGBA('#fc5f40', 0.9),
        }"
        >TRIP {{ trip === 1 ? 'A' : 'B' }}</p>
        <p>{{ (Math.round(computedOdometerValue[trip] * 10) / 10).toFixed(1) }}</p>
      </div>
    </div>
  </div>

  <!-- This should be its own component -->
    <div :style="{
      position: 'absolute',
      top: '-150px',
      left: '650px',
      zIndex: '2'
    }">
      <div
        v-for="index in computeRpmIndexes"
        :style="{
          position: 'absolute',
          left: `${-550 * Math.cos(index / 25 + 0.65)}px`,
          top: `${-380 * Math.sin(index / 25 + 0.65)}px`,
          rotate: `${index / 25 + Math.PI / 2 + 0.65}rad`,
          height: '30px',
          width: '9px',
          background: index >= (TACHOMETER_SEGMENTS - 2) ? 'red' : 'orange',
          boxShadow: index >= (TACHOMETER_SEGMENTS - 2) ? '0 0 10px red' : '0 0 10px orange',
        }"
      ></div>
    </div>
  </div>
  <div
    style="position: relative; display: flex; justify-content: space-between; width: 500px; margin-top: -400px; z-index: 99; left: 370px; scale: 0.7;"
  >
  <TurnSignal
    v-for="index in 2" 
    :style="{
      opacity: signals[index - 1] ? 1 : 0
    }"
    :direction="index === 1 ? 'left' : 'right'" 
  />
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
img {
  position: relative;
  top: -200px;
  z-index: 1;
}
</style>