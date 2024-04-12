<template>
  <div>
    <img src="../assets/s2k.svg" alt=""
    height="400rem">
    
  </div>

  <div>
    <div
      :style="{
        // transform: 'skew(-10deg)',
        background: '#110000',
        // height: `${DIGIT_HEIGHT}px`,
        // width: `${TOTAL_WIDTH}px`,
        height: `90px`,
        width: `260px`,
        padding: '15px',
        position: 'absolute',
        top: '250px',
        left: '528px',
        zIndex: '0'
      }"
    >
      <div 
        v-for="index in 3"
        :style="{
            'padding-left': `${(index - 1) * (DIDGIT_WIDTH + SEGMENT_SPACING)}px`,
          }"
      >
        <SegmentDisplay
          :display-number="computeDigits(speed, true)[index - 1]"
          :car-type="'S2000'"
          :color="'#FC1E3E'"
          :show-off-segments="false"
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
const SEGMENT_SPACING = 20

const DIGIT_HEIGHT = SEGMENT_HEIGHT * 2 + SEGMENT_WIDTH + 4
const DIDGIT_WIDTH = SEGMENT_WIDTH * 2 + SEGMENT_HEIGHT + 1

const TOTAL_WIDTH = DIDGIT_WIDTH * 3 + 1 + SEGMENT_SPACING * 2

</script>

<style>
img{
  position: relative;
  z-index: 2;
}
</style>