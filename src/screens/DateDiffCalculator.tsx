import { FormEvent, useEffect, useState } from "react"
import { format, isAfter, isValid } from "date-fns"
import { ptBR } from 'date-fns/locale'

import { Input } from "../components/Input"
import { CalculateButton } from "../components/CalculateButton"
import { calculateDateDiff } from "../utils/date-utils"
import { DateDiff } from "../interfaces/DateDiff"

const TODAY = new Date()

export function DateDiffCalculator() {
	const [from, setFrom] = useState(format(TODAY, 'yyyy-MM-dd'))
	const [to, setTo] = useState(format(TODAY, 'yyyy-MM-dd'))
	const [diff, setDiff] = useState<DateDiff>()
	const [fromStr, setFromStr] = useState(formatDate(TODAY.getTime()))
	const [toStr, setToStr] = useState(formatDate(TODAY.getTime()))

	useEffect(() => {
		setDiff(calculateDateDiff(TODAY.getTime(), TODAY.getTime()))
	}, [])

	if (!diff) {
		return <></>
	}

	function formatDate(date: number) {
		return format(new Date(date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
	}

	function handleCalculateSubmit(e: FormEvent) {
		e.preventDefault()

		const fromDate = new Date(from + ' 00:00:00')
		const toDate = new Date(to + ' 00:00:00')

		if (!isValid(fromDate) || !isValid(toDate)) {
			alert('Data(s) inválida(s)')
			return
		}

		if (isAfter(fromDate, toDate)) {
			alert('Intervalo inválido')
			return
		}

		setDiff(calculateDateDiff(fromDate.getTime(), toDate.getTime()))
		setFromStr(formatDate(fromDate.getTime()))
		setToStr(formatDate(toDate.getTime()))
	}

	return (
		<>
			<form onSubmit={handleCalculateSubmit}>
				<div className="flex mt-6">
					<Input label="De" type="date" value={from} onChange={e => setFrom(e.target.value)} />
				</div>

				<div className="flex mt-6">
					<Input label="Até" type="date" value={to} onChange={e => setTo(e.target.value)} />
				</div>

				<CalculateButton />
			</form>

			<div className="mt-4 bg-zinc-900 rounded-lg py-1">
				<span className="text-blue-300 text-center text-xl py-6">Diferença</span>

				<div className="flex justify-around border-y border-zinc-700 py-2">
					<div className="text-center flex flex-col gap-1">
						<span className="text-sm">Anos</span>
						<span className="text-xl">{diff.years}</span>
					</div>

					<div className="text-center flex flex-col gap-1">
						<span className="text-sm">Meses</span>
						<span className="text-xl">{diff.months}</span>
					</div>

					<div className="text-center flex flex-col gap-1">
						<span className="text-sm">Dias</span>
						<span className="text-xl">{diff.days}</span>
					</div>
				</div>

				<div className="flex justify-around py-10">
					<div className="text-center flex flex-col gap-1">
						<span className="text-xl text-blue-300">De</span>

						<span className="text-xs">
							{fromStr}
						</span>
					</div>

					<div className="text-center flex flex-col gap-1">
						<span className="text-xl text-blue-300">Até</span>

						<span className="text-xs">
							{toStr}
						</span>
					</div>
				</div>
			</div>
		</>
	)
}
