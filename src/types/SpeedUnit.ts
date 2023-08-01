enum Speed {
	MetersPerSecond = 'Metros por segundo',
	KilometersPerHour = 'Quilômetros por hora',
	MilesPerHour = 'Milhas por hora',
	Knot = 'Nós',
	FootPerSecond = 'Pés por segundo'
}

const speedUnits = Object.values(Speed).filter(s => isNaN(Number(s))).map(String)

const speedSymbols = ['m/s', 'km/h', 'mph', 'kn', 'ft/s']

export { speedUnits, speedSymbols }
