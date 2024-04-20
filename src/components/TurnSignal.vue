<template>
  <div
    v-if="props.direction === 'right'"
    :style="{
      display: 'flex',
      'align-items': 'center',
    }"
  >
    <div style="width: 20px; 
                height: 30px; 
                background-color: #20D6AF;
                box-shadow: 0 0 10px #20D6AF"
    ></div>
    <div style="width: 0; 
                height: 0; 
                border-top: 25px solid transparent;
                border-bottom: 25px solid transparent;
                border-left: 25px solid #20D6AF;"
    ></div>
  </div>
  <div
    v-else
    :style="{
      display: 'flex',
      'align-items': 'center',
    }"
  >
    <div style="width: 0; 
                height: 0; 
                border-top: 25px solid transparent;
                border-bottom: 25px solid transparent;
                border-right: 25px solid #20D6AF;"
    ></div>
    <div style="width: 20px; 
                height: 30px; 
                background-color: #20D6AF;
                box-shadow: 0 0 10px #20D6AF"
    ></div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  direction: 'left' | 'right'
}>()
</script>