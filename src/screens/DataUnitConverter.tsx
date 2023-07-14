import { useEffect, useState } from "react"

import { DataUnit, units } from "../types/DataUnit"
import { convertDataUnit } from "../utils/convert-data-unit"
import { Select } from "../components/Select"
import { Entry } from "../components/Entry"
import { Output } from "../components/Output"
import { Keyboard } from "../components/Keyboard"

export function DataUnitConverter() {
	const [inputUnit, setInputUnit] = useState<DataUnit>('Kilobyte')
	const [outputUnit, setOutputUnit] = useState<DataUnit>('Byte')
	const [input, setInput] = useState('1')
	const [output, setOutput] = useState(convertDataUnit({ input, inputUnit, outputUnit }))

	const inputSymbol = String(inputUnit).substring(0, 1)
	const outputSymbol = String(outputUnit).substring(0, 1)

	useEffect(() => {
		setOutput(convertDataUnit({ input, inputUnit, outputUnit }))
	}, [input, inputUnit, outputUnit])

	return (
		<>
			<div>
				<div className="my-2 border-b border-zinc-700">
					<Select
						options={units}
						value={inputUnit}
						onChange={e => setInputUnit(e.target.value as DataUnit)}
					/>

					<div className="flex justify-end items-end">
						<Entry text={input} onTextChange={text => setInput(text)} />

						<span className="mb-2 ml-1">
							{inputSymbol + (inputSymbol !== 'B' ? 'B' : '')}
						</span>
					</div>
				</div>

				<div className="my-2 border-b border-zinc-700">
					<Select
						options={units}
						value={outputUnit}
						onChange={e => setOutputUnit(e.target.value as DataUnit)}
					/>

					<div className="flex justify-end items-end">
						<Output value={output} />

						<span className="mb-2 ml-1">
							{outputSymbol + (outputSymbol !== 'B' ? 'B' : '')}
						</span>
					</div>
				</div>
			</div>

			<div className='w-80 h-[300px] relative'>
				<Keyboard layout="COMMON" entry={input} onChangeEntry={text => setInput(text)} />
			</div>
		</>
	)
}