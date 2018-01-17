<template>
    <div class="cart-conteiner">
        <div class="mbox cart-is-empty">
            <div class="contein-texter">
                <h2>Дякуємо за заявку</h2>
                <p>Наш менеджер звяжеться з вами найближчим часом</p>
                <div class="after-butt">
                    <router-link to="/" class="butt">
                        <span>повернутись на головну</span>
                    </router-link>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    

    export default {
        name: 'Ty'
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
        .list-conteiner{ border: 1px solid #ccc; background-color: #fff; }
        .header-list{ display: block; padding: 10px; text-align: center; font-size: 20px; border-bottom: 1px solid #ccc;}
    }
    
    .siders{ padding: 20px 10px 20px 10px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap;
        .summ-title{ font-size: 24px; }
        .result{width: auto; text-align: center; margin: 0 10px; font-size: 18px;
            span{ color: crimson; font-size: 24px;}
        }
        .summury{display: flex; align-items: center; justify-content: flex-end;}
    }
</style>
