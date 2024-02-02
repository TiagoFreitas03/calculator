export const timeConvertions = {
	units: [
		'Semanas',
		'Dias',
		'Horas',
		'Minutos',
		'Segundos',
		'Milissegundos'
	],
	symbols: ['wk', 'd', 'h', 'min', 's', 'ms'],
	convert: (input: string, inputUnitPos: number, outputUnitPos: number) => {
		const timeScales = [1, 7, 24, 60, 60, 1000]
		let value = Number(input)
		let aux = inputUnitPos

		while (aux !== outputUnitPos) {
			if (aux <= outputUnitPos) {
				value = value * timeScales[aux + 1]
				aux++
			}
			else {
				value = value / timeScales[aux]
				aux--
			}
		}

		return value.toString()
	}
}
