<template>

    <div class="item" 
        v-bind:style="{ order: calcOrder }"
    >
        <router-link :to="{ name: 'Single', params: { id: keyval }}" class="con">
            <img :src="image" alt="">
        </router-link>
        <div class="descript">
            <router-link :to="{ name: 'Single', params: { id: keyval }}" class="name"> {{name}} </router-link>
            <div class="short-content">
                <p>
                    {{descript}}
                </p>
            </div>
            
            <div class="add-to-cart">
                <div class="price">
                    <span>{{price}}</span> ₴
                </div>

                <div class="butt" @click="addToCart">
                    <span> Замовити </span>
                </div>
                
            </div>
            <div class="deleter" v-if="godMode">
                <button @click="deleteItem()">
                    <span>DELETE</span>
                </button>
            </div>
        </div>
    </div>

</template>

<script>

    export default {
        props : ['name' , 'descript', 'price', 'image', 'keyval', 'typeItem' ],
        name : 'singleItem',
        computed : {
            godMode(){
                return !this.$store.state.godMode;
            },
            calcOrder(){
                console.log( this.typeItem );
                if ( this.typeItem == 1 ) {
                    return 1;
                }
                if ( this.typeItem == 2 ) {
                    return 4;
                }
                if ( this.typeItem == 2 ) {
                    return 2;
                }
                if ( this.typeItem == 4 ) {
                    return 3;
                }
                
            }
        },
        methods : {
            addToCart(){
                this.$store.dispatch('addItemToCart', this.keyval );
            },
            deleteItem(){
                this.$store.dispatch('deleteItem', this.keyval );
            }
        }
    }

</script>

<style lang="scss" scoped>
    .item{ max-width: calc( 100%/3 - 20px ); min-width: 290px;  background-color: #fff; width: 100%; margin: 10px; /*box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75); */ transition: all 0.3s; border-radius: 2px; overflow: hidden; position: relative;
        &:hover{ box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);  }
        .con{ width: 100%; position: relative; overflow: hidden; height: 180px; display: block; text-decoration: none;
            img{max-width: none; min-width: 110%; position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); }
        }
        .descript{ padding: 15px 15px 50px; }
        .name{font-size: 20px; font-weight: 400; display: block; color: #000; margin-bottom: 10px; line-height: 1.2; text-decoration: none;}
        .short-content{  margin-bottom: 15px;
            p{margin: 0; font-size: 14px; font-weight: 300; line-height: 1.4;}
        }
        .price{ text-align: center; font-size: 28px;
            span{font-weight: 700;}
        }
        .add-to-cart{display: flex; align-items: center; justify-content: space-between; position: absolute; bottom: 15px; left: 15px; right: 15px;}
        .deleter{padding: 10px; text-align: center; 
            button{padding: 10px; display: inline-block;}
        }
    }


</style>