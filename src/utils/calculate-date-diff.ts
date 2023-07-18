import { differenceInDays, differenceInMonths, differenceInYears, format } from "date-fns"
import { ptBR } from 'date-fns/locale'

function calculateCompleteDateDiff(startTime: number, endTime: number) {
	const start = new Date(startTime)
	const end = new Date(endTime)

	const totalMonths = differenceInMonths(end, start)
	const totalDays = differenceInDays(end, start)
	const weeks = Math.floor(totalDays / 7)
	const hours = totalDays * 24
	const minutes = hours * 60
	const rest = calculateDateDiff(startTime, endTime)

	return {
		...rest,
		totalMonths,
		totalDays,
		weeks,
		hours,
		minutes
	}
}

function calculateDateDiff(startTime: number, endTime: number) {
	const start = new Date(startTime)
	const end = new Date(endTime)

	const years = differenceInYears(end, start)
	const months = differenceInMonths(end, start) - (years * 12)

	start.setFullYear(end.getFullYear())
	start.setMonth(end.getMonth())

	if (start.getTime() > end.getTime()) {
		start.setMonth(end.getMonth() - 1)
	}

	const days = differenceInDays(end, start)

	return { years, months, days }
}

function calculateNextBirthday(birthTime: number) {
	const today = new Date()
	today.setHours(0, 0, 0, 0)

	const nextBirthday = new Date(birthTime)
	nextBirthday.setFullYear(today.getFullYear())

	if (nextBirthday.getTime() < today.getTime()) {
		nextBirthday.setFullYear(today.getFullYear() + 1)
	}

	const diff = calculateDateDiff(today.getTime(), nextBirthday.getTime())

	return {
		...diff,
		weekday: format(nextBirthday, 'EEEE', { locale: ptBR })
	}
}

export { calculateDateDiff, calculateCompleteDateDiff, calculateNextBirthday }
