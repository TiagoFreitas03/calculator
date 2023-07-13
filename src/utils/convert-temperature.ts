import { TemperatureScale } from "../types/TemperatureScale"

interface ConvertTemperatureParams {
	inputScale: TemperatureScale
	outputScale: TemperatureScale
	input: string
}

export function convertTemperature({ input, inputScale, outputScale }: ConvertTemperatureParams) {
	if (inputScale === outputScale) {
		return input
	}

	const temperature = Number(input)
	let result = 0

	switch (inputScale) {
		case 'Celsius':
			switch (outputScale) {
				case 'Fahrenheit':
					result = (temperature * 9 / 5) + 32
					break
				case 'Kelvin':
					result = temperature + 273.15
					break
			}
			break
		case 'Fahrenheit':
			switch (outputScale) {
				case 'Celsius':
					result = (temperature - 32) * 5 / 9
					break
				case 'Kelvin':
					result = (temperature - 32) * 5 / 9 + 273.15
					break
			}
			break
		case 'Kelvin':
			switch (outputScale) {
				case 'Celsius':
					result = temperature - 273.15
					break
				case 'Fahrenheit':
					result = (temperature - 273.15) * 9 / 5 + 32
					break
			}
			break
	}

	return Number(result.toFixed(3)).toString()
}
