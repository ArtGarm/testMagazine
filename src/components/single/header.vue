<template>
  
    <div class="header">
        <div class="mbox">
            <router-link class="logo-side" to="/">
                <img src="https://ru.vuejs.org/images/logo.png" alt="">
            </router-link>
            <div class="mid-name"> Magazine </div>
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
        .cart-counter{width: 80px; text-align: center; text-decoration: none; color: crimson;
            strong{display: inline-block; padding: 0 10px; line-height: 30px; color: #fff; border-radius: 15px; min-width: 30px; background-color: #41b883; margin-left: 5px; font-weight: 400; text-align: center;}
        }
        .mid-name{font-size: 24px; text-transform: uppercase;}
    }
</style>
