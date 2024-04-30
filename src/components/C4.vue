<template>
  <div style="position: relative; margin-top: 200px;">
    <div 
      v-for="index in computeSpeedIndexes"
      :style="{
        position: 'absolute',
        height: `${SEGMENT_HEIGHT}px`,
        width: '50px',
        background: 'darkgreen',
        bottom: `${(SEGMENT_HEIGHT + 1) * index}px`
      }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import useEngineController from '../composables/useEngineController'
// import useTripComputer from '../composables/useTripComputer'

import { computed } from 'vue'
// import TurnSignal from './TurnSignal.vue'

const { speed, rpm, MAX_RPM } = useEngineController()


const SPEEDOMETER_SEGMENTS = 30
const TACHOMETER_SEGMENTS = 26
const SEGMENT_HEIGHT = 7
const MAX_SPEED = 85

const computeSpeedIndexes = computed(() => Math.round(Math.min(MAX_SPEED, speed.value / MAX_SPEED) * SPEEDOMETER_SEGMENTS))
</script>