// Home
import homePage from './pages/Home'

export default [
	{
		path: '/',
		component: homePage,
		name: 'Home'
	},
	{
		path: '/catalog/',
		component: homePage,
		name: 'Catalog'
	},
	{
		path: '(.*)',
		component: homePage,
		name: 'Default'
	}
]
