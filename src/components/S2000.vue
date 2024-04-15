<template>
  <!-- <div style="position: relative;"> -->
    <!-- S2K GAUGES -->
    <!-- <img 
      src="../assets/s2k.svg"
      style="width: 1200px; position: absolute; left: -475px; top: -120px;"
    > -->

    <!--  -->

    <!-- SPEEDOMETER -->
    <div
      :style="{
        // transform: 'skew(-10deg)',
        background: '#110000',
        height: `${DIGIT_HEIGHT}px`,
        width: `${TOTAL_WIDTH}px`,
        padding: '15px',
        position: 'absolute',
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
          :color="'#FC1E3E'"
          :show-off-segments="false"
          :dimensions="{
            width: SEGMENT_WIDTH,
            height: SEGMENT_HEIGHT
          }"
        />
      </div>
    </div>
<!-- 
    <svg width="400" height="400">
      <path ref="curve" d="M50 100 Q200 50 350 100" fill="none"/>
      <mask :id="maskId">
        <rect x="0" y="0" width="100%" height="100%" fill="black" />
        <path :d="maskPath" fill="white" />
      </mask>
      <path :d="revealedPath" fill="none" stroke="red" stroke-width="20" :mask="`url(#${maskId})`" />
    </svg>
  </div> -->

  <div
    v-for="index in computeRpmIndexes"
    :style="{
      position: 'absolute',
      left: `${-300 * Math.cos(index / 25 + 0.65) + 500}px`,
      top: `${-300 * Math.sin(index / 25 + 0.65) + 500}px`,
      rotate: `${index / 25 + Math.PI / 2 + 0.65}rad`,
      height: '30px',
      width: '7px',
      background: index >= 41 ? 'red' : 'orange',
      boxShadow: index >= 41 ? '0 0 10px red' : '0 0 10px orange',
    }"
  >
  </div>
</template>

<script setup lang="ts">
import SegmentDisplay from './SegmentDisplay.vue'
import computeDigits from '../functions/useComputeDigits'
import useEngineController from '../composables/useEngineController'

const { speed, rpm } = useEngineController()

const SEGMENT_HEIGHT = 35
const SEGMENT_WIDTH = 10
const SEGMENT_SPACING = 20

const DIGIT_HEIGHT = SEGMENT_HEIGHT * 2 + SEGMENT_WIDTH + 4
const DIGIT_WIDTH = SEGMENT_WIDTH * 2 + SEGMENT_HEIGHT + 1

const TOTAL_WIDTH = DIGIT_WIDTH * 3 + 1 + SEGMENT_SPACING * 2


import { ref, computed } from 'vue';

const computeRpmIndexes = computed(() => Math.round(rpm.value / 8000 * 45)
)


const maskId = 'mask';
const curve = ref<SVGPathElement | null>(null);


const maskPath = computed(() => {
  const path = curve.value;
  if (!path) return '';
  const pathLength = path.getTotalLength();
  const revealLength = (rpm.value / 8000 + 0.16) * pathLength; // Adjust the 100 for the reveal speed
  return `M0 0 L${revealLength} 0 L${revealLength} 400 L0 800 Z`;
});

const revealedPath = computed(() => {
  const path = curve.value;
  if (!path) return '';
  return path.getAttribute('d') ?? ''; // Use optional chaining operator (?.) and nullish coalescing operator (??)
});

</script>