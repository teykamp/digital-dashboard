import { computed, Ref } from 'vue'

import useConvertMphToKph from '../functions/useConvertMphToKph'
import { type SpeedometerMode } from './useDashButtons'


const useUnitComputation = (unitToConvert: Ref<number | number[]>, speedometerMode: Ref<SpeedometerMode>) => {
  if (unitToConvert.value instanceof Array) return computed(() => speedometerMode.value  === 'mph' ? unitToConvert.value : (unitToConvert.value as number[]).map(value => useConvertMphToKph(value)))
  return computed(() => speedometerMode.value  === 'mph' ? unitToConvert.value : useConvertMphToKph(unitToConvert.value as number))
}

export default useUnitComputation