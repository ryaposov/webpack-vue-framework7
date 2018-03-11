import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

// For all modules in subdirectory
let modules = {}

// Requiring all with .js
let context = require.context('./modules', true, /\.js$/)
context.keys().forEach(function (key) {
	// Cleanins path and .js
	let name = key.split('.js')[0].split('./')[1]
	// Setting default to modules obj
	modules[name] = context(key).default
})

Vue.use(Vuex)

let store = new Vuex.Store({
	modules: modules,
	strict: true,
	state: {},
	plugins: [createPersistedState({ key: 'app' })]
})

export default store
