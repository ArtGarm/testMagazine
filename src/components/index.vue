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
                    <single-item 
                        v-for="(item, index) in listItems" 
                        :key="index" 
                        :name="item.name"
                        :descript="item.descript"
                        :price="item.price"
                        :keyval="item.key"
                        :image='item.image'
                        :typeItem='item.type'
                    ></single-item>
                </div>      
                
                <div class="full-catalog" v-if="godMode">
                    <div class="butt" @click="addItemToCatelog()">
                        <span> Додати товар </span>
                    </div>
                </div>  
                     
            </div>
        </div>
        <div class="text-part">
            <div class="mbox">
                <div class="texter">
                    <h2>Про нас</h2>
                    <div class="colomn">
                        <p>Rotata Pizza - це молода компанія, яка оптимізувала процес приготування піци, скоротила його до 3-х хвилин та довела це на практиці! Наша місія - показати, що ресторан-піцерія - це водночас швидко, смачно і корисно. <p>
                        <p>На розробку власної рецептури тіста ми витратили: 20 видів муки (при різних умовах та температурах випікання). Гори тіста було зіпсовано, допоки ми визначились з мукою, температурою, формою та часом випікання. Власна розробка RRO - піч на дровах з обертаючим дном, яка розігрівається до температури 400 градусів. </p>
                        <p>Результат наших старань - найшвидша піца! Всього 3 хвилини та піца готова. Ми приймаємо виклик і готові поборотися за рекорд Гіннеса. Наші досягнення: гаряча піца на свіжому тісті в дров’яній печі з суворо відібраних продуктів, автоматизована система замовлення та високий рівень сервісу.</p>
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
            this.$store.dispatch('godMode');
            this.$store.dispatch('onLoadCatalog');
           // this.$store.dispatch('onLoadMain');
        },

        data(){
            return{
                isPopupOpen : true
            }
        },
        
        computed :{
            listItems(){
                return this.$store.state.catalogFull;
                //return this.$store.state.itemOnMain;
            },
            godMode(){
                return !this.$store.state.godMode;
            }, 
            script(){
                return this.$store.state.insertScript;
            }
        },
        methods : {
            addItemToCatelog(){
                this.$store.dispatch('createNewItem');
            }
            
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
    @media screen and (max-width: 767px) {
        .texter .colomn{ column-count: 1; }
        .bunner{ position: relative; overflow: hidden; width: 100%; max-height: 275px; height: auto; margin: 15px 0 0;
            img{ position: static; transform: none;}
        }
    }

    
</style>
