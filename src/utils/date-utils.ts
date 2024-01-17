import { differenceInDays, differenceInMonths, differenceInYears, format } from "date-fns"
import { ptBR } from 'date-fns/locale'

import { CompleteDateDiff, DateDiff, NextBirthdayInfo } from "../interfaces/DateDiff"

function calculateCompleteDateDiff(startTime: number, endTime: number): CompleteDateDiff {
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

function calculateDateDiff(startTime: number, endTime: number): DateDiff {
	const start = new Date(startTime)
	const end = new Date(endTime)

	const years = differenceInYears(end, start)
	const months = differenceInMonths(end, start) - (years * 12)

	start.setFullYear(end.getFullYear())

	if (start.getDate() === 31 && [3, 5, 8, 10].includes(end.getMonth())) {
		start.setDate(30)
	}
	else if (start.getDate() > 28 && end.getMonth() === 1) {
		start.setDate(28)
	}

	start.setMonth(end.getMonth())

	if (start.getTime() > end.getTime()) {
		start.setMonth(end.getMonth() - 1)
	}

	const days = differenceInDays(end, start)

	return { years, months, days }
}

function calculateNextBirthday(birthTime: number): NextBirthdayInfo {
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
