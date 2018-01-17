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

	@import url('https://fonts.googleapis.com/css?family=Exo+2');
	@import url('https://fonts.googleapis.com/css?family=Open+Sans');
	body, html { padding: 0; margin: 0;  }
	*{ box-sizing: border-box; font-family: 'Exo 2', sans-serif; }
	img{max-width: 100%;}
	.mbox{ max-width: 1024px; margin: 0 auto; padding: 0 15px; }
	.main{min-height: calc(100vh - 114px - 147px); background-image: url(http://if.rotata.pizza/images/section_bg.png);}
	.butt{display: block; cursor: pointer; text-decoration: none; background-color: #f35d21; padding: 10px 15px; color: #fff; border-radius: 20px; line-height: 1.4; font-size: 12px; letter-spacing: 0.1em;text-transform: uppercase; text-align: center; transition: all 0.3s; } 
	.butt:hover{ background-color: #f8a15a; }

</style>
