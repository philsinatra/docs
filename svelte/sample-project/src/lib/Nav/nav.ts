interface NavProps {
	name: string
	type: 'link' | 'heading'
}

const nav: NavProps[] = [
	{
		name: 'Home',
		type: 'link'
	},
	{
		name: 'JavaScript',
		type: 'heading'
	},
	{
		name: 'ES6 Maps',
		type: 'link'
	},
	{
		name: 'ES6 Sets',
		type: 'link'
	},

	{
		name: 'Gulp Nunjucks',
		type: 'link'
	}
]

export default nav
