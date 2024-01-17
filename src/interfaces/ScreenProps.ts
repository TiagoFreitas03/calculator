import { ReactNode } from "react"

export interface ScreenProps {
	children: ReactNode
	title?: string
	navigateTo?: string
}
