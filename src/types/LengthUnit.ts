enum LengthUnits {
	Kilometers = 'Quilômetros',
	Hectometer = 'Hectômetro',
	Decameter = 'Decâmetro',
	Meters = 'Metros',
	Decimeters = 'Decímetros',
	Centimeters = 'Centímetros',
	Millimeters = 'Milímetros',
	Miles = 'Milhas',
	Feet = 'Pés',
	Inches = 'Polegadas'
}

const lengthUnits = Object.values(LengthUnits).filter(s => isNaN(Number(s))).map(String)

const lengthSymbols = ['km', 'hm', 'dam', 'm', 'dm', 'cm', 'mm', 'mi', 'ft', 'in']

export { lengthUnits, lengthSymbols }
