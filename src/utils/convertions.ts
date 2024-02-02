import { areaConvertions } from './convertions/area-convertions'
import { dataConvertions } from './convertions/data-convertions'
import { lengthConvertions } from './convertions/length-convertions'
import { massConvertions } from './convertions/mass-convertion'
import { numberBaseConvertions } from './convertions/number-base-convertions'
import { speedConvertions } from './convertions/speed-convertions'
import { temperatureConvertions } from './convertions/temperature-converter'
import { timeConvertions } from './convertions/time-convertions'
import { volumeConvertions } from './convertions/volume-convertions'

export const convertions = {
  AREA: areaConvertions,
  DATA: dataConvertions,
  LENGTH: lengthConvertions,
  MASS: massConvertions,
  NUMBER_BASE: numberBaseConvertions,
  SPEED: speedConvertions,
  TEMPERATURE: temperatureConvertions,
  TIME: timeConvertions,
  VOLUME: volumeConvertions
}
