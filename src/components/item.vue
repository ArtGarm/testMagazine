<template>

    <div class="contein-single-item">
        <div class="mbox">
            <div class="siders">
                <div class="con">
                    <img :src="singleItem.image" alt="">
                </div>
                <div class="texter">
                    <div class="name"> {{ singleItem.name }} </div>
                    <div class="descript">{{ singleItem.descript }}</div>
                    <div class="add-to-cart">
                        <div class="butt" @click="addToCart()">
                            <span>add to cart</span>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </div>

</template>

<script>

    export default {
        name: 'Single',
        created : function(){

            this.$store.dispatch('singleItem', this.$route.params.id );
        },
        computed :{
            singleItem(){
                return this.$store.state.singleItem;
            }
        },
        methods : {
           addToCart(){
               this.$store.dispatch('addItemToCart', this.singleItem.keyval );
           }
        }
        
    }

</script>

<style lang="scss" scoped>

    .contein-single-item{ padding: 25px 0;}
    .siders{display: flex; align-items: flex-start; justify-content: space-around; flex-wrap: wrap;
        .con{ width: 360px; margin-bottom: 25px;
            img{min-width: 100%;}
        }
        .texter{padding: 0 15px; width: calc(100% - 380px); min-width: 360px;
            .name{font-size: 24px; font-weight: 700; padding-bottom: 15px; line-height: 1.3;}
            .descript{font-size: 18px;line-height: 1.3; padding-bottom: 15px;}
            .add-to-cart{max-width: 130px; }
        }
    }

</style>
