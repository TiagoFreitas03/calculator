export enum NumberBases {
	bin = 2,
	oct = 8,
	dec = 10,
	hex = 16
}

export type NumberBase = keyof typeof NumberBases
