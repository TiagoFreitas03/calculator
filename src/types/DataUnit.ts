export enum DataUnits {
	Byte,
	Kilobyte,
	Megabyte,
	Gigabyte,
	Terabyte,
	Petabyte
}

export type DataUnit = keyof typeof DataUnits

export const units = Object.values(DataUnits).filter(u => isNaN(Number(u))).map(String)
