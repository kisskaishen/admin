<template>
	<div>
		<div id="c1"></div>
	</div>
</template>
<script>
	export default {
		prop:['charData'],
		data() {
			return {
				chart:'',
			}
		},
		// watch:{
		// 	charData() {
		// 		this.draw()
		// 	}
		// },
		mounted() {
			this.draw()
		},
		methods:{
			
		}
	}
</script>
<style scoped lang="scss">
	
</style>