export enum Data {
	Byte,
	Kilobyte,
	Megabyte,
	Gigabyte,
	Terabyte,
	Petabyte
}

export type DataUnit = keyof typeof Data

const units = Object.values(Data).filter(u => isNaN(Number(u))).map(String)

export { units }
