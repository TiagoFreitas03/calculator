/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.tsx"
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Nunito', 'sans-serif']
			},

			colors: {
				blue: {
					100: '#CAF0F8',
					300: '#90E0Ef',
					500: '#00B4D8'
				}
			}
		},
	},
	plugins: [],
}
