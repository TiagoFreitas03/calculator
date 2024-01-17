import { useEffect, useState } from "react"

import { speedSymbols, speedUnits } from "../types/SpeedUnit"
import { Select } from "../components/Select"
import { Entry } from "../components/Entry"
import { Output } from "../components/Output"
import { Keyboard } from "../components/Keyboard"

export function SpeedConverter() {
	const [inputUnit, setInputUnit] = useState(speedUnits[0])
	const [outputUnit, setOutputUnit] = useState(speedUnits[1])
	const [input, setInput] = useState('1')
	const [output, setOutput] = useState('')

	const inputPos = speedUnits.findIndex(u => u == inputUnit)
	const outputPos = speedUnits.findIndex(u => u == outputUnit)

	useEffect(() => {
		setOutput(convertSpeedUnit().toString())
	}, [input, inputUnit, outputUnit])

	function convertSpeedUnit(): number {
		let value = Number(input)

		if (inputUnit === outputUnit || Number(input) === 0 || inputPos === -1 || outputPos === -1) {
			return value
		}

		switch (inputUnit) {
			case 'Metros por segundo': {
				switch (outputUnit) {
					case 'Quilômetros por hora': return value * 3.6
					case 'Milhas por hora': return value * 2.237
					case 'Nós': return value * 1.944
					case 'Pés por segundo': return value * 3.281
				}
				break
			}
			case 'Quilômetros por hora': {
				switch (outputUnit) {
					case 'Metros por segundo': return value / 3.6
					case 'Milhas por hora': return value / 1.609
					case 'Nós': return value / 1.852
					case 'Pés por segundo': return value / 1.097
				}
				break
			}
			case 'Milhas por hora': {
				switch (outputUnit) {
					case 'Metros por segundo': return value / 2.237
					case 'Quilômetros por hora': return value * 1.609
					case 'Nós': return value / 1.151
					case 'Pés por segundo': return value * 1.467
				}
				break
			}
			case 'Nós': {
				switch (outputUnit) {
					case 'Metros por segundo': return value / 1.944
					case 'Quilômetros por hora': return value * 1.852
					case 'Milhas por hora': return value * 1.151
					case 'Pés por segundo': return value * 1.688
				}
				break
			}
			case 'Pés por segundo': {
				switch (outputUnit) {
					case 'Metros por segundo': return value / 3.281
					case 'Quilômetros por hora': return value * 1.097
					case 'Milhas por hora': return value / 1.467
					case 'Nós': return value / 1.688
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
						options={speedUnits}
						value={inputUnit}
						onChange={e => setInputUnit(e.target.value)}
					/>

					<div className="flex justify-end items-end">
						<Entry text={input} onChangeText={text => setInput(text)} />

						<span className="mb-2 ml-1 text-lg">{speedSymbols[inputPos]}</span>
					</div>
				</div>

				<div className="my-2 border-b border-zinc-700">
					<Select
						options={speedUnits}
						value={outputUnit}
						onChange={e => setOutputUnit(e.target.value)}
					/>

					<div className="flex justify-end items-end">
						<Output value={output} />

						<span className="mb-2 ml-1">{speedSymbols[outputPos]}</span>
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
