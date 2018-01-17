<template>
  
    <div class="header">
        <div class="mbox">
            <router-link class="logo-side" to="/">
                <img src="http://if.rotata.pizza/images/logonew.png" alt="">
            </router-link>
            <div class="texter-slogan">
                <h2>доставка піцци в Івано-Франківську</h2>
                <p>30хв або безкоштовно - регіон</p>
            </div>
            <div class="tel-to-us">
                <a href="callto:+ 38 (050)-479-45-45">+ 38 (050)-479-45-45</a>
            </div>
            <router-link to="/cart" class="cart-counter">
                cart <strong> {{ counterItem }}</strong>
            </router-link>
        </div>
    </div>

</template>

<script>
    export default {
        name: 'headerCcomponent',
        computed :{
            counterItem(){
                return this.$store.state.itemsCounter ;
            }
        },
        created : function() {
            this.$store.dispatch('cartCounter');
        }

    }
</script>

<style lang="scss" scoped>
    .header{ padding: 15px 0; border-bottom: 1px solid #ccc; 
        .mbox{display: flex; align-items: center; justify-content: space-between;}
        .logo-side{width: 80px; display: block; text-decoration: none;}
        .cart-counter{width: 95px; border-radius: 20px; text-align: center; text-decoration: none; color: #fff; padding: 5px; border: 1px solid #f8a15a; background-color:#f8a15a; transition: all 0.3s;
            strong{display: inline-block; padding: 0 10px; line-height: 30px; color: #fff; border-radius: 15px; min-width: 30px; /*background-color: #e95621; */ margin-left: 5px; font-weight: 400; text-align: center; transition: all 0.3s;}
            &:hover{ background-color: #e95621; 
                strong{ /*background-color: #51291c; */ }
            }
        }
        .mid-name{font-size: 24px; color: #51291c; text-transform: uppercase;}
        .tel-to-us a{color: #51291c; text-decoration: none; transition: all 0.3s; font-size: 20px;
            &:hover{text-decoration: underline; color: #e95621;}
        }
        .texter-slogan{ text-align: center; 
            h2{ margin: 0; font-weight: 700; font-size: 18px; color: #51291c; text-transform: uppercase; line-height: 1.2;}
            p{ margin: 0; font-weight: 400; font-size: 16px; color: #51291c; line-height: 1.2;}
        }
    }
</style>
