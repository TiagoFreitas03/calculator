import { useEffect, useMemo, useState } from 'react'

import { Entry as Bases, EntryType as NumericBase } from '../types/EntryType'
import { Select } from '../components/Select'
import { Entry } from '../components/Entry'
import { Output } from '../components/Output'
import { Keyboard } from '../components/Keyboard'
import { TEXT_KEYS } from '../constants/KEYS'

const bases = Object.values(Bases).filter(b => isNaN(Number(b))).map(String)
const basesNum = Object.values(Bases).filter(b => !isNaN(Number(b))).map(Number)
const keys = TEXT_KEYS.slice().sort()

export function NumericBaseConverter() {
	const [inputBase, setInputBase] = useState<NumericBase>('dec')
	const [outputBase, setOutputBase] = useState<NumericBase>('bin')
	const [input, setInput] = useState('0')
	const [output, setOutput] = useState('')

	const inputBaseNum = useMemo(() => {
		return basesNum[bases.findIndex(b => b === inputBase)]
	}, [inputBase])

	useEffect(() => {
		setInput('0')
		setOutput('0')
	}, [inputBase])

	useEffect(() => {
		if (inputBase === outputBase) {
			setOutput(input)
		}

		const outputBaseNum = basesNum[bases.findIndex(b => b === outputBase)]

		// converte o valor digitado para a base from (se não considera como decimal)
		const num = parseInt(input, inputBaseNum)

		setOutput(num.toString(outputBaseNum).toUpperCase())
	}, [outputBase, input])

	return (
		<>
			<div className="border-b border-zinc-700">
				<Select
					options={bases}
					value={inputBase}
					onChange={e => setInputBase(e.target.value as NumericBase)}
				/>

				<div className='text-right'>
					<Entry
						text={input}
						onTextChange={text => setInput(text)}
						type={inputBase}
						allowDecimals={false}
					/>
				</div>
			</div>

			<div className="border-b border-zinc-700">
				<Select
					options={bases}
					value={outputBase}
					onChange={e => setOutputBase(e.target.value as NumericBase)}
				/>

				<div className='text-right'>
					<Output value={output} type={outputBase} />
				</div>
			</div>

			<div className='w-80 h-[330px] relative'>
				<Keyboard
					layout="HEX"
					entry={input}
					onChangeEntry={text => setInput(text)}
					type={inputBase}
					disabledKeys={['+-', '.', ...keys.slice().splice(inputBaseNum + 1, keys.length - 1)]}
				/>
			</div>
		</>
	)
}
