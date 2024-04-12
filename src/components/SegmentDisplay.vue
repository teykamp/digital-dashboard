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
  dimensions: {
    // imagine vertical segment: |
    width: number,
    height: number
  }
}>()


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
      left: `-${props.dimensions.width + 1}px`,
      'border-radius': '15px 0 0 0',
      height: `${props.dimensions.width}px`,
      width: `${props.dimensions.width}px`,
    },
    // top
    {
      'box-shadow': '0px 0px 20px red',
      background: props.color,
      height: `${props.dimensions.width}px`,
      width: `${props.dimensions.height}px`,

    },
    // top right
    {
      'box-shadow': '0px 0px 20px red',
      background: props.color,
      left: `${props.dimensions.height + 1}px`,
      'border-radius': '0 15px 0 0',
      height: `${props.dimensions.width}px`,
      width: `${props.dimensions.width}px`,
    },
    // top left vertical
    {
      'box-shadow': '0px 0px 20px red',
      background: props.color,
      left: `-${props.dimensions.width + 1}px`,
      top: `${props.dimensions.width + 1}px`,
      height: `${props.dimensions.height - props.dimensions.width}px`,
      width: `${props.dimensions.width}px`,
    },
    // top right vertical
    {
      'box-shadow': '0px 0px 20px red',
      background: props.color,
      left: `${props.dimensions.height + 1}px`,
      top: `${props.dimensions.width + 1}px`,
      height: `${props.dimensions.height - props.dimensions.width}px`,
      width: `${props.dimensions.width}px`,
    },
    // middle left
    {
      height: `${props.dimensions.width}px`,
      width: `${props.dimensions.width}px`,
      'box-shadow': '0px 0px 20px red',
      background: props.color,
      top: `${props.dimensions.height + 2}px`,
      left: `-${props.dimensions.width + 1}px`,
    },
    // middle
    {
      'box-shadow': '0px 0px 20px red',
      background: props.color,
      top: `${props.dimensions.height + 2}px`,
      height: `${props.dimensions.width}px`,
      width: `${props.dimensions.height}px`,
    },
    // middle right
    {
      'box-shadow': '0px 0px 20px red',
      background: props.color,
      left: `${props.dimensions.height + 1}px`,
      top: `${props.dimensions.height + 2}px`,
      height: `${props.dimensions.width}px`,
      width: `${props.dimensions.width}px`,
    },
    // bottom left vertical
    {
      'box-shadow': '0px 0px 20px red',
      background: props.color,
      left: `-${props.dimensions.width + 1}px`,
      top: `${props.dimensions.width + props.dimensions.height + 3}px`,
      height: `${props.dimensions.height - props.dimensions.width}px`,
      width: `${props.dimensions.width}px`,
    },
    // bottom right vertical
    {
      'box-shadow': '0px 0px 20px red',
      background: props.color,
      left: `${props.dimensions.height + 1}px`,
      top: `${props.dimensions.width + props.dimensions.height + 3}px`,
      height: `${props.dimensions.height - props.dimensions.width}px`,
      width: `${props.dimensions.width}px`,
    },
    // bottom left
    {
      'box-shadow': '0px 0px 20px red',
      background: props.color,
      top: `${props.dimensions.height * 2 + 4}px`,
      left: `-${props.dimensions.width + 1}px`,
      'border-radius': '0 0 0 15px',
      height: `${props.dimensions.width}px`,
      width: `${props.dimensions.width}px`,
    },
    // bottom
    {
      'box-shadow': '0px 0px 20px red',
      background: props.color,
      top: `${props.dimensions.height * 2 + 4}px`,
      height: `${props.dimensions.width}px`,
      width: `${props.dimensions.height}px`,
    },
    // bottom right
    {
      'box-shadow': '0px 0px 20px red',
      background: props.color,
      left: `${props.dimensions.height + 1}px`,
      'border-radius': '0 0 15px 0',
      top: `${props.dimensions.height * 2 + 4}px`,
      height: `${props.dimensions.width}px`,
      width: `${props.dimensions.width}px`,
    },
  ],
}
</script>
