import { DataUnit, units } from '../types/DataUnit'

interface ConvertDataUnitParams {
	inputUnit: DataUnit
	outputUnit: DataUnit
	input: string
}

export function convertDataUnit({ input, inputUnit, outputUnit }: ConvertDataUnitParams) {
	if (inputUnit === outputUnit || Number(input) === 0) {
		return input
	}

	const inputUnitPos = units.findIndex(u => u == inputUnit)
	const outputUnitPos = units.findIndex(u => u == outputUnit)

	if (inputUnitPos === -1 || outputUnitPos === -1) {
		return input
	}

	const value = Number(input)
	const result = value * Math.pow(1024, inputUnitPos - outputUnitPos)

	return result.toString()
}
