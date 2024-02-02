import { useEffect, useState } from "react"

import { Select } from "../components/Select"
import { Entry } from "../components/Entry"
import { Output } from "../components/Output"
import { Keyboard } from "../components/Keyboard"

interface Convertion {
	[inputUnit: string]: {
		symbol?: string
		convertTo: {
			[outputUnit: string]: (value: number) => number
		}
	}
}

interface ConverterProps {
	convertions: Convertion
	disabledKeys?: string[]
	convertIfZero?: boolean
}

export function Converter({ convertions, disabledKeys = ['+-'], convertIfZero }: ConverterProps) {
	const units = (Object.keys(convertions))
	const symbols = units.map(u => convertions[u].symbol)

	const [options] = useState(
		units.map(unit => {
			return { value: unit, title: unit }
		})
	)
	const [inputUnit, setInputUnit] = useState(options[0].value)
	const [outputUnit, setOutputUnit] = useState(options[1].value)
	const [input, setInput] = useState('0')
	const [output, setOutput] = useState('')

	const inputPos = options.findIndex(o => o.value == inputUnit)
	const outputPos = options.findIndex(o => o.value == outputUnit)

	useEffect(() => {
		let value = Number(input)

		if (inputUnit === outputUnit || (value === 0 && !convertIfZero)) {
			setOutput(value.toString())
			return
		}

		setOutput(convertions[inputUnit].convertTo[outputUnit](value).toString())
	}, [input, inputUnit, outputUnit])

	return (
		<>
			<div>
				<div className="my-2 border-b border-zinc-700">
					<Select options={options} value={inputUnit} onChange={e => setInputUnit(e.target.value)} />

					<div className="flex justify-end items-end">
						<Entry text={input} onChangeText={text => setInput(text)} />

						{
							symbols[inputPos] ?
								<span className="mb-2 ml-1 text-lg">{symbols[inputPos]}</span> :
								<></>
						}
					</div>
				</div>

				<div className="my-2 border-b border-zinc-700">
					<Select options={options} value={outputUnit} onChange={e => setOutputUnit(e.target.value)} />

					<div className="flex justify-end items-end">
						<Output value={output} />

						{
							symbols[outputPos] ?
								<span className="mb-2 ml-1 text-lg">{symbols[outputPos]}</span> :
								<></>
						}
					</div>
				</div>
			</div>

			<div className='w-80 h-[310px] relative'>
				<Keyboard
					layout="COMMON"
					text={input}
					onChangeText={text => setInput(text)}
					disabledKeys={disabledKeys}
				/>
			</div>
		</>
	)
}
