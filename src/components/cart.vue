<template>
    <div class="cart-conteiner">
        <div class="mbox" v-if="listItems.length">
            <div class="list-items">
                <div class="list-conteiner">
                    <div class="header-list">
                        <div class="name"> Cart </div>
                    </div>
                    <single-item 
                        v-for="(item, index) in sortedArray" 
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
                    <div class="summury">
                        <div class="summ-title">Summ</div>
                        <div class="result"> <span> {{ calculateSumm }} </span> $ </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mbox cart-is-empty" v-else>
            <div class="contein-texter">
                <h2>Your cart is empty</h2>
                <p>Add some items to cart to buy it</p>
                <div class="after-butt">
                    <router-link to="/catalog" class="butt">
                        <span>return to catalog</span>
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

            calculateSumm(){
                let summ = 0;
                this.listItems.forEach( ( item ) => {
                    summ+= item.price * item.count;
                });
                return summ;
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
            }

        }
    }

</script>

<style lang="scss" scoped>
    .cart-conteiner{padding: 25px 0;}
    .cart-is-empty{ text-align: center; padding-top: 25px; padding-bottom: 25px; display: flex; align-content: center; align-items: center; justify-content: center; min-height: calc(100vh - 114px - 46px);
        .contein-texter{display: block; height: auto;}
        h2{margin: 0; padding-bottom: 15px; font-size: 32px;}
        p{margin: 0; padding-bottom: 15px; font-size: 18px;}
        .after-butt{max-width: 240px; margin: 0 auto; }
    }

    .list-items{ padding: 20px 0;
        .list-conteiner{ border: 1px solid #ccc; }
        .header-list{ display: block; padding: 10px; text-align: center; font-size: 20px; border-bottom: 1px solid #ccc;}
    }
    
    .summury{ padding: 20px 30px; display: flex; align-items: center; justify-content: flex-end;
        .summ-title{ font-size: 24px; }
        .result{width: 150px; text-align: center; margin: 0 10px; font-size: 18px;
            span{ color: crimson; font-size: 24px;}
        }
    }
</style>
