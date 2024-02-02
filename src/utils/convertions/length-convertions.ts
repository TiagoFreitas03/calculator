export const lengthConvertions = {
	'Quilômetro': {
		symbol: 'km',
		convertTo: {
			'Metro': (n: number) => n * 1000,
			'Centímetro': (n: number) => n * 100000,
			'Milímetro': (n: number) => n * 1000000,
			'Milha': (n: number) => n / 1.609,
			'Pé': (n: number) => n * 3281,
			'Polegada': (n: number) => n * 39370
		}
	},
	'Metro': {
		symbol: 'm',
		convertTo: {
			'Quilômetro': (n: number) => n / 1000,
			'Centímetro': (n: number) => n * 100,
			'Milímetro': (n: number) => n * 1000,
			'Milha': (n: number) => n / 1609,
			'Pé': (n: number) => n * 3.281,
			'Polegada': (n: number) => n * 39.37
		}
	},
	'Centímetro': {
		symbol: 'cm',
		convertTo: {
			'Quilômetro': (n: number) => n / 100000,
			'Metro': (n: number) => n / 100,
			'Milímetro': (n: number) => n * 10,
			'Milha': (n: number) => n / 160900,
			'Pé': (n: number) => n / 30.48,
			'Polegada': (n: number) => n / 2.54
		}
	},
	'Milímetro': {
		symbol: 'mm',
		convertTo: {
			'Quilômetro': (n: number) => n / 1000000,
			'Metro': (n: number) => n / 1000,
			'Centímetro': (n: number) => n / 10,
			'Milha': (n: number) => n / 1609000,
			'Pé': (n: number) => n / 304.8,
			'Polegada': (n: number) => n / 25.4
		}
	},
	'Milha': {
		symbol: 'mi',
		convertTo: {
			'Quilômetro': (n: number) => n * 1.609,
			'Metro': (n: number) => n * 1609,
			'Centímetro': (n: number) => n * 160900,
			'Milímetro': (n: number) => n * 1609000,
			'Pé': (n: number) => n * 5280,
			'Polegada': (n: number) => n * 63360
		}
	},
	'Pé': {
		symbol: 'ft',
		convertTo: {
			'Quilômetro': (n: number) => n / 3281,
			'Metro': (n: number) => n / 3.281,
			'Centímetro': (n: number) => n * 30.48,
			'Milímetro': (n: number) => n * 304.8,
			'Milha': (n: number) => n / 5280,
			'Polegada': (n: number) => n * 12
		}
	},
	'Polegada': {
		symbol: 'in',
		convertTo: {
			'Quilômetro': (n: number) => n / 39370,
			'Metro': (n: number) => n / 39.37,
			'Centímetro': (n: number) => n * 2.54,
			'Milímetro': (n: number) => n * 25.4,
			'Milha': (n: number) => n / 63360,
			'Pé': (n: number) => n / 12,
		}
	},
}
