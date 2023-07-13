enum Entry {
	bin,
	oct,
	dec,
	hex
}

export type EntryType = keyof typeof Entry
