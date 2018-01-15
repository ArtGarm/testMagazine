<template>

    <div class="item">
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
            <div class="price">
                Price <span>{{price}}</span>$
            </div>
            <div class="add-to-cart">
                <div class="butt" @click="addToCart">
                    <span> add to cart </span>
                </div>
            </div>
        </div>
    </div>

</template>

<script>

    export default {
        props : ['name' , 'descript', 'price', 'image', 'keyval' ],
        name : 'singleItem',
        methods : {
            addToCart(){
                this.$store.dispatch('addItemToCart', this.keyval );
            }
        }
    }

</script>

<style lang="scss" scoped>
    .item{ max-width: calc( 100%/3 - 20px ); width: 100%; margin: 10px; box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75); transition: all 0.3s; border-radius: 2px; overflow: hidden;
        &:hover{ box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);  }
        .con{ width: 100%; position: relative; overflow: hidden; height: 180px; display: block; text-decoration: none;
            img{max-width: none; min-width: 110%; position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); }
        }
        .descript{ padding: 15px;}
        .name{font-size: 20px; font-weight: 400; display: block; color: #000; margin-bottom: 10px; line-height: 1.2; text-decoration: none;}
        .short-content{  margin-bottom: 15px;
            p{margin: 0; font-size: 14px; font-weight: 300; line-height: 1.4;}
        }
        .price{ margin-bottom: 15px; text-align: center;
            span{ color: crimson;font-weight: 700;}
        }
        .add-to-cart{display: flex; align-items: center; justify-content: center;}
    }
</style>