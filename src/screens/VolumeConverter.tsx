import { useEffect, useState } from "react"

import { volumeUnits, volumeSymbols } from "../types/VolumeUnit"
import { Select } from "../components/Select"
import { Entry } from "../components/Entry"
import { Output } from "../components/Output"
import { Keyboard } from "../components/Keyboard"

export function VolumeConverter() {
	const [inputUnit, setInputUnit] = useState(volumeUnits[0])
	const [outputUnit, setOutputUnit] = useState(volumeUnits[1])
	const [input, setInput] = useState('1')
	const [output, setOutput] = useState('')

	const inputPos = volumeUnits.findIndex(u => u == inputUnit)
	const outputPos = volumeUnits.findIndex(u => u == outputUnit)

	useEffect(() => {
		setOutput(convertVolumeUnit().toString())
	}, [input, inputUnit, outputUnit])

	function convertVolumeUnit(): number {
		let value = Number(input)

		if (inputUnit === outputUnit || Number(input) === 0 || inputPos === -1 || outputPos === -1) {
			return value
		}

		const convertToLiters = (current: number, target: number) => {
			while (current !== target) {
				if (current <= target) {
					value *= 1000
					current++
				}
				else {
					value /= 1000
					current--
				}
			}
		}

		if (inputPos < 3) {
			if (outputPos < 3) {
				value = value * Math.pow(1000, outputPos - inputPos)
			}
			else {
				convertToLiters(inputPos, 1)
				value /= 3.785
			}
		}
		else {
			value *= 3.785

			convertToLiters(1, outputPos)
		}

		return Number(value.toFixed(9))
	}

	return (
		<>
			<div>
				<div className="my-2 border-b border-zinc-700">
					<Select
						options={volumeUnits}
						value={inputUnit}
						onChange={e => setInputUnit(e.target.value)}
					/>

					<div className="flex justify-end items-end">
						<Entry text={input} onChangeText={text => setInput(text)} />

						<span className="mb-2 ml-1 text-lg">{volumeSymbols[inputPos]}</span>
					</div>
				</div>

				<div className="my-2 border-b border-zinc-700">
					<Select
						options={volumeUnits}
						value={outputUnit}
						onChange={e => setOutputUnit(e.target.value)}
					/>

					<div className="flex justify-end items-end">
						<Output value={output} />

						<span className="mb-2 ml-1">{volumeSymbols[outputPos]}</span>
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
