import { NumberBases } from '../../types/NumberBase'
import { TEXT_KEYS } from '../../constants/KEYS'

const bases = Object.values(NumberBases).filter(b => isNaN(Number(b))).map(String)
const baseNumbers = Object.values(NumberBases).filter(b => !isNaN(Number(b))).map(Number)

export const numberBaseConvertions = {
	units: bases,
	symbols: bases,
	convert: (value: string, inputUnitPos: number, outputUnitPos: number) => {
		const inputBaseNum = baseNumbers[inputUnitPos]
		const outputBaseNum = baseNumbers[outputUnitPos]

		// converte o valor digitado para a base from (se não considera como decimal)
		const num = parseInt(value.toString(), inputBaseNum)

		return (num.toString(outputBaseNum).toUpperCase())
	},
	getDisabledKeys: (inputUnitPos: number) => {
		const keys = TEXT_KEYS.slice().sort()
		const inputBaseNum = baseNumbers[inputUnitPos]

		return ['.', ...keys.slice().splice(inputBaseNum + 1, keys.length - 1)]
	}
}
