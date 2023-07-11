export interface DateDiff {
	years: number
	months: number
	days: number
}

export interface CompleteDateDiff extends DateDiff {
	totalMonths: number
	weeks: number
	totalDays: number
	hours: number
	minutes: number
}
