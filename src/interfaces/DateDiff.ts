export interface DateDiff {
	years: number
	months: number
	days: number
}

export interface CompleteDateDiff extends DateDiff {
	totalMonths: number
	totalDays: number
	weeks: number
	hours: number
	minutes: number
}

export interface NextBirthdayInfo extends DateDiff {
	weekday: string
}
