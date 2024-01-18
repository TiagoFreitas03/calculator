enum AreaUnits {
	SquareKilometers = 'Quilômetros quadrados',
	SquareMeters = 'Metros quadrados',
	Hectares = 'Hectares',
	Acres = 'Acres',
	SquareFeet = 'Pés quadrados'
}

const areaUnits = Object.values(AreaUnits).filter(s => isNaN(Number(s))).map(String)

const areaSymbols = ['km²', 'm²', 'ha', 'ac', 'ft²']

export { areaUnits, areaSymbols }
