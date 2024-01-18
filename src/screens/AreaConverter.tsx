import { useEffect, useState } from "react"

import { areaSymbols, areaUnits } from "../types/AreaUnit"
import { Select } from "../components/Select"
import { Entry } from "../components/Entry"
import { Output } from "../components/Output"
import { Keyboard } from "../components/Keyboard"

export function AreaConverter() {
	const [inputUnit, setInputUnit] = useState(areaUnits[0])
	const [outputUnit, setOutputUnit] = useState(areaUnits[1])
	const [input, setInput] = useState('1')
	const [output, setOutput] = useState('')

	const inputPos = areaUnits.findIndex(u => u == inputUnit)
	const outputPos = areaUnits.findIndex(u => u == outputUnit)

	useEffect(() => {
		setOutput(convertAreaUnit().toString())
	}, [input, inputUnit, outputUnit])

	function convertAreaUnit(): number {
		let value = Number(input)

		if (inputUnit === outputUnit || Number(input) === 0 || inputPos === -1 || outputPos === -1) {
			return value
		}

		switch (inputUnit) {
			case 'Quilômetros quadrados': {
				switch (outputUnit) {
					case 'Metros quadrados': return value * 1000
					case 'Hectares': return value * 100
					case 'Acres': return value * 247.1
					case 'Pés quadrados': return value * 10764000
				}
				break
			}
			case 'Metros quadrados': {
				switch (outputUnit) {
					case 'Quilômetros quadrados': return value / 1000
					case 'Hectares': return value / 10000
					case 'Acres': return value / 4047
					case 'Pés quadrados': return value * 10.764
				}
				break
			}
			case 'Hectares': {
				switch (outputUnit) {
					case 'Quilômetros quadrados': return value / 100
					case 'Metros quadrados': return value * 10000
					case 'Acres': return value * 2.471
					case 'Pés quadrados': return value * 107600
				}
				break
			}
			case 'Acres': {
				switch (outputUnit) {
					case 'Quilômetros quadrados': return value / 247.1
					case 'Metros quadrados': return value * 4047
					case 'Hectares': return value / 2.471
					case 'Pés quadrados': return value * 43560
				}
				break
			}
			case 'Pés quadrados': {
				switch (outputUnit) {
					case 'Quilômetros quadrados': return value / 10764000
					case 'Metros quadrados': return value / 10.764
					case 'Hectares': return value / 107600
					case 'Acres': return value / 43560
				}
				break
			}
		}

		return 0
	}

	return (
		<>
			<div>
				<div className="my-2 border-b border-zinc-700">
					<Select
						options={areaUnits}
						value={inputUnit}
						onChange={e => setInputUnit(e.target.value)}
					/>

					<div className="flex justify-end items-end">
						<Entry text={input} onChangeText={text => setInput(text)} />

						<span className="mb-2 ml-1 text-lg">{areaSymbols[inputPos]}</span>
					</div>
				</div>

				<div className="my-2 border-b border-zinc-700">
					<Select
						options={areaUnits}
						value={outputUnit}
						onChange={e => setOutputUnit(e.target.value)}
					/>

					<div className="flex justify-end items-end">
						<Output value={output} />

						<span className="mb-2 ml-1">{areaSymbols[outputPos]}</span>
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
