import Vue from 'vue';
import Vuex from 'vuex';
import firebase from '@/api/firebase';

Vue.use(Vuex);
Vue.use(firebase);

export const store = new Vuex.Store({
    state :{
        itemOnMain: {},
        catalogFull: {},
        itemsCounter : 0,
        cartItemList : {},
        addedCartList : {},
        singleItem : {}
    },
    getters: {

    },
    mutations:{

        toogle ( state, name ){
            state.projectName = name;
        },

        addItemsOnMain (state, data ) {
            state.itemOnMain = data;
        },
        addFullCatalog ( state, data ){
            state.catalogFull = data;
        },

        itemsCounterInCart(state, data){
            state.itemsCounter = data;
        },

        itemsInCart(state, data){
            state.addedCartList = data;
        },

        plusCountItem( state , data ){
            let ind = findObjectyName( state.addedCartList , 'keyval', data);
            state.addedCartList[ind].count++;
        },

        minusCountItem( state , data ){
            let ind = findObjectyName( state.addedCartList , 'keyval', data);
            state.addedCartList[ind].count--;
        },

        removeItemInCart(state, data){
            let finder = findObjectyName( state.addedCartList, 'keyval', data);
            state.addedCartList.splice( finder , 1 );
        },

        clearCart(state){
            state.addedCartList = [];
        },

        singleItemState( state, data ){
            state.singleItem = data;
        }
        
    },

    actions:{

        onLoadMain : (context) => {
            firebase.database.ref('listItems').once('value').then( function (snapshot) {
                let curr = snapshot.val();
                
                
                let stack= [];
                Object.keys( curr ).forEach(function (key) {
                    if ( curr[key].main ){
                        curr[key]['key'] = key;
                        stack.push( curr[key] );    
                    }
                });

                context.commit('addItemsOnMain', stack );           
                
            });
        },

        onLoadCatalog : (context) =>{
            firebase.database.ref('listItems').once('value').then( function (snapshot) {
                let curr = snapshot.val();
                
                
                let stack= [];
                Object.keys( curr ).forEach(function (key) {
                    curr[key]['key'] = key;
                    stack.push( curr[key] );    
                });

                context.commit('addFullCatalog', stack );           
                
            });
        },
        
        cartCounter : (context)=>{
            if ( localStorage.getItem('itemAddToCart') == '' || localStorage.getItem('itemAddToCart') === null ){
                context.commit('itemsCounterInCart', 0 ); 
                
            } else {
                let curList =  JSON.parse( localStorage.getItem('itemAddToCart') ) ;

                let SUMM = 0;
                curList.forEach( (item) =>{
                    SUMM+= item.count;
                });
                context.commit('itemsCounterInCart', SUMM ); 
            }
            
        },

        addItemToCart : (context, itemID ) =>{
            let curList = [];

            if ( localStorage.getItem('itemAddToCart') != '' && localStorage.getItem('itemAddToCart') !== null ){
                curList = JSON.parse( localStorage.getItem('itemAddToCart') ) ;    

            }

            let finder = findObjectyName( curList, 'name', itemID);

            if ( finder === null ){
                curList.push({
                    name : itemID,
                    count : 1,
                    time : Date.now()
                });
            } else {
                curList[ finder ].count ++;
                curList[ finder ].time = Date.now();
            }

            let SUMM = 0;
            curList.forEach( (item) =>{
                SUMM+= item.count;
            });

            localStorage.setItem('itemAddToCart', JSON.stringify(curList) );
            context.commit('itemsCounterInCart', SUMM ); 
        },

        loadCartList : (context)=>{
            let curList = [];

            if ( localStorage.getItem('itemAddToCart') != '' && localStorage.getItem('itemAddToCart') !== null ){
                curList = JSON.parse( localStorage.getItem('itemAddToCart') ) ;    
            }

            let stack= [];
            curList.forEach( (item)=>{
                firebase.database.ref('listItems/'+ item.name ).once('value').then( function (snapshot) {
                    let curr = snapshot.val();
                    curr['count'] = item.count;
                    curr['time'] = item.time;
                    curr['keyval'] = item.name;
                    stack.push( curr );                    
                });

            });

            context.commit('itemsInCart', stack );
            
        },

        minusCountItemInCart : (context , itemID ) =>{
            let curList = JSON.parse( localStorage.getItem('itemAddToCart') ) ;    

            let finder = findObjectyName( curList, 'name', itemID );

            curList[ finder ].count--;

            let SUMM = 0;
            curList.forEach( (item) =>{
                SUMM+= item.count;
            });

            localStorage.setItem('itemAddToCart', JSON.stringify(curList) );
            context.commit('itemsCounterInCart', SUMM ); 

            context.commit('minusCountItem', itemID ); 

        }, 

        plusCountItemInCart : (context , itemID ) =>{
            let curList = JSON.parse( localStorage.getItem('itemAddToCart') ) ; 

            let finder = findObjectyName( curList, 'name', itemID);

            curList[ finder ].count++ ;

            let SUMM = 0;
            curList.forEach( (item) =>{
                SUMM+= item.count;
            });

            localStorage.setItem('itemAddToCart', JSON.stringify(curList) );
            context.commit('itemsCounterInCart', SUMM ); 
            context.commit('plusCountItem', itemID ); 
        },

        deleteItemInCart: (context, itemID) =>{

            let curList = JSON.parse( localStorage.getItem('itemAddToCart') ) ; 
            let finder = findObjectyName( curList, 'name', itemID);
            curList.splice( finder , 1 );

            let SUMM = 0;
            curList.forEach( (item) =>{
                SUMM+= item.count;
            });

            localStorage.setItem('itemAddToCart', JSON.stringify(curList) );
            
            context.commit('itemsCounterInCart', SUMM ); 
            context.commit('removeItemInCart', itemID ); 
        },

        clearAllCart: ( context )=>{
            localStorage.setItem('itemAddToCart', '' );
            context.commit('itemsCounterInCart', 0 ); 
            context.commit('clearCart');
        },

        singleItem : (context, itemID) =>{
            let curr;
            firebase.database.ref('listItems/'+ itemID ).once('value').then( function (snapshot) {
                curr = snapshot.val();
                curr['keyval'] = itemID;  
                context.commit('singleItemState', curr );     
            });
            
        }
    }
})

function findObjectyName(array, key, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
            return i;
        }
    }
    return null;
}