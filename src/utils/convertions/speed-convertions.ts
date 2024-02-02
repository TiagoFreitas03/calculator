export const speedConvertions = {
	'Metro por segundo': {
		symbol: 'm/s',
		convertTo: {
			'Quilômetro por hora': (n: number) => n * 3.6,
			'Milha por hora': (n: number) => n * 2.237,
			'Nó': (n: number) => n * 1.944,
			'Pé por segundo': (n: number) => n * 3.281
		}
	},
	'Quilômetro por hora': {
		symbol: 'km/h',
		convertTo: {
			'Metro por segundo': (n: number) => n / 3.6,
			'Milha por hora': (n: number) => n / 1.609,
			'Nó': (n: number) => n / 1.852,
			'Pé por segundo': (n: number) => n / 1.097
		}
	},
	'Milha por hora': {
		symbol: 'mph',
		convertTo: {
			'Metro por segundo': (n: number) => n / 2.237,
			'Quilômetro por hora': (n: number) => n * 1.609,
			'Nó': (n: number) => n / 1.151,
			'Pé por segundo': (n: number) => n * 1.467
		}
	},
	'Nó': {
		symbol: 'kn',
		convertTo: {
			'Metro por segundo': (n: number) => n / 1.944,
			'Quilômetro por hora': (n: number) => n * 1.852,
			'Milha por hora': (n: number) => n * 1.151,
			'Pé por segundo': (n: number) => n * 1.688
		}
	},
	'Pé por segundo': {
		symbol: 'ft/s',
		convertTo: {
			'Metro por segundo': (n: number) => n / 3.281,
			'Quilômetro por hora': (n: number) => n * 1.097,
			'Milha por hora': (n: number) => n / 1.467,
			'Nó': (n: number) => n / 1.688
		}
	}
}
