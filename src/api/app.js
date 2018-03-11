import { api, routes } from './_config'

export const testApiRoute = async () => {
	try {
		const data = await api.get('google.com')
    return Promise.resolve(data)
  } catch (error) {
    return Promise.resolve(error)
  }
}
