export const temperatureConvertions = {
	Celsius: {
		symbol: 'ºC',
		convertTo: {
			Fahrenheit: (n: number) => (n * 9 / 5) + 32,
			Kelvin: (n: number) => n + 273.15
		}
	},
	Fahrenheit: {
		symbol: 'ºF',
		convertTo: {
			Celsius: (n: number) => (n - 32) * 5 / 9,
			Kelvin: (n: number) => (n - 32) * 5 / 9 + 273.15
		}
	},
	Kelvin: {
		symbol: 'K',
		convertTo: {
			Celsius: (n: number) => n - 273.15,
			Fahrenheit: (n: number) => (n - 273.15) * 9 / 5 + 32
		}
	}
}
