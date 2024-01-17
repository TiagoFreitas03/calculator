enum WeigthUnits {
	Tonelada,
	Quilograma,
	Grama,
	Miligrama,
	Libra,
	Onça,
	Quilate
}

export type WeigthUnit = keyof typeof WeigthUnits

const weigthUnits = Object.values(WeigthUnits).filter(w => isNaN(Number(w))).map(String)

const weigthSymbols = ['t', 'kg', 'g', 'mg', 'lb', 'oz', 'ct']

export { weigthUnits, weigthSymbols }
