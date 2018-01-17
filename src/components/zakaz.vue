<template>
    <div class="cart-conteiner">
        <div class="mbox">
            <form @submit.prevent="submitForm()" class="conteiner-form">
                <div class="head-text"> Заполните форму доставки</div>
                <div class="inputer">
                    <input type="text" name="name" placeholder="Ім'я"
                        v-model="name"
                        :class="{error : validation.name }"
                    >
                </div>
                <div class="inputer">
                    <input type="tel" name="tel" placeholder="Телефон"
                        v-model="tel"
                        :class="{error : validation.tel }"
                    >
                </div>
                <div class="inputer">
                    <input type="text" name="email" placeholder="Адреса"
                        v-model="email"
                        :class="{error : validation.email }"
                    >
                </div>
                <div class="submiter">
                    <button class="butt"> Отправить</button>
                </div>
            </form>
        </div>
    </div>

</template>

<script>

    /* test funk */
        var emailRE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;

        function isEmpty( el ) {
            if ( el != '' ){
                return false;
            } else {
                return true;
            }
        }

        function passDiff( elOrigin, elConfirm ) {
            if ( elOrigin != elConfirm  ){
                return true;
            } else {
                return false;
            }
        }
    /* test funk */

    export default {
        name: 'Form',
        data (){
            return{
                email : '',
                tel : '',
                name : ''
            }
        },
        created: function() {

            return this.$store.dispatch('loadCartList');

        },
        computed : {
            listItems(){
                return this.$store.state.addedCartList
            },

            calculateSumm(){
                let summ = 0;
                this.listItems.forEach( ( item ) => {
                    summ+= item.price * item.count;
                });
                return summ;
            },

            validation (){
                return {
					email : isEmpty( this.email ),
                    tel: isEmpty( this.tel ),
                    name : isEmpty( this.name )
				}
            },
            valid : function(){
				let val = this.validation;
				let stek = true ;
				Object.keys( val ).forEach(function (key) {
					stek = ( !val[key] && stek ) ? true : false ;
                });
				return stek;		
            }
        },
        methods: {

            submitForm(){
                if( this.valid ){
                    
                    this.$store.dispatch('sendMail', {
                        mail : this.email,
                        tel : this.tel,
                        name : this.name,
                        stack : this.listItems
                    }).then( () => {
                        
                        this.$router.replace('/');
                        
                    });
                }
            }

        }
    }

</script>

<style lang="scss" scoped>
    .cart-conteiner{padding: 50px 0;}
    .conteiner-form{
        .head-text{text-align: center; font-size: 24px; margin-bottom: 20px; }
        .inputer, .submiter{max-width: 360px; margin: 0 auto 15px;
            input{width: 100%; height: 48px; border: 1px solid #ccc; outline: none; font-size: 16px;padding: 0 10px; color: #454545;
                &.error{ border-color: crimson; }
            }
            .butt{width: 100%; outline: none; font-size: 16px;}
        }
    }
</style>
