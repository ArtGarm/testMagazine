<template>
	<div class="global-wrapper">
		<header-component />
		<div class="main" 
			:class="{ 
				opened : isPopupOpen && isPopupOpen1.data
			}"
		>
			<router-view/>
		</div>		
		<footer-component />
		<div class='open-popup' :class="{ opened : isPopupOpen ||  isPopupOpen1.data  }">
			<div class="contein-fame">
				<div class="closer" @click='closePopup()'>
					<span></span>
					<span></span>
				</div>
            	<iframe src="http://hello.rotata.pizza/" align="left"> </iframe>
			</div>
        </div>
		<div class="scrolling-akcii" style="display: none;">
			<div class="akc" @click="openPopupAkc()">
				<span>АКЦІЯ</span>
			</div>
		</div>
	</div>

</template>

<script>

	import headerComponent from '@/components/single/header';
	import footerComponent from '@/components/single/footer';

	export default {
		name: 'app',
		data(){
			
			return{
				isPopupOpen : false
			}
		},
		created: function() {

            return this.$store.dispatch('loadPopup');

        },

		components: {
			headerComponent,
			footerComponent
		},

		
		computed :{
			isPopupOpen1(){
                return {
					data : this.$store.state.isPopupOpen
				}
            }
		},
		methods : {
			closePopup(){
				this.isPopupOpen = false;
				this.$store.dispatch('reversePopup');

			},
			openPopupAkc(){
				this.isPopupOpen = true;
			}
		}
	}

</script>

<style lang="scss">

	@import url('https://fonts.googleapis.com/css?family=Exo+2');
	@import url('https://fonts.googleapis.com/css?family=Open+Sans');
	body, html { padding: 0; margin: 0;  }
	*{ box-sizing: border-box; font-family: 'Exo 2', sans-serif; }
	img{max-width: 100%;}
	.mbox{ max-width: 1024px; margin: 0 auto; padding: 0 15px; }
	.main{min-height: calc(100vh - 114px - 147px); background-image: url(http://if.rotata.pizza/images/section_bg.png);
		&.opened{ height: calc(100vh - 114px - 40px - 380px); overflow: hidden; }
	}
	.butt{display: block; cursor: pointer; text-decoration: none; background-color: #f35d21; padding: 10px 15px; color: #fff; border-radius: 20px; line-height: 1.4; font-size: 12px; letter-spacing: 0.1em;text-transform: uppercase; text-align: center; transition: all 0.3s; } 
	.butt:hover{ background-color: #f8a15a; }
	.open-popup{position: fixed; top: 0; bottom: 0; right: 0; left: 0; z-index: 100; display: none; background-color: rgba(0,0,0,0.5);
		&.opened{display: block;}
		.contein-fame{max-width: 960px; margin: 0 auto; position: relative;}
        iframe{width: 100%; height: 100vh; }
        .closer{ position: absolute; top: 15px; cursor: pointer; right: 15px; width: 40px; height: 40px; border: 2px solid red; 
            span{width: 28px; height: 2px; background-color: red; position: absolute; top: calc(50% - 1px); left: calc(50% - 14px);
                &:nth-child(1){transform: rotate(45deg); }
                &:nth-child(2){transform: rotate(-45deg); }
            }
        }
    }
	.scrolling-akcii{position: fixed; top: 50%; left: 0; 
		.akc{padding: 10px; border-radius: 0 0 10px 10px; background-color: #f35d21;transform: rotate(-90deg) translateX(-50%); transform-origin: 0 0; color: #fff; font-weight: 600; letter-spacing: 0.1em; cursor: pointer;
		}
	}
</style>
