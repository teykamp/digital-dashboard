<template>
  <div style="position: relative;">
    <div
      v-for="index in TACHOMETER_SEGMENTS"
      :style="{
        position: 'absolute',
        height: `${tachometerHeight[0][index] + 10}px`,
        width: '10px',
        background: index === computeRpmIndexes ? 'red' : 'green',
        left: `${index * 15}px`,
        bottom: 0,
      }"
    >
    </div>
    <div v-if="rpm > 5000">
      <div
        v-for="index in TACHOMETER_SEGMENTS"
        :style="{
          position: 'absolute',
          height: `${(tachometerHeight[0][index] - 15) * 1.5 + 30}px`,
          width: '10px',
          background: index === computeRpmIndexes ? 'red' : 'green',
          left: `${index * 15}px`,
          bottom: 0,
        }"
      >
      </div>
    </div>
    <div v-if="rpm > 6500">
      <div
        v-for="index in TACHOMETER_SEGMENTS"
        :style="{
          position: 'absolute',
          height: `${(tachometerHeight[0][index] - 20) * 3 + 30}px`,
          width: '10px',
          background: index === computeRpmIndexes ? 'red' : 'green',
          left: `${index * 15}px`,
          bottom: 0,
        }"
      >
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { computed } from 'vue'
import useEngineController from '../composables/useEngineController'

const TACHOMETER_SEGMENTS = 38
const MAX_TACHOMETER = 8000

const { speed, rpm, gear } = useEngineController()

const computeRpmIndexes = computed(() => Math.round(Math.min(rpm.value / MAX_TACHOMETER, 1) * TACHOMETER_SEGMENTS))

const tachometerHeight = [
  [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 53, 54, 55, 56, 57, 58, 59, 60, 60, 60, 59, 58, 57, 56, 55, 54, 53, 52],
  [],
  [],
]
</script>