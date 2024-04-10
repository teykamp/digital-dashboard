<template>
  <div 
    v-for="(segment, index) in segmentListS2000.segments"
    style="position: relative;"
  >
    <Segment
      v-if="segmentListS2000.numbers[displayNumber][index]"
      :segmentStyle="segment"
      style="position: absolute;"
    />
  </div>
</template>

<script setup lang='ts'>
import Segment from './Segment.vue'

const props = defineProps<{
  displayNumber: number,
  carType: string,
  color: string,
}>()

// imagine vertical segment: |
const SEGMENT_WIDTH = 10
const SEGMENT_HEIGHT = 35

const segmentListS2000 = {
  numbers: [
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    [0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1],
    [1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1],
    [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1],
    [1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
  ],
  segments: [
    // top left
    {
      'box-shadow': '0px 0px 20px red',
      background: props.color,
      left: `-${SEGMENT_WIDTH + 1}px`,
      'border-radius': '15px 0 0 0',
      height: `${SEGMENT_WIDTH}px`,
      width: `${SEGMENT_WIDTH}px`,
    },
    // top
    {
      'box-shadow': '0px 0px 20px red',
      background: props.color,
      height: `${SEGMENT_WIDTH}px`,
      width: `${SEGMENT_HEIGHT}px`,

    },
    // top right
    {
      'box-shadow': '0px 0px 20px red',
      background: props.color,
      left: `${SEGMENT_HEIGHT + 1}px`,
      'border-radius': '0 15px 0 0',
      height: `${SEGMENT_WIDTH}px`,
      width: `${SEGMENT_WIDTH}px`,
    },
    // top left vertical
    {
      'box-shadow': '0px 0px 20px red',
      background: props.color,
      left: `-${SEGMENT_WIDTH + 1}px`,
      top: `${SEGMENT_WIDTH + 1}px`,
      height: `${SEGMENT_HEIGHT - SEGMENT_WIDTH}px`,
      width: `${SEGMENT_WIDTH}px`,
    },
    // top right vertical
    {
      'box-shadow': '0px 0px 20px red',
      background: props.color,
      left: `${SEGMENT_HEIGHT + 1}px`,
      top: `${SEGMENT_WIDTH + 1}px`,
      height: `${SEGMENT_HEIGHT - SEGMENT_WIDTH}px`,
      width: `${SEGMENT_WIDTH}px`,
    },
    // middle left
    {
      height: `${SEGMENT_WIDTH}px`,
      width: `${SEGMENT_WIDTH}px`,
      'box-shadow': '0px 0px 20px red',
      background: props.color,
      top: `${SEGMENT_HEIGHT + 2}px`,
      left: `-${SEGMENT_WIDTH + 1}px`,
    },
    // middle
    {
      'box-shadow': '0px 0px 20px red',
      background: props.color,
      top: `${SEGMENT_HEIGHT + 2}px`,
      height: `${SEGMENT_WIDTH}px`,
      width: `${SEGMENT_HEIGHT}px`,
    },
    // middle right
    {
      'box-shadow': '0px 0px 20px red',
      background: props.color,
      left: `${SEGMENT_HEIGHT + 1}px`,
      top: `${SEGMENT_HEIGHT + 2}px`,
      height: `${SEGMENT_WIDTH}px`,
      width: `${SEGMENT_WIDTH}px`,
    },
    // bottom left vertical
    {
      'box-shadow': '0px 0px 20px red',
      background: props.color,
      left: `-${SEGMENT_WIDTH + 1}px`,
      top: `${SEGMENT_WIDTH + SEGMENT_HEIGHT + 3}px`,
      height: `${SEGMENT_HEIGHT - SEGMENT_WIDTH}px`,
      width: `${SEGMENT_WIDTH}px`,
    },
    // bottom right vertical
    {
      'box-shadow': '0px 0px 20px red',
      background: props.color,
      left: `${SEGMENT_HEIGHT + 1}px`,
      top: `${SEGMENT_WIDTH + SEGMENT_HEIGHT + 3}px`,
      height: `${SEGMENT_HEIGHT - SEGMENT_WIDTH}px`,
      width: `${SEGMENT_WIDTH}px`,
    },
    // bottom left
    {
      'box-shadow': '0px 0px 20px red',
      background: props.color,
      top: `${SEGMENT_HEIGHT * 2 + 4}px`,
      left: `-${SEGMENT_WIDTH + 1}px`,
      'border-radius': '0 0 0 15px',
      height: `${SEGMENT_WIDTH}px`,
      width: `${SEGMENT_WIDTH}px`,
    },
    // bottom
    {
      'box-shadow': '0px 0px 20px red',
      background: props.color,
      top: `${SEGMENT_HEIGHT * 2 + 4}px`,
      height: `${SEGMENT_WIDTH}px`,
      width: `${SEGMENT_HEIGHT}px`,
    },
    // bottom right
    {
      'box-shadow': '0px 0px 20px red',
      background: props.color,
      left: `${SEGMENT_HEIGHT + 1}px`,
      'border-radius': '0 0 15px 0',
      top: `${SEGMENT_HEIGHT * 2 + 4}px`,
      height: `${SEGMENT_WIDTH}px`,
      width: `${SEGMENT_WIDTH}px`,
    },
  ],
}
</script>
