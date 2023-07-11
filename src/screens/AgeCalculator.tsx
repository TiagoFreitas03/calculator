import { FormEvent, useEffect, useState } from "react"
import { isValid, isBefore, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { CompleteDateDiff, DateDiff } from "../interfaces/DateDiff"
import { calculateCompleteDateDiff, calculateDateDiff } from "../utils/calculate-date-diff"
import { AgeDetail } from "../components/AgeDetail"
import { Input } from "../components/Input"
import { Button } from "../components/Button"

const TODAY = new Date(), EXAMPLE_DATE = new Date(2000, 2, 26)

TODAY.setHours(0, 0, 0, 0)

export function AgeCalculator() {
	window.onkeydown = () => {}

	const [birthDate, setBirthDate] = useState(format(EXAMPLE_DATE, 'yyyy-MM-dd'))
	const [age, setAge] = useState<CompleteDateDiff>()
	const [nextBirthday, setNextBirthday] = useState<DateDiff>()
	const [nextBirthdayWeekday, setNextBirthdayWeekday] = useState('')

	useEffect(() => {
		calculate(EXAMPLE_DATE.getTime())
	}, [])

	function calculate(timestamp: number) {
		const date = new Date(timestamp)
		setAge(calculateCompleteDateDiff(date.getTime(), TODAY.getTime()))

		date.setFullYear(TODAY.getFullYear())

		if (isBefore(date, TODAY)) {
			date.setFullYear(TODAY.getFullYear() + 1)
		}

		setNextBirthdayWeekday(format(date, 'EEEE', { locale: ptBR }))
		setNextBirthday(calculateDateDiff(TODAY.getTime(), date.getTime()))
	}

	function handleCalculateSubmit(e: FormEvent) {
		e.preventDefault()

		let date = new Date(birthDate + ' 00:00:00')

		if (!isValid(date)) {
			alert('Data inválida')
			return
		}

		if (isBefore(TODAY, date)) {
			alert('A data de nascimento deve ser anterior à data atual')
			return
		}

		calculate(date.getTime())
	}

	if (!age || !nextBirthday) {
		return <></>
	}

	return (
		<>
			<form onSubmit={handleCalculateSubmit}>
				<div className="flex mt-6">
					<Input
						label="Data de nascimento"
						type="date"
						value={birthDate}
						onChange={e => setBirthDate(e.target.value)}
						autoFocus
					/>
				</div>

				<Button type="submit" title="Calcular" />
			</form>

			<div className="mt-4 bg-zinc-900 rounded-lg py-1">
				<div className="grid grid-cols-2 border-b border-zinc-700">
					<div className="border-r border-zinc-700 p-4 my-1">
						<span className="text-3xl mt-1">Idade</span>

						<div className="flex gap-2 my-4 items-center">
							<span className="text-4xl text-blue-400">{age.years}</span>

							<span>anos</span>
						</div>

						<span className="text-sm mb-2">
							{age.months} {age.months === 1 ? 'mês' : 'meses'} |{' '}
							{age.days} {age.days === 1 ? 'dia' : 'dias'}
						</span>
					</div>

					<div className="flex flex-col gap-2 items-center justify-center">
						<span className="text-blue-300">Próximo aniversário</span>

						<i className="fas fa-cake-candles bg-blue-300 text-zinc-900 p-3 rounded-full" />

						<span>{nextBirthdayWeekday}</span>

						<span className="text-sm">
							{nextBirthday.months} {nextBirthday.months === 1 ? 'mês' : 'meses'} |{' '}
							{nextBirthday.days} {nextBirthday.days === 1 ? 'dia' : 'dias'}
						</span>
					</div>
				</div>

				<div className="py-4 px-2 text-center">
					<span className="text-blue-300 mb-2 text-lg">Resumo</span>

					<div className="grid grid-cols-3 py-3">
						<AgeDetail label="Anos" value={age.years} />
						<AgeDetail label="Meses" value={age.totalMonths} />
						<AgeDetail label="Semanas" value={age.weeks} />
					</div>

					<div className="grid grid-cols-3 py-3">
						<AgeDetail label="Dias" value={age.totalDays} small />
						<AgeDetail label="Horas" value={age.hours} small />
						<AgeDetail label="Minutos" value={age.minutes} small />
					</div>
				</div>
			</div>
		</>
	)
}
