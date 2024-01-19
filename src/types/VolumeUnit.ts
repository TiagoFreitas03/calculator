enum VolumeUnits {
	CubicMeters = 'Metros cúbicos',
	Liters = 'Litros',
	Milliliters = 'Mililitros',
	Gallons = 'Galões (EUA)'
}

const volumeUnits = Object.values(VolumeUnits).filter(s => isNaN(Number(s))).map(String)

const volumeSymbols = ['m³', 'l', 'ml', 'gal']

export { volumeUnits, volumeSymbols }
