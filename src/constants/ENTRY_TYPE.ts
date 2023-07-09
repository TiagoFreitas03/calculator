enum Entry {
	bin,
	oct,
	dec,
	hex
}

export type ENTRY_TYPE = keyof typeof Entry
