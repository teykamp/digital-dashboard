<template>
  <div
    :style="{
      background: '#110000',
      height: `${TOTAL_HEIGHT}px`,
      width: `${(TOTAL_WIDTH) * 3 + SPACING_BETWEEN_SEGMENTS - 9}px`,
    }"
  >
    <div 
      v-for="index in 3"
      :style="{
          // transform: 'skew(-10deg)',
          'padding-left': `${(index - 1) * SPACING_BETWEEN_SEGMENTS}px`,
        }"
    >
      <SegmentDisplay 
        :display-number="computeDigits(speed)[index - 1]"
        :car-type="'S2000'"
        :color="'#FC1E3E'"
        :dimensions="{
          width: SEGMENT_WIDTH,
          height: SEGMENT_HEIGHT
        }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import SegmentDisplay from './SegmentDisplay.vue'
import computeDigits from '../functions/useComputeDigits'
import useEngineController from '../composables/useEngineController'

const { speed } = useEngineController()

const SEGMENT_HEIGHT = 35
const SEGMENT_WIDTH = 10
const SPACING_BETWEEN_SEGMENTS = SEGMENT_HEIGHT + 2 * SEGMENT_WIDTH + 20

const TOTAL_HEIGHT = SEGMENT_HEIGHT * 2 + SEGMENT_WIDTH + 4
const TOTAL_WIDTH = SEGMENT_WIDTH + SEGMENT_HEIGHT + 2

</script>