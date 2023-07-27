enum Weigth {
	Tonelada,
	Quilograma,
	Grama,
	Miligrama,
	Libra,
	Onça,
	Quilate
}

export type WeigthUnit = keyof typeof Weigth

const weigthUnits = Object.values(Weigth).filter(w => isNaN(Number(w))).map(String)

const weigthSymbols = ['t', 'kg', 'g', 'mg', 'lb', 'oz', 'ct']

export { weigthUnits, weigthSymbols }
