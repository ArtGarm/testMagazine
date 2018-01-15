<template>

    <div class="main-page">
        <div class="first-bunner">
            <div class="bunner">
                <img src="http://anna.webartg.com/images/banner2.jpg" alt="">
            </div>
        </div>
        <div class="catalog">
            <div class="mbox">
                <div class="list-items">
                    <single-item v-for="(item, index) in listItems" :key="index" 
                        :name="item.name"
                        :descript="item.descript"
                        :price="item.price"
                        :keyval="item.key"
                        :image='item.image'
                    ></single-item>
                </div>      
                <div class="full-catalog">
                    <router-link to="/catalog" class="butt">
                        <span> full catalog </span>
                    </router-link>
                </div>          
            </div>
        </div>
    </div>

</template>

<script>

    import singleItem from '@/components/single/item-catalog';

    export default {
        name: 'Index',
        components: {
            singleItem
        },
        created : function(){
            this.$store.dispatch('onLoadMain');
        },
        computed :{
            listItems(){
                return this.$store.state.itemOnMain;
            }
        },
        methods : {

        }
        
    }

</script>

<style lang="scss" scoped>
    .bunner{ position: relative; overflow: hidden; width: 100%; height: 420px;
        img{position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);}
    }
    .catalog{padding: 25px 0;
        .list-items{display: flex; align-items: stretch; justify-content: flex-start; flex-wrap: wrap; }
    }
    .full-catalog{padding: 20px 0; margin: 0 auto; max-width: 360px; }
</style>
