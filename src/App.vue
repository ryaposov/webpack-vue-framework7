<template>
<!-- App -->
<div id="app" class="app framework7-root">
	<f7-view
		main
		url="/"
		id="main-view"
		name="main-view"
		:pushState="true"
		pushStateSeparator=""
		:pushStateOnLoad="true"
		:pushStateAnimate="false"
		:pushStateRoot="pushStateRoot">
		<f7-navbar v-if="$theme.ios" :inner="false" />
	</f7-view>
</div>
</template>

<script>

export default {
	name: 'App',
	data: () => ({
		pushStateRoot: window.location.origin
	})
}
</script>
