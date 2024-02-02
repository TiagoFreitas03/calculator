export const massConvertions = {
	'Tonelada métrica': {
		symbol: 't',
		convertTo: {
			'Quilograma': (n: number) => n * 1000,
			'Grama': (n: number) => n * 1000000,
			'Miligrama': (n: number) => n * 1000000000,
			'Libra': (n: number) => n * 2205,
			'Onça': (n: number) => n * 35274,
		}
	},
	'Quilograma': {
		symbol: 'kg',
		convertTo: {
			'Tonelada métrica': (n: number) => n / 1000,
			'Grama': (n: number) => n * 1000,
			'Miligrama': (n: number) => n * 1000000,
			'Libra': (n: number) => n * 2.205,
			'Onça': (n: number) => n * 35.274,
		}
	},
	'Grama': {
		symbol: 'g',
		convertTo: {
			'Tonelada métrica': (n: number) => n / 1000000,
			'Quilograma': (n: number) => n / 1000,
			'Miligrama': (n: number) => n * 1000,
			'Libra': (n: number) => n / 453.6,
			'Onça': (n: number) => n / 28.35,
		}
	},
	'Miligrama': {
		symbol: 'mg',
		convertTo: {
			'Tonelada métrica': (n: number) => n / 1000000000,
			'Quilograma': (n: number) => n / 1000000,
			'Grama': (n: number) => n / 1000,
			'Libra': (n: number) => n / 453600,
			'Onça': (n: number) => n / 28350,
		}
	},
	'Libra': {
		symbol: 'lb',
		convertTo: {
			'Tonelada métrica': (n: number) => n / 2205,
			'Quilograma': (n: number) => n / 2.205,
			'Grama': (n: number) => n * 453.6,
			'Miligrama': (n: number) => n * 453600,
			'Onça': (n: number) => n * 16,
		}
	},
	'Onça': {
		symbol: 'oz',
		convertTo: {
			'Tonelada métrica': (n: number) => n / 35270,
			'Quilograma': (n: number) => n / 35.274,
			'Grama': (n: number) => n * 28.35,
			'Miligrama': (n: number) => n * 28350,
			'Libra': (n: number) => n / 16,
		}
	},
}
