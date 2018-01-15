<template>

    <div class="mbox">
        <div class="catalog-list">
            <single-item v-for="(item, index) in listItems" :key="index" 
                :name="item.name"
                :descript="item.descript"
                :price="item.price"
                :keyval="item.key"
                :image='item.image'
                v-on:addToCart="addToCart"
            ></single-item>
        </div>
    </div>

</template>

<script>

    import singleItem from '@/components/single/item-catalog';

    export default {
        name: 'Catalog',
        components: {
			singleItem
        },
        created : function(){
            this.$store.dispatch('onLoadCatalog');
        },
        computed :{
            listItems(){
                return this.$store.state.catalogFull;
            }
        },
        methods : {
            addToCart( item ){
                console.log(item);
            }
        }
        
    }

</script>

<style scoped>
    .catalog-list{padding: 20px 0; display: flex; align-items: stretch; justify-content: flex-start; flex-wrap: wrap;}
</style>
