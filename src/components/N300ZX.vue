<template>
  <div style="position:absolute;">
    <img style="position:relative; z-index: 5; left: 803px; top: -31px;"
        v-show="signals[1]" 
        src="../assets/N300ZX/right.svg" 
        alt="" 
        height="20rem"
      >
  </div>

  <div style="position:absolute;">
  <img style="position:relative; z-index: 5; left: 248px; top: -33px;"
        v-show="signals[0]" 
        src="../assets/N300ZX/left.svg" 
        alt="" 
        height="20rem"
      >
    </div>

    <div style="position:absolute;">
    <img style="position:relative; z-index: 5; left: 650px; top: -90px;"
        v-show="showHighBeams" 
        src="../assets/N300ZX/highbeam.svg" 
        alt="" 
        height="20rem"
      >
    </div>

  <div style="position: relative;">
    <div>
      <img
        v-show="speedometerMode === 'mph'" 
        src="../assets/N300ZX/n300zxus.svg"
        alt="" 
        height="400rem"
        rel="preload"
      >
      <img
        v-show="speedometerMode === 'kph'" 
        src="../assets/N300ZX/n300zxeu.svg" 
        alt="" 
        height="400rem"
        rel="preload"
      >
    </div>

    <div style="position:absolute; top: 255px; left: 65px;">
      <div style="margin-top: -16px; display: flex; justify-content: space-between; padding-left: 10px; padding-right: 10px;">
        
        <p :style="{
          fontFamily: 'Courier New, Courier, monospace', 
          fontStyle: 'normal',
          fontWeight: 'bold',
          transform: 'skew(5deg)',
          letterSpacing: '8px',
          color: useHexToRGBA('#8a8381', 0.9),
        }">{{ Math.floor(computedOdometerValue[0]).toString().padStart(6, '0') }}</p>
      </div>
    </div>

      <p :style="{
        position: 'absolute',
        'font-family': 'DSEG7-Classic-MINI',
        'font-weight': 'bold',
        color: '#159951',
        fontSize: '45px',
        transform: 'skew(-20deg)',
        bottom: '338px',
        left: '375px',
        textAlign: 'right',
        width: '140px',
      }">{{ Math.round(computedSpeed) }}</p>
      <p :style="{
        position: 'absolute',
        'font-family': 'DSEG7-Classic-MINI',
        'font-weight': 'bold',
        color: '#159951',
        fontSize: '25px',
        transform: 'skew(-20deg)',
        bottom: '280px',
        left: '255px',
        textAlign: 'right',
        width: '140px',
      }">{{ Math.round(rpm / 100) }}</p>
    <div
      v-for="index in TACHOMETER_SEGMENTS"
      :style="{
        position: 'absolute',
        height: '5px',
        width: '5px',
        background: '#159951',
        left: `${index * 10 + 327}px`,
        bottom: '225px',
        boxShadow: '0 0 5px #159951',
        opacity: [1, 6, 11, 16, 21, 27, 31, 35, 37, 39].includes(index) ? 1 : 0,

      }"
    ></div>
    <div
      v-for="index in TACHOMETER_SEGMENTS"
      :style="{
        position: 'absolute',
        height: `${tachometerHeight[0][index] + 10}px`,
        width: '5px',
        background: index === computeRpmIndexes ? 'red' : '#159951',
        left: `${index * 10 + 327}px`,
        bottom: '235px',
        boxShadow: '0 0 5px #159951',

      }"
    ></div>
    <div v-show="rpm > 1500">
      <div
        v-for="index in TACHOMETER_SEGMENTS"
        :style="{
          position: 'absolute',
          height: `${tachometerHeight[1][index] + 10}px`,
          width: '5px',
          background: index === computeRpmIndexes ? 'red' : '#159951',
          left: `${index * 10 + 327}px`,
          bottom: `${tachometerHeight[0][index] + 10 + 235 + 1}px`,
          boxShadow: '0 0 5px #159951',
      
        }"
      ></div>
    </div>
    <div v-show="rpm > 2500">
      <div
        v-for="index in TACHOMETER_SEGMENTS"
        :style="{
          position: 'absolute',
          height: `${tachometerHeight[2][index]}px`,
          width: '5px',
          background: index === computeRpmIndexes ? 'red' : '#159951',
          left: `${index * 10 + 327}px`,
          bottom: `${tachometerHeight[0][index] + 10 + 235 + 1 + tachometerHeight[1][index] + 10 + 1}px`,
          boxShadow: index === computeRpmIndexes ? '0 0 5px red' : '0 0 5px #159951',
        }"
      ></div>
    </div>
    <div v-show="rpm > 3500">
      <div
        v-for="index in TACHOMETER_SEGMENTS"
        :style="{
          position: 'absolute',
          height: `${tachometerHeight[3][index]}px`,
          width: '5px',
          background: index === computeRpmIndexes ? 'red' : '#159951',
          left: `${index * 10 + 327}px`,
          bottom: `${tachometerHeight[0][index] + 10 + 235 + 1 + tachometerHeight[1][index] + 10 + 1 + tachometerHeight[2][index] + 1}px`,
          boxShadow: index === computeRpmIndexes ? '0 0 5px red' : '0 0 5px #159951',
        }"
      ></div>
    </div>
    <div v-show="rpm > 4500">
      <div
        v-for="index in TACHOMETER_SEGMENTS"
        :style="{
          position: 'absolute',
          height: `${tachometerHeight[4][index]}px`,
          width: '5px',
          background: index === computeRpmIndexes ? 'red' : '#159951',
          left: `${index * 10 + 327}px`,
          bottom: `${tachometerHeight[0][index] + 10 + 235 + 1 + tachometerHeight[1][index] + 10 + 1 + tachometerHeight[2][index] + 1 + tachometerHeight[3][index] + 1}px`,
          boxShadow: index === computeRpmIndexes ? '0 0 5px red' : '0 0 5px #159951',
        }"
      ></div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { computed, ComputedRef, ref } from 'vue'
