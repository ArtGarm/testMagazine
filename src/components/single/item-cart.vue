<template>

    <div class="item">
         <router-link to="/" class="con">
            <img :src="image" alt="">
        </router-link>

        <router-link to="/" class="name"> {{ name }} </router-link>
        <div class="count">
            <div class="minus" @click="minuso()" > - </div>
            <div class="counter"> {{ count }} </div>
            <div class="plus"  @click="pluso()" > + </div>
        </div>
        <div class="price"> <span>{{ price }}</span>₴</div>
        <div class="delete" @click="deleteItem()"> x </div>
    </div>

</template>

<script>

    export default {
        props: ['name' , 'count', 'price' , 'image', 'keyval' ],
        name : 'singleItem',
        methods : {
            pluso (){
                this.$emit('plus', this.keyval );
            },
            minuso (){
                if ( this.count > 1 ){
                    this.$emit('minus', this.keyval );
                }
            },
            deleteItem(){
                this.$emit('deleteItem', this.keyval );
            }
        }
    }

</script>

<style lang="scss" scoped>
    .item{ width: 100%; border-bottom: 1px solid #ccc; background-color: #fff; display: flex; align-items: center; justify-content: space-between; padding: 10px;
        &:last-child{border: none;}
        .con{ width: 160px; height: 160px; position: relative; overflow: hidden;  display: block; text-decoration: none;
            img{max-width: none; min-width: 110%; position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); }
        }
        .delete{ width: 30px; height: 30px; background-color: crimson; border-radius: 4px; text-align: center;color: #fff; line-height: 26px; cursor: pointer; }
        .price{ width: 150px; text-align: center; font-size: 16px;
            span{ font-size: 20px; margin-right: 2px; }
        }

        .count{ width: 140px; margin: 0 10px; display: flex; align-items: center; justify-content: center; 
            .counter{ border: 1px solid #ccc; padding: 5px 10px; min-width: 30px; font-weight: 700; line-height: 1.2; margin: 0 5px;}
            .plus, .minus{ border: 1px solid #ccc; width: 30px; height: 30px; text-align: center; font-size: 24px; cursor: pointer; transition: all 0.3s;
                &:hover{background-color: crimson; color: #fff; border-color: crimson;}
                &::selection { background-color: transparent; }
            }
            .minus{line-height: 26px; }
            .plus{ line-height: 28px; }
        }
        .name{ width: calc(100% - 160px - 30px - 150px - 160px); padding: 0 10px; font-size: 20px; text-decoration: none; color: #000; }
    }

    @media screen and (max-width: 960px) {
        .item{flex-wrap: wrap; justify-content: center; position: relative;
            .name{ width:100%; text-align: center;}
            .count{width: 100%; margin: 10px 0;}
            .price{ width: 100%;}
            .delete{ position: absolute; top: 5px; right: 5px;}
        }
    }

</style>