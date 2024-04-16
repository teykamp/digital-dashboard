<template>
  <div style="position: relative;">
    <div
      :style="{
        // transform: 'skew(-10deg)',
        background: '#110000',
        height: `${DIGIT_HEIGHT}px`,
        width: `${TOTAL_WIDTH}px`,
        padding: '15px',
        position: 'absolute',
        borderRadius: '10px',
      }"
    >
      <div 
        v-for="index in 3"
        :style="{
            'padding-left': `${(index - 1) * (DIGIT_WIDTH + SEGMENT_SPACING)}px`,
          }"
      >
        <SegmentDisplay
          :display-number="computeDigits(speed, true)[index - 1]"
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
    
    <div
      :style="{
        top: `${DIGIT_HEIGHT + 30 + 10}px`,
        position: 'absolute',
        background: '#110000',
        width: `${TOTAL_WIDTH + 30}px`,
        height: `${DIGIT_HEIGHT / 2 + 7}px`,
        borderRadius: '10px',
        'font-family': 'DSEG7-Classic-MINI',
        'font-weight': 'bold',
        fontStyle: 'italic',
        color: '#fc5f40',
      }"
    >
      <p style="margin-top: 0px">76F {{ hours }}{{ showColonOnClock ? ':' : ' ' }}{{  minutes }}</p>
      <div style="background: #fc5f40; height: 1px; width: 98%; margin-top: -16px; margin-left: 1%"></div>
      <p style="margin-top: -1px">456</p>
    </div>

  <!-- This should be its own component -->
    <div
      v-for="index in computeRpmIndexes"
      :style="{
        position: 'absolute',
        left: `${-300 * Math.cos(index / 25 + 0.65)}px`,
        top: `${-300 * Math.sin(index / 25 + 0.65)}px`,
        rotate: `${index / 25 + Math.PI / 2 + 0.65}rad`,
        height: '30px',
        width: '7px',
        background: index >= (TACHOMETER_SEGMENTS - 5) ? 'red' : 'orange',
        boxShadow: index >= (TACHOMETER_SEGMENTS - 5) ? '0 0 10px red' : '0 0 10px orange',
      }"
    >
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import SegmentDisplay from './SegmentDisplay.vue'
import computeDigits from '../functions/useComputeDigits'
import useEngineController from '../composables/useEngineController'
import useTripComputer from '../composables/useTripComputer'

const { speed, rpm, MAX_RPM } = useEngineController()

const { showColonOnClock, hours, minutes } = useTripComputer()

const SEGMENT_HEIGHT = 35
const SEGMENT_WIDTH = 10
const SEGMENT_SPACING = 20

const DIGIT_HEIGHT = SEGMENT_HEIGHT * 2 + SEGMENT_WIDTH + 4
const DIGIT_WIDTH = SEGMENT_WIDTH * 2 + SEGMENT_HEIGHT + 1

const TOTAL_WIDTH = DIGIT_WIDTH * 3 + 1 + SEGMENT_SPACING * 2

const TACHOMETER_SEGMENTS = 45

const computeRpmIndexes = computed(() => Math.round(rpm.value / MAX_RPM * TACHOMETER_SEGMENTS))
</script>