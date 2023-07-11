import { differenceInDays, differenceInMonths, differenceInYears } from "date-fns"

import { CompleteDateDiff, DateDiff } from '../interfaces/DateDiff'

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
	start.setMonth(end.getMonth())

	if (start.getTime() > end.getTime()) {
		start.setMonth(end.getMonth() - 1)
	}

	const days = differenceInDays(end, start)

	return { years, months, days }
}

export { calculateDateDiff, calculateCompleteDateDiff }
