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
        singleItem : {},
        godMode: false,
        headerText: '',
        isPopupOpen: false
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
        },

        sendZakaz(state) {

        },

        godMode (state, data){
            state.godMode = data;
        },

        currentTextHeader(state, data){
            state.headerText = data;
        },

        loadPopupMethod (state, data){
            state.isPopupOpen = data;
        },

        reversePopupMutation( state ){
            state.isPopupOpen = false;
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
                console.log(curr);
                context.commit('singleItemState', curr );     
            });
            
        },

        sendMail : (context , content ) =>{
            return new Promise((resolve, reject) => {
                var data = new FormData();
                data.append( "name", JSON.stringify(  content.name  ) );
                data.append( "adress", JSON.stringify(  content.mail  ) );
                data.append( "tel", JSON.stringify(  content.tel  ) );

                let stekArr = '';
                let steakPrice = 0;
                content.stack.forEach( (item) => {
                    console.log( item );
                    stekArr += '<hr />Назва:' + item.name + '<br />  Kількість '+ item.count  + ", <br /> Ціна " + item.price * item.count  + "<hr /> <br />";

                    if ( item.type == 1 ){
                        steakPrice += (item.price + 0 ) * item.count;
                    } else {
                        steakPrice += item.price * item.count;
                    }
                });
                
                data.append( "zakaz", stekArr );
                data.append( "summ", JSON.stringify(  steakPrice ) );

                fetch('/ajax.php',{
                    method: "POST",
                    body: data
                }).then(() =>{
                    context.commit('itemsCounterInCart', 0 ); 
                    context.commit('clearCart');
                    localStorage.setItem('itemAddToCart', '' );
                });
         
                resolve();
            })   
        },

        rewriteItem : ( context , item ) =>{
            firebase.database.ref( 'listItems/'+ item.keyval ).update({
                descript : item.descript,
                image : item.image,
                name : item.name,
                price : parseInt( item.price ),
                type : item.type
            });
        },

        godMode : (context)=>{
            
            localStorage.getItem('godModeValueForAdmin');
            if ( localStorage.getItem('godModeValueForAdmin') == 'true' ){
                context.commit('godMode', false );
            } else {
                context.commit('godMode', true );
            }
            //context.commit('godMode', true );
        },

        deleteItem : (context, item )=>{
            firebase.database.ref( 'listItems/'+ item ).remove();
            localStorage.setItem('itemAddToCart', '' );
            context.commit('itemsCounterInCart', 0 ); 
            context.commit('clearCart');
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

        createNewItem : (context) =>{
            var addUser = {
                descript: 'new',
                image: '',
                name: 'new',
                price: 0
            };
            firebase.database.ref('listItems').push( addUser );

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

        changeHeadText : (context, text) =>{
            console.log(text);
            
            firebase.database.ref( '/' ).update({
                headerText: text
            });
            
        },

        getTexHeader : (context) =>{

            firebase.database.ref('headerText').once('value').then( function (snapshot) {
                
                let curr = snapshot.val();             
                context.commit('currentTextHeader', curr );           
                
            });
        },

        loadPopup : (context) =>{
            firebase.database.ref('loadPopup').once('value').then( function (snapshot) {
                let curr = snapshot.val();             
                context.commit('loadPopupMethod', curr );           
            });
        },
        changePopupShow : (context, data)=>{            
            firebase.database.ref( '/' ).update({
                loadPopup: data
            });
        },
        reversePopup : (context)=>{
            context.commit('reversePopupMutation');  
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