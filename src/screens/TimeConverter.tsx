import { useEffect, useState } from "react"

import { Select } from "../components/Select"
import { Entry } from "../components/Entry"
import { Output } from "../components/Output"
import { Keyboard } from "../components/Keyboard"
import { TimeUnit, timeUnits } from "../types/TimeUnit"

export function TimeConverter() {
	const [inputUnit, setInputUnit] = useState<TimeUnit>('Semanas')
	const [outputUnit, setOutputUnit] = useState<TimeUnit>('Dias')
	const [input, setInput] = useState('1')
	const [output, setOutput] = useState('')

	useEffect(() => {
		setOutput(convertTimeUnit())
	}, [input, inputUnit, outputUnit])

	function convertTimeUnit() {
		if (inputUnit === outputUnit || Number(input) === 0) {
			return input
		}

		const inputUnitPos = timeUnits.findIndex(u => u == inputUnit)
		const outputUnitPos = timeUnits.findIndex(u => u == outputUnit)

		if (inputUnitPos === -1 || outputUnitPos === -1) {
			return input
		}

		const timeScales = [1, 7, 24, 60, 60, 1000]
		let value = Number(input)
		let aux = inputUnitPos

		while (aux !== outputUnitPos) {
			if (aux <= outputUnitPos) {
				value = value * timeScales[aux + 1]
				aux++
			}
			else {
				value = value / timeScales[aux]
				aux--
			}
		}

		return value.toString()
	}

	return (
		<>
			<div>
				<div className="my-2 border-b border-zinc-700">
					<Select
						options={timeUnits}
						value={inputUnit}
						onChange={e => setInputUnit(e.target.value as TimeUnit)}
					/>

					<Entry text={input} onTextChange={text => setInput(text)} />
				</div>

				<div className="my-2 border-b border-zinc-700">
					<Select
						options={timeUnits}
						value={outputUnit}
						onChange={e => setOutputUnit(e.target.value as TimeUnit)}
					/>

					<Output value={output} />
				</div>
			</div>

			<div className='w-80 h-[300px] relative'>
				<Keyboard
					layout="COMMON"
					entry={input}
					onChangeEntry={text => setInput(text)}
					disabledKeys={['+-']}
				/>
			</div>
		</>
	)
}
