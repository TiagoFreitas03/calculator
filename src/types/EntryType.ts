export enum Entry {
	bin = 2,
	oct = 8,
	dec = 10,
	hex = 16
}

export type EntryType = keyof typeof Entry
