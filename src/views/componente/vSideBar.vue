<template>
	<div class="container-sidebar flex-grow-1" data-v-sticky-container>
		<aside class="sidebar" v-sticky="option">
			<div class="sidebar-inner-container" data-v-sticky-inner>
				<slot></slot>
			</div>
		</aside>
	</div>
</template>

<script>
	import VueStickyDirective from '@renatodeleao/vue-sticky-directive'
	export default {

		name: 'SideBar',
		directives: {
			"sticky": VueStickyDirective
		},
		data () {
			return {
				option: {
					topSpacing: 120,
					bottomSpacing: 30,
					resizeSensor: true,
					stickyClass: "is-affixed",
					minWidth: 992
				}
			}
		}
	}
</script>

<style lang="css" scoped>
</style>