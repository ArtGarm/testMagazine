<template>
	<div class="global-wrapper">
		<header-component />
		<div class="main">
			<router-view/>
		</div>		
		<footer-component />
	</div>

</template>

<script>

	import headerComponent from '@/components/single/header';
	import footerComponent from '@/components/single/footer';

	export default {
		name: 'app',
		components: {
			headerComponent,
			footerComponent
		}
	}

</script>

<style>

	@import url('https://fonts.googleapis.com/css?family=Lato:300,400,700,900');
	body, html { padding: 0; margin: 0;  }
	*{ box-sizing: border-box; font-family: 'Lato', sans-serif; }
	img{max-width: 100%;}
	.mbox{ max-width: 1024px; margin: 0 auto; padding: 0 15px; }
	.main{min-height: calc(100vh - 114px - 46px);}
	.butt{display: block; cursor: pointer; text-decoration: none; background-color: crimson; padding: 10px 15px; color: #fff; border-radius: 6px; line-height: 1.4; font-size: 12px; letter-spacing: 0.05em;text-transform: uppercase; text-align: center; } 

</style>
