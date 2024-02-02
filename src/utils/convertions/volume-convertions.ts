export const volumeConvertions = {
	'Metros cúbicos': {
		symbol: 'm³',
		convertTo: {
			'Litros': (n: number) => n * 1000,
			'Mililitros': (n: number) => n * 1000000,
			'Galão americano': (n: number) => n * 264.2,
		}
	},
	'Litros': {
		symbol: 'l',
		convertTo: {
			'Metros cúbicos': (n: number) => n / 1000,
			'Mililitros': (n: number) => n * 1000,
			'Galão americano': (n: number) => n / 3.785,
		}
	},
	'Mililitros': {
		symbol: 'ml',
		convertTo: {
			'Metros cúbicos': (n: number) => n / 1000000,
			'Litros': (n: number) => n / 1000,
			'Galão americano': (n: number) => n / 3785,
		}
	},
	'Galão americano': {
		symbol: 'gal',
		convertTo: {
			'Metros cúbicos': (n: number) => n / 264.2,
			'Litros': (n: number) => n * 3.785,
			'Mililitros': (n: number) => n * 3785,
		}
	},
}
