import { useEffect, useState } from "react"

import { Entry } from "../components/Entry"
import { Keyboard } from "../components/Keyboard"
import { Output } from "../components/Output"
import { Select } from "../components/Select"
import { WeigthUnit, weigthUnits, weigthSymbols } from "../types/WeightUnit"

export function MassConverter() {
	const [inputUnit, setInputUnit] = useState<WeigthUnit>('Tonelada')
	const [outputUnit, setOutputUnit] = useState<WeigthUnit>('Quilograma')
	const [input, setInput] = useState('1')
	const [output, setOutput] = useState('')

	const inputPos = weigthUnits.findIndex(u => u == inputUnit)
	const outputPos = weigthUnits.findIndex(u => u == outputUnit)

	useEffect(() => {
		setOutput(convertWeightUnit().toString())
	}, [input, inputUnit, outputUnit])

	function convertWeightUnit() {
		let value = Number(input)

		if (inputUnit === outputUnit || Number(input) === 0 || inputPos === -1 || outputPos === -1) {
			return value
		}

		const convertToDecimal = (current: number, target: number) => {
			while (current !== target) { // converte em gramas
				value = (current <= target) ? value * 1000 : value / 1000
				current = (current <= target) ? current + 1 : current - 1
			}
		}

		const convertGramasToOther = () => {
			switch (outputUnit) {
				case 'Libra':
					value /= 453.59237
					break
				case 'Onça':
					value /= 28.349
					break
				case 'Quilate':
					value *= 5
					break
			}
		}

		if (inputPos < 4) {
			if (outputPos < 4) {
				value = value * Math.pow(1000, outputPos - inputPos)
			}
			else {
				convertToDecimal(inputPos, 2) // converte em gramas
				convertGramasToOther()
			}
		}
		else {
			switch (inputUnit) {
				case 'Libra':
					if (outputUnit === 'Onça') {
						return value * 16
					}

					value *= 453.59237
					break
				case 'Onça':
					if (outputUnit === 'Libra') {
						return value / 16
					}

					value *= 28.349
					break
				case 'Quilate':
					value /= 5
					break
			}

			if (outputPos < 4) {
				convertToDecimal(2, outputPos)
			}
			else {
				convertGramasToOther()
			}
		}

		return Number(value.toFixed(9))
	}

	return (
		<>
			<div>
				<div className="my-2 border-b border-zinc-700">
					<Select
						options={weigthUnits}
						value={inputUnit}
						onChange={e => setInputUnit(e.target.value as WeigthUnit)}
					/>

					<div className="flex justify-end items-end">
						<Entry text={input} onChangeText={text => setInput(text)} />

						<span className="mb-2 ml-1 text-lg">{weigthSymbols[inputPos]}</span>
					</div>
				</div>

				<div className="my-2 border-b border-zinc-700">
					<Select
						options={weigthUnits}
						value={outputUnit}
						onChange={e => setOutputUnit(e.target.value as WeigthUnit)}
					/>

					<div className="flex justify-end items-end">
						<Output value={output} />

						<span className="mb-2 ml-1">{weigthSymbols[outputPos]}</span>
					</div>
				</div>
			</div>

			<div className='w-80 h-[310px] relative'>
				<Keyboard
					layout="COMMON"
					text={input}
					onChangeText={text => setInput(text)}
					disabledKeys={['+-']}
				/>
			</div>
		</>
	)
}
