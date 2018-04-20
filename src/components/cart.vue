<template>
    <div class="cart-conteiner">
        <div class="mbox" v-if="listItems.length">
            <div class="list-items">
                <div class="list-conteiner">
                    <div class="header-list">
                        <div class="name"> Кошик </div>
                    </div>
                    <single-item 
                        v-for="(item ) in sortedArray" 
                        :key="item.keyval" 
                        :keyval="item.keyval" 
                        :name="item.name"
                        :count="item.count"
                        :price="item.price"
                        :image='item.image'
                        v-on:minus="minusForItem"
                        v-on:plus="plusForItem"
                        v-on:deleteItem="deleteItem"
                    >
                    </single-item>
                    <div class="deliver">
                        <div class="text-minimum" v-if="calculateSumm < 75"> Мінімальна сума замовлення 75₴ </div>
                        <div class="text-minimum" v-if="isDeliverCanBeDone < 1"> Доставка пончиків можлива лише за умови замовлення піци або кальцоне </div>
                        <div class="name"> Доставка безкоштовна </div>

                        <!--
                            <div class="summ"> {{ deliverPrice }}₴ </div>
                        -->
                    </div>
                    <div class="siders" >
                        <div class="butt" @click="clearAllCart()">
                            <span>очистити корзину</span>
                        </div>
                        <div class="summury">
                            <div class="summ-title">Загальна сума замовлення</div>
                            <div class="result"> <span> {{ calculateSumm }} </span> ₴ </div>
                        </div>
                        <div class="create-zakaz">
                            <router-link to="/form" class="butt" :class="{ pointer : calculateSumm < 75 }">
                                <span>оформити замовлення</span>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mbox cart-is-empty" v-else>
            <div class="contein-texter">
                <h2>Ваш кошик порожній</h2>
                <p>Поверніться на головну і додайте товари</p>
                <div class="after-butt">
                    <router-link to="/" class="butt">
                        <span>на головну</span>
                    </router-link>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    
    import singleItem from '@/components/single/item-cart';

    export default {
        name: 'Cart',
        components: {
			singleItem
		},
        created: function() {

            return this.$store.dispatch('loadCartList');

        },
        computed : {
            listItems(){
                return this.$store.state.addedCartList
            },

            deliverPrice(){
                let sum = 0;

                this.listItems.forEach( ( item ) => {

                    if ( item.type == 1 ){
                        sum+= item.count * 0;
                    }
                    
                });

                return sum;
                
            },

            calculateSumm(){
                let summ = 0;
                this.listItems.forEach( ( item ) => {
                    summ+= item.price * item.count;
                });
                return summ + this.deliverPrice; 
            },
            sortedArray: function() {
                function compare(a, b) {
                    if (a.time < b.time){
                        return 1;
                    }
                    if (a.time > b.time){
                        return -1;
                    }
                    return 0;
                }

                return this.listItems.sort(compare);
            },

            isDeliverCanBeDone(){

                let donut = 0;
                this.listItems.forEach( ( item ) => {
                
                    if ( item.type != 4 ){
                        donut += 1;
                    }
                    
                });
                return donut;

            }
        },
        methods: {

            minusForItem( keyval ){
                this.$store.dispatch('minusCountItemInCart', keyval );
            },

            plusForItem( keyval ){
                this.$store.dispatch('plusCountItemInCart', keyval );
            },

            deleteItem( keyval ){
                this.$store.dispatch('deleteItemInCart', keyval );
            },

            clearAllCart(){
                this.$store.dispatch('clearAllCart');
            }

        }
    }

</script>

<style lang="scss" scoped>
    .cart-conteiner{padding: 25px 0;}
    .cart-is-empty{ text-align: center; padding-top: 25px; padding-bottom: 25px; display: flex; align-content: center; align-items: center; justify-content: center; min-height: calc(100vh - 114px - 146px);
        .contein-texter{display: block; height: auto;}
        h2{margin: 0; padding-bottom: 15px; font-size: 32px;}
        p{margin: 0; padding-bottom: 15px; font-size: 18px;}
        .after-butt{max-width: 240px; margin: 0 auto; }
    }

    .list-items{ padding: 20px 0;
        .list-conteiner{ /*border: 1px solid #ccc;*/ background-color: #fff; }
        .header-list{ display: block; padding: 10px; text-align: center; font-size: 20px; border-bottom: 1px solid #ccc;}
    }
    
    .siders{ padding: 20px 10px 20px 10px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap;
        .summ-title{ font-size: 24px; text-align: center; }
        .result{width: auto; text-align: center; margin: 0 10px; font-size: 18px; 
            span{  font-size: 24px;}
        }
        .summury{display: block; align-items: center; justify-content: flex-end;}
    }
    .deliver{ border-bottom: 1px solid #ccc; padding: 20px 10px; display: block; text-align: center;
        .name{ font-size: 20px;}
        .text-minimum{padding-bottom: 10px; font-size: 20px; color: #f35d21; font-weight: 400;}
        .summ{font-size: 20px; margin: 0 10px;}
    }
    .butt.pointer{background-color: #535353; pointer-events: none; }

    @media screen and (max-width: 767px) {
        .siders>.butt{display: none;}
        .siders .summury{width: 100%; justify-content: center;}
        .siders .create-zakaz{ width: 100%; padding-top: 15px; 
            .butt{max-width: 260px; margin: 0 auto;}
        }
    }
</style>
