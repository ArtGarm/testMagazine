<template>

    <div class="contein-single-item">
        <div class="mbox" v-if="godMode">
            <div class="siders">
                <div class="con">
                    <img :src="singleItem.image" alt="">
                </div>
                <div class="texter">
                    <div class="name"> {{ singleItem.name }} </div>
                    <div class="descript">{{ singleItem.descript }}</div>
                    <div class="price"> <span>{{ singleItem.price }}</span> ₴ </div>
                    <div class="add-to-cart">
                        <div class="butt" @click="addToCart()">
                            <span>Замовити</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mbox" v-else>
            <div class="siders">
                <div class="con">
                    <img :src="singleItem.image" alt="">
                </div>
                <div class="texter">
                    <div class="name">Image url</div>
                    <div class="inputer">
                        <input type="text" name="name" v-model="singleItem.image">
                    </div>
                    <div class="name">Name </div>
                    <div class="inputer">
                        <input type="text" name="name" v-model="singleItem.name">
                    </div>
                    <div class="name">Price </div>
                    <div class="inputer">
                        <input type="text" name="name" v-model="singleItem.price">
                    </div>
                    <div class="name">Type </div>
                    <div class="inputer">
                       
                        <select v-model="singleItem.type">
                            <option value="1" :selected="1 == singleItem.type ? 'selected' : '' " >pizza </option>
                            <option value="2" :selected="2 == singleItem.type ? 'selected' : '' " >drink</option>
                            <option value="4" :selected="4 == singleItem.type ? 'selected' : '' ">donuts</option>
                            <option value="3" :selected="3 == singleItem.type ? 'selected' : '' ">other</option>
                        </select>
                        
                    </div>
                        
                    </div>
                    <div class="descript">Deskription</div>
                    <div class="inputer">
                        <textarea name="text" v-model="singleItem.descript"></textarea>
                    </div>
                    <div class="add-to-cart">
                        <div class="butt" @click="saveChanges()">
                            <span>save</span>
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
            this.$store.dispatch('godMode');
            this.$store.dispatch('singleItem', this.$route.params.id );
        },
        computed :{
            singleItem(){
                return this.$store.state.singleItem;
            },
            godMode(){
                return this.$store.state.godMode;
            }
        },
        methods : {
           addToCart(){
               this.$store.dispatch('addItemToCart', this.singleItem.keyval );
           },
           saveChanges(){
               this.$store.dispatch('rewriteItem', this.singleItem );
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
        .inputer{width: 100%; padding:0 0 15px 0;
            input, textarea{ width: 100%; font-size: 18px; height: 48px; padding: 5px; outline: none;}
            textarea{ height: 180px;}
        }
        .price{ text-align: left; font-size: 28px; margin-bottom: 15px;
            span{ color: #000; font-weight: 700;}
        }
    }

</style>
