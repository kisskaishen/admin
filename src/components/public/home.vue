<template>
	<div class="wrapper">
	    <div class="content">
	      	<transition name="fade" mode="out-in">
	       		<router-view></router-view>
	     	</transition>
	    </div>
	</div>
</template>


<script>

	export default {
		name:'wrapper',
	}
</script>
