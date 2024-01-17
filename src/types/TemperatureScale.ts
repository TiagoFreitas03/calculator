export enum TemperatureScales {
	Celsius,
	Fahrenheit,
	Kelvin
}

export type TemperatureScale = keyof typeof TemperatureScales
