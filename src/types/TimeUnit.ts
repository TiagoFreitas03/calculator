export enum Time {
	Semanas,
	Dias,
	Horas,
	Minutos,
	Segundos,
	Milissegundos
}

export type TimeUnit = keyof typeof Time

export const timeUnits = Object.values(Time).filter(t => isNaN(Number(t))).map(String)
