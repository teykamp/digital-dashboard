<template>
  <button 
    v-if="currentCar.__name !== 'Homepage'"
    @click="selectCar()"
    style="position: absolute; top: 10px; left: 10px; background-color: #292929; color:white; border-color: white;"
  >Home</button>
  <component :is="currentCar" @select-car="selectCar"></component>
</template>

<script setup lang="ts">
// https://github.com/keshikan/DSEG
import 'dseg/css/dseg.css' // globally
import S2000 from './components/S2000.vue'
import C4 from './components/C4.vue'
import N300ZX from './components/N300ZX.vue'
import Firebird from './components/Firebird.vue'
import Homepage from './components/Homepage.vue'
import { ref, markRaw } from 'vue'

const selectCar = (selectedCar?: string) => {
  switch (selectedCar) {
    case ('S2000'): 
      currentCar.value = markRaw(S2000)
      break
    case ('C4'): 
      currentCar.value = markRaw(C4)
      break
    case ('N300ZX'): 
      currentCar.value = markRaw(N300ZX)
      break
    case ('Firebird'): 
      currentCar.value = markRaw(Firebird)
      break
    default: 
      currentCar.value = markRaw(Homepage)
      break
  }
}

const currentCar = ref<typeof Homepage | typeof S2000 | typeof C4 | typeof N300ZX>(markRaw(Homepage))
</script>

<style>
body{
  background-color: rgb(29, 29, 29);
  overflow: hidden;
}
</style>