interface AgeDetailProps {
	label: string
	value: number
	small?: boolean
}

export function AgeDetail({ label, value, small = false }: AgeDetailProps) {
	return (
		<div>
			<span className={small ? 'text-sm' : ''}>
				{label}
			</span>

			<span className={!small ? 'text-lg' : ''}>
				{value}
			</span>
		</div>
	)
}
