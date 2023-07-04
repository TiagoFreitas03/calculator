import { Link } from "react-router-dom"

export function NotFound() {
	return (
		<div className="text-center py-56">
			<h1 className="text-4xl mb-4">
				Erro 404
			</h1>

			<p className="text-xl">
				Página não encontrada!
			</p>

			<Link to='/' className="block mt-4 text-blue-100 hover:text-blue-300">
				<i className="fas fa-home mr-1" /> Voltar à página inicial
			</Link>
		</div>
	)
}
