export enum Temperature {
	Celsius,
	Fahrenheit,
	Kelvin
}

export type TemperatureScale = keyof typeof Temperature
