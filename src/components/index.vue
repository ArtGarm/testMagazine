<template>

    <div class="main-page">
        <div class="first-bunner mbox">
            <div class="bunner">
                <img src="http://if.rotata.pizza/images/bunner.jpg" alt="">
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
                <!--
                <div class="full-catalog">
                    <router-link to="/catalog" class="butt">
                        <span> full catalog </span>
                    </router-link>
                </div>  
                -->        
            </div>
        </div>
        <div class="text-part">
            <div class="mbox">
                <div class="texter">
                    <h2>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, iusto. Maiores, ullam suscipit. Delectus odit dolorum doloribus natus reiciendis fuga sequi nemo nisi, odio ratione? Ad nostrum sit illo ab.</h2>
                    <div class="colomn">
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim labore voluptatum molestias amet eveniet quia accusantium distinctio vero, nihil neque quam numquam repellendus recusandae modi sunt adipisci. Asperiores, pariatur quaerat.</p>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim labore voluptatum molestias amet eveniet quia accusantium distinctio vero, nihil neque quam numquam repellendus recusandae modi sunt adipisci. Asperiores, pariatur quaerat.</p>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim labore voluptatum molestias amet eveniet quia accusantium distinctio vero, nihil neque quam numquam repellendus recusandae modi sunt adipisci. Asperiores, pariatur quaerat.</p>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim labore voluptatum molestias amet eveniet quia accusantium distinctio vero, nihil neque quam numquam repellendus recusandae modi sunt adipisci. Asperiores, pariatur quaerat.</p>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim labore voluptatum molestias amet eveniet quia accusantium distinctio vero, nihil neque quam numquam repellendus recusandae modi sunt adipisci. Asperiores, pariatur quaerat.</p>
                    </div>
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
            
            this.$store.dispatch('onLoadCatalog');
           // this.$store.dispatch('onLoadMain');
        },
        computed :{
            listItems(){
                return this.$store.state.catalogFull;
                //return this.$store.state.itemOnMain;
            }
        },
        methods : {

        }
        
    }

</script>

<style lang="scss" scoped>
    .bunner{ position: relative; overflow: hidden; width: 100%; height: 275px;
        img{position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);}
    }
    .catalog{padding: 25px 0;
        .list-items{display: flex; align-items: stretch; justify-content: center; flex-wrap: wrap; }
    }
    .full-catalog{padding: 20px 0; margin: 0 auto; max-width: 260px; 
        a{font-size: 16px; padding: 10px; }
    }
    .text-part{padding: 25px 0;}
    .text-part .mbox{background-color: #fff; padding: 0;}
    .texter{ padding: 25px;
        .colomn{ column-count: 2; }
        h2{margin: 0 0 15px; font-size: 24px; text-align: center;}
        p{ font-size: 16px; margin: 10px 0; font-family: 'Open Sans'; text-indent: 10px; 
            &:first-child{margin-top: 0;}
        }
    }
</style>
