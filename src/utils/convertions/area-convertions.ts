export const areaConvertions = {
	'Quilômetro quadrado': {
		symbol: 'km²',
		convertTo: {
			'Metro quadrado': (n: number) => n * 1000000,
			'Hectare': (n: number) => n * 100,
			'Acre': (n: number) => n * 247.1,
			'Pé quadrado': (n: number) => n * 10764000
		},
	},
	'Metro quadrado': {
		symbol: 'm²',
		convertTo: {
			'Quilômetro quadrado': (n: number) => n / 1000000,
			'Hectare': (n: number) => n / 10000,
			'Acre': (n: number) => n / 4047,
			'Pé quadrado': (n: number) => n * 10.764
		}
	},
	'Hectare': {
		symbol: 'ha',
		convertTo: {
			'Quilômetro quadrado': (n: number) => n / 100,
			'Metro quadrado': (n: number) => n * 10000,
			'Acre': (n: number) => n * 2.471,
			'Pé quadrado': (n: number) => n * 107600
		}
	},
	'Acre': {
		symbol: 'ac',
		convertTo: {
			'Quilômetro quadrado': (n: number) => n / 247.1,
			'Metro quadrado': (n: number) => n * 4047,
			'Hectare': (n: number) => n / 2.471,
			'Pé quadrado': (n: number) => n * 43560
		}
	},
	'Pé quadrado': {
		symbol: 'ft²',
		convertTo: {
			'Quilômetro quadrado': (n: number) => n / 10764000,
			'Metro quadrado': (n: number) => n / 10.764,
			'Hectare': (n: number) => n / 107600,
			'Acre': (n: number) => n / 43560
		}
	}
}