import useEngineController from '../composables/useEngineController'
import { useDashButtons } from '../composables/useDashButtons'
import useUnitComputation from '../composables/useUnitComputation'
import useTripComputer from '../composables/useTripComputer'
import useHexToRGBA from '../functions/useHexToRGBA'


const { trip, speedometerMode, toggleSpeedometerMode, signals } = useDashButtons([
  {
    keyCode: 'KeyU',
    action: () => toggleSpeedometerMode()
  },
  {
    keyCode: 'KeyB',
    action: () => showHighBeams.value = !showHighBeams.value
  }
])

const showHighBeams = ref(false)

const TACHOMETER_SEGMENTS = 39
const MAX_TACHOMETER = 7000
const { speed, rpm } = useEngineController()

const computeRpmIndexes = computed(() => {
  if (rpm.value < 3000) return Math.round(Math.min((rpm.value - 500) / (3000 - 500), 1) * 27)
  if (rpm.value < 5000) return Math.round(Math.min((rpm.value - 3000) / (5000 - 3000), 1) * 8) + 27
  return Math.min(Math.round(Math.min((rpm.value - 5000) / (MAX_TACHOMETER - 5000), 1) * 4) + 35, TACHOMETER_SEGMENTS)
})

const computedSpeed = useUnitComputation(speed, speedometerMode) as ComputedRef<number>

const tachometerHeight = [
  [0, 0, 0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5, 6, 6, 6, 5, 4, 4, 3, 3, 3],
  [0, 0, 0, 0, 0, 1, 1, 2, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 20, 22, 23, 24, 25, 26, 27, 27, 28, 28, 29, 28, 28, 27, 26, 26],
  [1, 1, 2, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 6, 8, 8, 10, 10, 12, 14, 14, 16, 16, 18, 19, 20, 21, 21, 22, 23, 24, 25, 24, 23, 23, 22, 21, 19, 18, 16],
  [2, 2, 2, 2, 2, 2, 3, 3, 4, 3, 5, 6, 5, 5, 5, 6, 7, 8, 9, 9, 10, 11, 11, 12, 13, 13, 13, 15, 15, 15, 15, 16, 15, 15, 15, 15, 15, 15, 15, 15],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 3, 3, 3, 4, 5, 5, 7, 7, 9, 9, 9, 8, 9, 9, 10, 10, 11, 9, 10, 10, 10, 10, 10, 10, 10, 9],
]

const { odometerValue } = useTripComputer(speed, trip)
const computedOdometerValue = useUnitComputation(odometerValue, speedometerMode) as ComputedRef<number[]>
</script>

<style>
img {
  position: relative;
  top: -100px;
  z-index: 0;
}
</style>