// Axios
import axios from 'axios'

// Avaliable API Routes
export const routes = {
	baseDomain: 'https://google.com/',
}

// Configuring HTTP responses to API
export const api = axios.create({
	baseURL: routes.baseURL,
	timeout: 10000,
	transformResponse: [function (data) {
		try {
			data = JSON.parse(data)
		} catch (e) {
			data = { success: false, response: data, error_message: data }
		}
		return data
	}],
	validateStatus: status => status >= 200 && status < 600
})

export const defaultAxios = axios.create()
