if (process.env.PLATFORM === 'browser' && process.env.NODE_ENV === 'production') {
	let OfflinePluginRuntime = require('offline-plugin/runtime')
	OfflinePluginRuntime.install({
		onUpdateReady: () => OfflinePluginRuntime.applyUpdate(),
		onUpdated: () => window.swUpdate = true
	})
}

/**
 * Style import.
 */
// Franework7 Icons
import 'framework7-icons/css/framework7-icons.css'

if (process.env.PLATFORM === 'ios' || process.env.PLATFORM === 'browser') {
	// iOS theme
	require('framework7/dist/css/framework7.ios.min.css')
} else if (process.env.PLATFORM === 'android') {
	// Material Theme:
	require('framework7/dist/css/framework7.material.min.css')
}

// Import App Custom Styles
require('@/assets/scss/main.scss')

/** Routes */
import routes from '@/routes.js'

/** Vue plugins */
// Import Vue
import Vue from 'vue'
// Import Vuex Store
import store from '@/store/store'

/** Framework7 */
import Framework7 from 'framework7'

// Import additional components
import Accordion from 'framework7/dist/components/accordion/accordion.js'
import Actions from 'framework7/dist/components/actions/actions.js'
import Block from 'framework7/dist/components/block/Block.js'
import Button from 'framework7/dist/components/button/button.js'
import Calendar from 'framework7/dist/components/calendar/calendar.js'
import Dialog from 'framework7/dist/components/dialog/dialog.js'
import Icon from 'framework7/dist/components/Icon/Icon.js'
import InfiniteScroll from 'framework7/dist/components/infinite-scroll/infinite-scroll.js'
import Input from 'framework7/dist/components/input/input.js'
import Link from 'framework7/dist/components/link/link.js'
import List from 'framework7/dist/components/list/list.js'
import Notification from 'framework7/dist/components/Notification/Notification.js'
import Page from 'framework7/dist/components/Page/Page.js'
import Panel from 'framework7/dist/components/Panel/Panel.js'
import PhotoBrowser from 'framework7/dist/components/Photo-browser/Photo-browser.js'
import Popover from 'framework7/dist/components/Popover/Popover.js'
import Popup from 'framework7/dist/components/Popup/Popup.js'
import Preloader from 'framework7/dist/components/Preloader/Preloader.js'
import PullToRefresh from 'framework7/dist/components/Pull-To-Refresh/Pull-To-Refresh.js'
import Radio from 'framework7/dist/components/Radio/Radio.js'
import Searchbar from 'framework7/dist/components/Searchbar/Searchbar.js'
import Sheet from 'framework7/dist/components/Sheet/Sheet.js'
import SmartSelect from 'framework7/dist/components/smart-select/smart-select.js'
import Swipeout from 'framework7/dist/components/Swipeout/Swipeout.js'
import Swiper from 'framework7/dist/components/Swiper/Swiper.js'
import Toggle from 'framework7/dist/components/Toggle/Toggle.js'

Framework7.use([
	Accordion,
	Actions,
	Block,
	Button,
	Calendar,
	Dialog,
	Icon,
	InfiniteScroll,
	Input,
	Link,
	List,
	Notification,
	Page,
	Panel,
	PhotoBrowser,
	Popover,
	Popup,
	Preloader,
	PullToRefresh,
	Radio,
	Searchbar,
	Sheet,
	SmartSelect,
	Swipeout,
	Swiper,
	Toggle
])

// Import Vue Components
import Framework7Vue from 'framework7-vue'
import {
	f7View,
	f7Page,
	f7PageContent,
	f7Navbar,
	f7NavTitle,
	f7NavLeft,
	f7NavRight,
	f7Link,
	f7Panel,
	f7Popup,
	f7Block,
	f7BlockTitle,
	f7Button,
	f7List,
	f7ListItem,
	f7ListButton,
	f7Preloader,
	f7Input,
	f7Label,
	f7Icon
} from 'framework7-vue'

/**
 * App component and
 * Vue components
 */

// Import App Component
import App from '@/App'

/**
 * Using Vue
 * components
 */
Vue.component('f7-view', f7View)
Vue.component('f7-page', f7Page)
Vue.component('f7-page-content', f7PageContent)
Vue.component('f7-navbar', f7Navbar)
Vue.component('f7-nav-title', f7NavTitle)
Vue.component('f7-nav-left', f7NavLeft)
Vue.component('f7-nav-right', f7NavRight)
Vue.component('f7-link', f7Link)
Vue.component('f7-panel', f7Panel)
Vue.component('f7-popup', f7Popup)
Vue.component('f7-block', f7Block)
Vue.component('f7-block-title', f7BlockTitle)
Vue.component('f7-button', f7Button)
Vue.component('f7-list', f7List)
Vue.component('f7-list-item', f7ListItem)
Vue.component('f7-list-button', f7ListButton)
Vue.component('f7-preloader', f7Preloader)
Vue.component('f7-input', f7Input)
Vue.component('f7-label', f7Label)
Vue.component('f7-icon', f7Icon)

// Init F7 Vue Plugin
Vue.use(Framework7Vue, Framework7)

/** Setting default Vue data */
Vue.prototype.$material = process.env.PLATFORM === 'android'
Vue.prototype.$platform = {
	ios: process.env.PLATFORM === 'ios',
	android: process.env.PLATFORM === 'android'
}

// Vue & Framework7 Init
var rootVm = new Vue({
	// el: '#app',
	template: '<app/>',
	store,
	routes,
	framework7: {
		root: '#app',
		panel: {
			swipe: 'left',
			leftBreakpoint: 700
		},
		theme: 'ios',
		allowDuplicateUrls: true,
		statusbar: {
			enabled: false
		}
	},
	components: {
		App
	}
})

// App Start
document.addEventListener('DOMContentLoaded', async () => {
	// Initializing Vue & Framework7
	rootVm.$mount('#app')
})
