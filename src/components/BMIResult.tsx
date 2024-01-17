import { useMemo } from "react"
import clsx from "clsx"

interface BMIResultProps {
	value: number
}

export function BMIResult({ value }: BMIResultProps) {
	const formatNumber = (num: number) => num.toFixed(1).replace('.', ',')

	const classification = useMemo(() => {
		if (value < 18.5) {
			return 'Subpeso'
		}

		return value < 25 ? 'Normal' : 'Sobrepeso'
	}, [value])

	return (
		<div className="mt-4 bg-zinc-900 border border-zinc-800 rounded-md py-2">
			<div className="py-2 px-4">
				<div className="flex justify-center gap-3 border-b-4 border-zinc-600 py-4">
					<span className="text-6xl">
						{formatNumber(value)}
					</span>

					<div>
						<span className="text-3xl">IMC</span>
						<span className={clsx("text-sm text-center", {
							'text-blue-400': value < 18.5,
							'text-green-400': value >= 18.5 && value < 25,
							'text-red-400': value >= 25,
						})}>
							{classification}
						</span>
					</div>
				</div>
			</div>

			<div className="text-center px-4 py-2">
				<span>Informação</span>

				<div className="grid grid-cols-3 my-4 px-2">
					<div className="text-sm border-b-4 border-blue-400 text-blue-400 pb-2">
						Subpeso
					</div>

					<div className="text-sm border-b-4 border-green-400 text-green-400 pb-2">
						Normal
					</div>

					<div className="text-sm border-b-4 border-red-400 text-red-400 pb-2">
						Sobrepeso
					</div>
				</div>

				<div className="flex justify-between">
					{
						[16, 18.5, 25, 40].map(v => {
							return (
								<span key={v} className="text-sm">
									{formatNumber(v)}
								</span>
							)
						})
					}
				</div>
			</div>
		</div>
	)
}
