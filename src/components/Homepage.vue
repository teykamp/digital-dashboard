<template>
  <div style="margin-top: 9rem;">
    <div 
      v-for="carModel in carModels" 
      @click="$emit('selectCar', carModel.name)"
      style="display: flex; cursor: pointer;"
    >
      <img 
        style="max-width: 400px;"
        class="car"
        :src="carModel.model"
      >
      <img 
        style="max-width: 400px;"
        class="logo"
        :src="carModel.logo"
      >
    
    </div>

    <h3 style="position: relative; font-family: 'Courier New', Courier, monospace; color: #414141;">space: accelerate | u: change units | up/down: shift | left/right: turn signals</h3>
    <a href="https://github.com/teykamp/digital-dashboard">
      <h3 style="position: relative; font-family: 'Courier New', Courier, monospace; color: #414141;">by teykamp and shotgunfacelift on github</h3>
    </a>
  </div>
</template>

<script setup lang="ts">
import N300ZX from '../assets/3d/anims/300zxorange.gif'
import C4 from '../assets/3d/anims/c4orange.gif'
import S2000 from '../assets/3d/anims/s2korange.gif'
import Firebird from '../assets/3d/anims/firebirdorange.gif'

import N300ZXLogo from '../assets/logos/300zxlogo.svg'
import C4Logo from '../assets/logos/c4logo.svg'
import S2000Logo from '../assets/logos/s2klogo.svg'
import FirebirdLogo from '../assets/logos/firebirdlogo.svg'

import { ref } from 'vue'

const carModels = ref([
  {
    name: 'S2000',
    model: S2000,
    logo: S2000Logo,
  },
  {
    name: 'C4',
    model: C4,
    logo: C4Logo,
  },
  {
    name: 'N300ZX',
    model: N300ZX,
    logo: N300ZXLogo,
  },
  {
    name: 'Firebird',
    model: Firebird,
    logo: FirebirdLogo,
  },
])

</script>

<style>
.car:hover {
  filter: hue-rotate(-260deg);
}

.logo {
  filter: invert(18%) sepia(62%) saturate(5%) hue-rotate(324deg) brightness(99%) contrast(83%);
}

html{
  overflow: auto;
}
</style>