import { useEffect, useState } from "react"

import { lengthUnits, lengthSymbols } from "../types/LengthUnit"
import { Select } from "../components/Select"
import { Entry } from "../components/Entry"
import { Output } from "../components/Output"
import { Keyboard } from "../components/Keyboard"

export function LengthConverter() {
	const [inputUnit, setInputUnit] = useState(lengthUnits[0])
	const [outputUnit, setOutputUnit] = useState(lengthUnits[1])
	const [input, setInput] = useState('1')
	const [output, setOutput] = useState('')

	const inputPos = lengthUnits.findIndex(u => u == inputUnit)
	const outputPos = lengthUnits.findIndex(u => u == outputUnit)

	useEffect(() => {
		setOutput(convertLengthUnit().toString())
	}, [input, inputUnit, outputUnit])

	function convertLengthUnit(): number {
		let value = Number(input)

		if (inputUnit === outputUnit || Number(input) === 0 || inputPos === -1 || outputPos === -1) {
			return value
		}

		const convertToMeters = (current: number, target: number) => {
			while (current !== target) {
				if (current <= target) {
					value *= 10
					current++
				}
				else {
					value /= 10
					current--
				}
			}
		}

		const convertMetersToOther = () => {
			switch (outputUnit) {
				case 'Milhas':
					value /= 1609
					break
				case 'Pés':
					value *= 3.281
					break
				case 'Polegadas':
					value *= 39.37
					break
			}
		}

		if (inputPos < 7) {
			if (outputPos < 7) {
				value = value * Math.pow(10, outputPos - inputPos)
			}
			else {
				convertToMeters(inputPos, 3)
				convertMetersToOther()
			}
		}
		else {
			switch (inputUnit) {
				case 'Milhas':
					if (outputUnit === 'Pés') {
						return value * 5280
					}
					else if (outputUnit === 'Polegadas') {
						return value * 63360
					}

					value *= 1609
					break
				case 'Pés':
					if (outputUnit === 'Milhas') {
						return value / 5280
					}
					else if (outputUnit === 'Polegadas') {
						return value * 12
					}

					value /= 3.281
					break
				case 'Polegadas':
					if (outputUnit === 'Milhas') {
						return value / 63360
					}
					else if (outputUnit === 'Pés') {
						return value / 12
					}

					value /= 39.37
					break
			}

			if (outputPos < 7) {
				convertToMeters(3, outputPos)
			}
			else {
				convertMetersToOther()
			}
		}

		return Number(value.toFixed(9))
	}

	return (
		<>
			<div>
				<div className="my-2 border-b border-zinc-700">
					<Select
						options={lengthUnits}
						value={inputUnit}
						onChange={e => setInputUnit(e.target.value)}
					/>

					<div className="flex justify-end items-end">
						<Entry text={input} onChangeText={text => setInput(text)} />

						<span className="mb-2 ml-1 text-lg">{lengthSymbols[inputPos]}</span>
					</div>
				</div>

				<div className="my-2 border-b border-zinc-700">
					<Select
						options={lengthUnits}
						value={outputUnit}
						onChange={e => setOutputUnit(e.target.value)}
					/>

					<div className="flex justify-end items-end">
						<Output value={output} />

						<span className="mb-2 ml-1">{lengthSymbols[outputPos]}</span>
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
