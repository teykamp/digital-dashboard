<template>
  <div>
    <div
    :style="{
            background: 'orange',
            height: '84px',
            width: '196px',
            'padding-left': '11px',
          }"
    >
      <div 
        v-for="index in 3"
        :style="{
            // transform: 'skew(-10deg)',
            'padding-left': `${(index - 1) * 75}px`,
            background: 'orange',
      
          }"
      >
        <SegmentDisplay 
          :display-number="computeDigits(speed)[index - 1]"
          :car-type="'S2000'"
          :color="'red'"
          :dimensions="{
            width: SEGMENT_WIDTH,
            height: SEGMENT_HEIGHT
          }"
        />
      </div>
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

</script>