export enum TimeUnits {
	Semanas,
	Dias,
	Horas,
	Minutos,
	Segundos,
	Milissegundos
}

export type TimeUnit = keyof typeof TimeUnits

export const timeUnits = Object.values(TimeUnits).filter(t => isNaN(Number(t))).map(String)
