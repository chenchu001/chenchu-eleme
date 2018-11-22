<template>
	<div id="app">
		<v-header :seller="seller"></v-header>
		<div class="tab-wrapper">
			<tab :tabs="tabs"></tab>
		</div>
	</div>
</template>

<script>
	import vHeader from './pages/v-header/v-header.vue'
	import Tab from './pages/tab/tab.vue'
	import Goods from 'pages/goods/goods'
    import Ratings from 'pages/ratings/ratings'
    import Seller from 'pages/seller/seller'
	import {getSeller} from 'api/index'

    export default {
    	name: 'app',
    	data () {
    		return {
    			seller: {}
    		}
    	},
    	computed: {
    		tabs () {
    			return [
					{
						label: '商品',
						component: Goods,
						data: {
							seller: this.seller
						}
					},
					{
						label: '评价',
						component: Ratings,
						data: {
							seller: this.seller
						}
					},
					{
						label: '商家',
						component: Seller,
						data: {
							seller: this.seller
						}
					}
				]
			}
    	},
    	created () {
    		this._getSeller()
    	},
    	methods: {
    		_getSeller () {
    			getSeller().then((seller) => {
    				this.seller = seller
    			})
    		}
    	},
    	components: {vHeader, Tab}
	}
</script>

<style lang="stylus" scoped>
	#app
		width: 100%
		height: 100%
		overflow: hidden
		position: relative       
		.tab-wrapper
			position: fixed
			top: 136px
			left: 0
			right: 0
			bottom: 0       
</style>
