export const dataConvertions = {
	units: [
		'Byte',
		'Kilobyte',
		'Megabyte',
		'Gigabyte',
		'Terabyte',
		'Petabyte'
	],
	symbols: ['B', 'KB', 'MB', 'GB', 'TB', 'PB'],
	convert: (value: string, inputUnitPos: number, outputUnitPos: number) => {
		return (Number(value) * Math.pow(1024, inputUnitPos - outputUnitPos)).toString()
	}
}
