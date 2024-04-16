<template>
  <div 
    v-for="(segment, index) in segmentListS2000.segments"
    style="position: relative;"
  >
    <Segment
      :segmentStyle="{
        ...computeSegmentColor(!!segmentListS2000.numbers[displayNumber][index]),
        ...segment, 
        position: 'absolute',
      }"
    />
  </div>
</template>

<script setup lang='ts'>
import Segment from './Segment.vue'
import hexToRGBA from '../functions/useHexToRGBA'

const props = defineProps<{
  displayNumber: number,
  carType: string,
  color: string,
  showOffSegments: boolean,
  dimensions: {
    // imagine vertical segment: |
    width: number,
    height: number
  }
}>()

const dimmedColor = hexToRGBA(props.color, 0.075)

const computeSegmentColor = (displayCondition: boolean) => {
  return {
    background:  displayCondition 
      ? props.color 
      : (props.showOffSegments ? dimmedColor : 'rgba(0, 0, 0, 0)'),
    'box-shadow': displayCondition 
      ? `0px 0px 20px ${props.color}` 
      : '',
  }
}

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
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  segments: [
    // top left
    {   
      'border-radius': '15px 0 0 0',
      height: `${props.dimensions.width}px`,
      width: `${props.dimensions.width}px`,
    },
    // top
    {
      height: `${props.dimensions.width}px`,
      width: `${props.dimensions.height}px`, 
      left: `${props.dimensions.width + 1}px`,
    },
    // top right
    {
      left: `${props.dimensions.width + props.dimensions.height + 2}px`,
      'border-radius': '0 15px 0 0',
      height: `${props.dimensions.width}px`,
      width: `${props.dimensions.width}px`,
    },
    // top left vertical
    {
      top: `${props.dimensions.width + 1}px`,
      height: `${props.dimensions.height - props.dimensions.width}px`,
      width: `${props.dimensions.width}px`,
    },
    // top right vertical
    {
      left: `${props.dimensions.width + props.dimensions.height + 2}px`,
      top: `${props.dimensions.width + 1}px`,
      height: `${props.dimensions.height - props.dimensions.width}px`,
      width: `${props.dimensions.width}px`,
    },
    // middle left
    {
      height: `${props.dimensions.width}px`,
      width: `${props.dimensions.width}px`,
      top: `${props.dimensions.height + 2}px`,
    },
    // middle
    {
      top: `${props.dimensions.height + 2}px`,
      height: `${props.dimensions.width}px`,
      width: `${props.dimensions.height}px`,
      left: `${props.dimensions.width + 1}px`,
    },
    // middle right
    {
      left: `${props.dimensions.width + props.dimensions.height + 2}px`,
      top: `${props.dimensions.height + 2}px`,
      height: `${props.dimensions.width}px`,
      width: `${props.dimensions.width}px`,
    },
    // bottom left vertical
    {
      top: `${props.dimensions.width + props.dimensions.height + 3}px`,
      height: `${props.dimensions.height - props.dimensions.width}px`,
      width: `${props.dimensions.width}px`,
    },
    // bottom right vertical
    {
      left: `${props.dimensions.width + props.dimensions.height + 2}px`,
      top: `${props.dimensions.width + props.dimensions.height + 3}px`,
      height: `${props.dimensions.height - props.dimensions.width}px`,
      width: `${props.dimensions.width}px`,
    },
    // bottom left
    {
      top: `${props.dimensions.height * 2 + 4}px`,
      'border-radius': '0 0 0 15px',
      height: `${props.dimensions.width}px`,
      width: `${props.dimensions.width}px`,
    },
    // bottom
    {
      top: `${props.dimensions.height * 2 + 4}px`,
      height: `${props.dimensions.width}px`,
      width: `${props.dimensions.height}px`,
      left: `${props.dimensions.width + 1}px`,
    },
    // bottom right
    {
      left: `${props.dimensions.width + props.dimensions.height + 2}px`,
      'border-radius': '0 0 15px 0',
      top: `${props.dimensions.height * 2 + 4}px`,
      height: `${props.dimensions.width}px`,
      width: `${props.dimensions.width}px`,
    },
  ],
}
</script>
