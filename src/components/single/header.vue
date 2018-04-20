<template>
    
    <div class="header">
        <div class="top-line">
            <div class="mbox" v-if="godMode">
                <div  class="texter">{{textHeader.data}}</div>
            </div>
            <div class="mbox" v-else>
                <input type="text" name='textHeader' v-model="textHeader.data">
                <button @click="saveHeaderText()">
                    <span>save</span>
                </button>

                <hr />

                <div class="popup-o" >
                    <label class="cont">
                        <input type="checkbox" name="checker" v-model="checkboxPopup.data" @change="changePopupStartShow()">
                        <span> is popup visible </span>  
                    </label>                  
                </div>

            </div>
        </div>
        <div class="mbox content">
            <router-link class="logo-side" to="/">
                <img src="http://if.rotata.pizza/images/logonew.png" alt="">
            </router-link>
            <div class="texter-slogan">
                <h2>ДОСТАВКА ПІЦИ В ІВАНО-ФРАНКІВСЬКУ</h2>
                <p>59 хв або безкоштовно - <span @click="openPopup()"> регіон доставки </span></p>
            </div>
            <div class="tel-to-us">
                <a href="callto:+380504794545">+ 38 (050)-479-45-45</a> <br/>
                <a href="callto:+380734794545">+ 38 (073)-479-45-45</a>
            </div>
            <router-link to="/cart" class="cart-counter" :class="{grey : counterItem<1 }" >
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 446.853 446.853" style="enable-background:new 0 0 446.853 446.853;" xml:space="preserve">
                    <g>
                        <path d="M444.274,93.36c-2.558-3.666-6.674-5.932-11.145-6.123L155.942,75.289c-7.953-0.348-14.599,5.792-14.939,13.708
                            c-0.338,7.913,5.792,14.599,13.707,14.939l258.421,11.14L362.32,273.61H136.205L95.354,51.179
                            c-0.898-4.875-4.245-8.942-8.861-10.753L19.586,14.141c-7.374-2.887-15.695,0.735-18.591,8.1c-2.891,7.369,0.73,15.695,8.1,18.591
                            l59.491,23.371l41.572,226.335c1.253,6.804,7.183,11.746,14.104,11.746h6.896l-15.747,43.74c-1.318,3.664-0.775,7.733,1.468,10.916
                            c2.24,3.184,5.883,5.078,9.772,5.078h11.045c-6.844,7.617-11.045,17.646-11.045,28.675c0,23.718,19.299,43.012,43.012,43.012
                            s43.012-19.294,43.012-43.012c0-11.028-4.201-21.058-11.044-28.675h93.777c-6.847,7.617-11.047,17.646-11.047,28.675
                            c0,23.718,19.294,43.012,43.012,43.012c23.719,0,43.012-19.294,43.012-43.012c0-11.028-4.2-21.058-11.042-28.675h13.432
                            c6.6,0,11.948-5.349,11.948-11.947c0-6.6-5.349-11.948-11.948-11.948H143.651l12.902-35.843h216.221
                            c6.235,0,11.752-4.028,13.651-9.96l59.739-186.387C447.536,101.679,446.832,97.028,444.274,93.36z M169.664,409.814
                            c-10.543,0-19.117-8.573-19.117-19.116s8.574-19.117,19.117-19.117s19.116,8.574,19.116,19.117S180.207,409.814,169.664,409.814z
                            M327.373,409.814c-10.543,0-19.116-8.573-19.116-19.116s8.573-19.117,19.116-19.117s19.116,8.574,19.116,19.117
                            S337.916,409.814,327.373,409.814z"/>
                    </g>

                </svg>

                <span>Кошик</span> <strong> {{ counterItem }}</strong>
            </router-link>
        </div>
        <div class="hidden-popup" v-if="openPop">
            <div class="overlay" @click="closePopup()"></div>
            <div class="mbox">
                <div class="top-map">
                    <gmap-map
                        :center="center"
                        :zoom="13"
                        style="width: 100%; height: 500px; max-height: 90vh;"
                    >
                        <gmap-polygon :paths="polygone" :editable="false" ref="polygon"> </gmap-polygon>
                    </gmap-map>
                </div>
            </div>
        </div>
    </div>

</template>

<script>

    import * as VueGoogleMaps from 'vue2-google-maps';
    import Vue from 'vue';

      Vue.use(VueGoogleMaps, {
        load: {
            key: 'AIzaSyBWvUBf084sqeU_m2ju78uWga5KMSlwKSU',
            v: '3.6',
        }
    });
    export default {
        name: 'headerCcomponent',
        data () {
            return {
              /*  checkboxPopup : true, */
                openPop : false,
                center: {lat: 48.92219699708017, lng: 24.720839309692337},        
                markers: [
                    {
                        position: {lat: 10.0, lng: 10.0}
                    }, 
                    {
                        position: {lat: 11.0, lng: 11.0}
                    }
                ],
                polygone: [
                    [
                        {
                            lat: 48.929407800742844,
                            lng: 24.709154964105664                            
                        },
                        {
                            lng:24.7088130092784,
                            lat:48.92935009238933
                        },
                        {
                            lng:24.708467031137616,
                            lat:48.929300313797505
                        },
                        {
                            lng:24.707355309144987,
                            lat:48.92918754005724
                        },
                        {
                            lng:24.707111576811712,
                            lat:48.929164192601704
                        },
                        {
                            lng:24.706867844478438,
                            lat:48.929154061555415
                        },
                        {
                            lng:24.706521517650458,
                            lat:48.929125868061604
                        },
                        {
                            lng:24.706288675085943,
                            lat:48.929048772954644
                        },
                        {
                            lng:24.70612464459373,
                            lat:48.92901639303584
                        },
                        {
                            lng:24.70599280060958,
                            lat:48.928950531377545
                        },
                        {
                            lng:24.70586724640566,
                            lat:48.928919693702774
                        },
                        {
                            lng:24.705783266441358,
                            lat:48.92881836802009
                        },
                        {
                            lng:24.70565100671479,
                            lat:48.92869589567279
                        },
                        {
                            lng:24.705435216294063,
                            lat:48.92832384888767
                        },
                        {
                            lng:24.705189921574174,
                            lat:48.92795356156194
                        },
                        {
                            lng:24.704817221926078,
                            lat:48.92738501858424
                        },
                        {
                            lng:24.704460615531957,
                            lat:48.92680237095818
                        },
                        {
                            lng:24.704325754062666,
                            lat:48.92683277052795
                        },
                        {
                            lng:24.70417785705763,
                            lat:48.92661535005743
                        },
                        {
                            lng:24.704029960052594,
                            lat:48.92641026464336
                        },
                        {
                            lng:24.70392766060081,
                            lat:48.926290649533634
                        },
                        {
                            lng:24.703819996730886,
                            lat:48.92613402594133
                        },
                        {
                            lng:24.703757554904996,
                            lat:48.92603225364593
                        },
                        {
                            lng:24.70326730074123,
                            lat:48.926171916054614
                        },
                        {
                            lng:24.70245086313912,
                            lat:48.92643383656006
                        },
                        {
                            lng:24.70191658051442,
                            lat:48.92660004189511
                        },
                        {
                            lng:24.701599818335353,
                            lat:48.92616767587051
                        },
                        {
                            lng:24.701387662307752,
                            lat:48.92584456918865
                        },
                        {
                            lng:24.701346678154096,
                            lat:48.92577980478933
                        },
                        {
                            lng:24.70083418847753,
                            lat:48.925095694184584
                        },
                        {
                            lng:24.700486748532853,
                            lat:48.92463908284939
                        },
                        {
                            lng:24.700281465665967,
                            lat:48.92436751527635
                        },
                        {
                            lng:24.700147931890115,
                            lat:48.924164237925375
                        },
                        {
                            lng:24.699987287686668,
                            lat:48.92413133127562
                        },
                        {
                            lng:24.699762270466863,
                            lat:48.92413367194249
                        },
                        {
                            lng:24.69966532872752,
                            lat:48.92410561178283
                        },
                        {
                            lng:24.699579306931582,
                            lat:48.92404576011381
                        },
                        {
                            lng:24.699423643255045,
                            lat:48.92384312164939
                        },
                        {
                            lng:24.699281438400476,
                            lat:48.923717128781014
                        },
                        {
                            lng:24.69885628438317,
                            lat:48.92329107996535
                        },
                        {
                            lng:24.69840230856323,
                            lat:48.92285599085398
                        },
                        {
                            lng:24.698110947636906,
                            lat:48.92257147290769
                        },
                        {
                            lng:24.698313113169206,
                            lat:48.92248434527426
                        },
                        {
                            lng:24.69894324118036,
                            lat:48.92218215741544
                        },
                        {
                            lng:24.699562640355225,
                            lat:48.921865868159536
                        },
                        {
                            lng:24.700514633448165,
                            lat:48.92128520757822
                        },
                        {
                            lng:24.699377999601325,
                            lat:48.920369835203246
                        },
                        {
                            lng:24.69838084062326,
                            lat:48.919627173832076
                        },
                        {
                            lng:24.698336895562193,
                            lat:48.91948320594497
                        },
                        {
                            lng:24.698524135334765,
                            lat:48.919259643782695
                        },
                        {
                            lng:24.699122010515907,
                            lat:48.918714275054434
                        },
                        {
                            lng:24.69951067339389,
                            lat:48.91828875544879
                        },
                        {
                            lng:24.699714006420663,
                            lat:48.91785808430937
                        },
                        {
                            lng:24.69983713060617,
                            lat:48.917484113514085
                        },
                        {
                            lng:24.69990405711701,
                            lat:48.917177269609915
                        },
                        {
                            lng:24.699981712463796,
                            lat:48.91687042382079
                        },
                        {
                            lng:24.701547092811666,
                            lat:48.91399958854442
                        },
                        {
                            lng:24.702403039352475,
                            lat:48.913530701787586
                        },
                        {
                            lng:24.70301340283595,
                            lat:48.9131940172289
                        },
                        {
                            lng:24.703779924528135,
                            lat:48.91291285744268
                        },
                        {
                            lng:24.704549423472486,
                            lat:48.91261362765619
                        },
                        {
                            lng:24.705753440277135,
                            lat:48.912212154538196
                        },
                        {
                            lng:24.706190801279035,
                            lat:48.912106387208425
                        },
                        {
                            lng:24.706300932781232,
                            lat:48.91209228488087
                        },
                        {
                            lng:24.70671943785385,
                            lat:48.912778887332756
                        },
                        {
                            lng:24.707137942926465,
                            lat:48.91345842937727
                        },
                        {
                            lng:24.708854637162176,
                            lat:48.912909331918065
                        },
                        {
                            lng:24.709511818603914,
                            lat:48.9127493609773
                        },
                        {
                            lng:24.709692207218495,
                            lat:48.91274814907427
                        },
                        {
                            lng:24.709867231415046,
                            lat:48.91274693717123
                        },
                        {
                            lng:24.709952061304307,
                            lat:48.91274456845155
                        },
                        {
                            lng:24.709613102169214,
                            lat:48.913676458175125
                        },
                        {
                            lng:24.709621989501102,
                            lat:48.91395025979354
                        },
                        {
                            lng:24.709684521013287,
                            lat:48.914054838891005
                        },
                        {
                            lng:24.70988384518523,
                            lat:48.91446612980475
                        },
                        {
                            lng:24.71033064316248,
                            lat:48.91428868131269
                        },
                        {
                            lng:24.711412349035754,
                            lat:48.91396904039232
                        },
                        {
                            lng:24.712821284409074,
                            lat:48.91363882100813
                        },
                        {
                            lng:24.716497462040024,
                            lat:48.91311587077685
                        },
                        {
                            lng:24.71730290038488,
                            lat:48.91299894007223
                        },
                        {
                            lng:24.717689526303275,
                            lat:48.91429954506747
                        },
                        {
                            lng:24.717841168067707,
                            lat:48.914609708057824
                        },
                        {
                            lng:24.718057182848497,
                            lat:48.914884615281544
                        },
                        {
                            lng:24.71840256573671,
                            lat:48.91518864204725
                        },
                        {
                            lng:24.718607443689052,
                            lat:48.91542878848737
                        },
                        {
                            lng:24.718900319505224,
                            lat:48.91599657725282
                        },
                        {
                            lng:24.719171737649276,
                            lat:48.91656435956467
                        },
                        {
                            lng:24.719486586171115,
                            lat:48.91720461364686
                        },
                        {
                            lng:24.719801434692954,
                            lat:48.917844859522745
                        },
                        {
                            lng:24.719980520622244,
                            lat:48.91823347192004
                        },
                        {
                            lng:24.720383495704482,
                            lat:48.918187644961975
                        },
                        {
                            lng:24.720443148033155,
                            lat:48.918170019197674
                        },
                        {
                            lng:24.720459885017362,
                            lat:48.918319837995966
                        },
                        {
                            lng:24.720401520149267,
                            lat:48.918483756872234
                        },
                        {
                            lng:24.72028479041296,
                            lat:48.91873051545649
                        },
                        {
                            lng:24.72084397734841,
                            lat:48.919093600871165
                        },
                        {
                            lng:24.72102229060374,
                            lat:48.9192381292824
                        },
                        {
                            lng:24.721270341293575,
                            lat:48.91937913220744
                        },
                        {
                            lng:24.721749437467793,
                            lat:48.919753669294096
                        },
                        {
                            lng:24.722062236683087,
                            lat:48.92001187793243
                        },
                        {
                            lng:24.721426365391835,
                            lat:48.92098257184442
                        },
                        {
                            lng:24.72236823649837,
                            lat:48.921742414173714
                        },
                        {
                            lng:24.722833807633606,
                            lat:48.922125855877766
                        },
                        {
                            lng:24.72322427691654,
                            lat:48.92253749340784
                        },
                        {
                            lng:24.723507303611996,
                            lat:48.922904069806805
                        },
                        {
                            lng:24.723007769004994,
                            lat:48.92310321862369
                        },
                        {
                            lng:24.722814489023335,
                            lat:48.92316446130841
                        },
                        {
                            lng:24.72265339554997,
                            lat:48.923306774175664
                        },
                        {
                            lng:24.722529933469104,
                            lat:48.92345018851645
                        },
                        {
                            lng:24.72244402231422,
                            lat:48.923667622575394
                        },
                        {
                            lng:24.72155873240672,
                            lat:48.92343983331644
                        },
                        {
                            lng:24.72143202485279,
                            lat:48.923423968716385
                        },
                        {
                            lng:24.720671296732007,
                            lat:48.92359580003606
                        },
                        {
                            lng:24.719153676049245,
                            lat:48.92398484430016
                        },
                        {
                            lng:24.718378772453775,
                            lat:48.92419698893937
                        },
                        {
                            lng:24.717555589096037,
                            lat:48.924437330374616
                        },
                        {
                            lng:24.71714354814719,
                            lat:48.924577435906336
                        },
                        {
                            lng:24.71688707532121,
                            lat:48.924699917584924
                        },
                        {
                            lng:24.71669848920544,
                            lat:48.92490743266184
                        },
                        {
                            lng:24.71664174707371,
                            lat:48.92502176388775
                        },
                        {
                            lng:24.71652063192562,
                            lat:48.92535814805394
                        },
                        {
                            lng:24.71641426892711,
                            lat:48.92563549249381
                        },
                        {
                            lng:24.716248897330274,
                            lat:48.92599742589002
                        },
                        {
                            lng:24.716099156306427,
                            lat:48.926297346316886
                        },
                        {
                            lng:24.715879677848307,
                            lat:48.92658316670555
                        },
                        {
                            lng:24.71528397347538,
                            lat:48.92725887223329
                        },
                        {
                            lng:24.715185746266457,
                            lat:48.92736142198295
                        },
                        {
                            lng:24.715166349390074,
                            lat:48.92738513493875
                        },
                        {
                            lng:24.715108878451815,
                            lat:48.92743945492439
                        },
                        {
                            lng:24.715048725304655,
                            lat:48.927513159572015
                        },
                        {
                            lng:24.714960408962725,
                            lat:48.927593913088025
                        },
                        {
                            lng:24.714777397336434,
                            lat:48.9277797520578
                        },
                        {
                            lng:24.714183647885193,
                            lat:48.92833922064572
                        },
                        {
                            lng:24.713897869967695,
                            lat:48.92859649895257
                        },
                        {
                            lng:24.713748275486523,
                            lat:48.928717207689125
                        },
                        {
                            lng:24.71356113007903,
                            lat:48.92882910513166
                        },
                        {
                            lng:24.71333771352124,
                            lat:48.928942762100014
                        },
                        {
                            lng:24.713126366903907,
                            lat:48.92904408346014
                        },
                        {
                            lng:24.71290618045009,
                            lat:48.929173594797284
                        },
                        {
                            lng:24.71225818165817,
                            lat:48.929495183469655
                        },
                        {
                            lng:24.711936676421942,
                            lat:48.92963699980194
                        },
                        {
                            lng:24.711569393709624,
                            lat:48.929662972472705
                        },
                        {
                            lng:24.711322720441558,
                            lat:48.92963454777443
                        },
                        {
                            lng:24.710740771046858,
                            lat:48.9295893824121
                        },
                        {
                            lng:24.710154217747686,
                            lat:48.92950830299294
                        },
                        {
                            lng:24.709890445397264,
                            lat:48.92946203615504
                        },
                        {
                            lng:24.70970713931729,
                            lat:48.929429866711324
                        },
                        {
                            lng:24.70951980992379,
                            lat:48.92942236776806
                        },
                        {
                            lng:24.709423463018084,
                            lat:48.92941861829601
                        },
                        {
                            lng:24.709320410589726,
                            lat:48.929417512093444
                        },
                        
                    ]
                ]
            }
        },
        created : function() {
            this.$store.dispatch('cartCounter');
            this.$store.dispatch('godMode');

            this.$store.dispatch('getTexHeader');
            
            this.$store.dispatch('loadPopup');
        },

        computed :{
            counterItem(){
                return this.$store.state.itemsCounter ;
            },
            godMode(){
                return this.$store.state.godMode;
            },

            textHeader(){
                return {
                    data : this.$store.state.headerText
                }
            },
            checkboxPopup(){
                return {
                    data : this.$store.state.isPopupOpen
                }
            }
            
        },
        
        methods : {
            openPopup(){
                this.openPop = true;
            },
            closePopup(){
                this.openPop = false;
            },
            saveHeaderText(){
                this.$store.dispatch('changeHeadText', this.textHeader.data );
            }, 
            changePopupStartShow(){
                this.$store.dispatch('changePopupShow', this.checkboxPopup.data );
            }
        }

    }
</script>

<style lang="scss">
    .header{ padding: 0 0 15px 0; border-bottom: 1px solid #ccc; 
        .top-line{padding: 10px 0; background-color: #f35d21; 
            .mbox{display: block;}
            .texter{text-align: right; color: #fff;}
            input{width: 100%; height: 40px; font-size: 16px; text-align: right;}
            button{width: 140px; height: 40px; margin: 15px auto 0; display: block;}
        }
        .content{padding: 15px 15px 0; }
        svg{fill: #fff; width: 26px; height: 26px; display: none;}
        .mbox{display: flex; align-items: center; justify-content: space-between;}
        .logo-side{width: 80px; display: block; text-decoration: none;}
        .cart-counter{width: 150px; border-radius: 20px; text-align: center; text-decoration: none; color: #fff; padding: 5px; border: 1px solid #f8a15a; background-color:#f8a15a; transition: all 0.3s; display: flex; align-items: center; justify-content: center;
            strong{display: inline-block; padding: 0 10px; line-height: 30px; color: #fff; border-radius: 15px; min-width: 30px; /*background-color: #e95621; */ margin-left: 5px; font-weight: 400; text-align: center; transition: all 0.3s;}
            &:hover{ background-color: #e95621; 
                strong{ /*background-color: #51291c; */ }
            }
            &.grey{background-color: rgb(83, 83, 83); border-color: rgb(83, 83, 83); }
        }
        .mid-name{font-size: 24px; color: #51291c; text-transform: uppercase;}
        .tel-to-us a{color: #51291c; text-decoration: none; transition: all 0.3s; font-size: 20px;
            &:hover{text-decoration: underline; color: #e95621;}
        }
        .texter-slogan{ text-align: center; 
            h2{ margin: 0; font-weight: 700; font-size: 18px; color: #51291c; text-transform: uppercase; line-height: 1.2;}
            p{ margin: 0; font-weight: 400; font-size: 16px; color: #51291c; line-height: 1.2; 
                span{color: rgb(0, 42, 231); text-decoration: underline; cursor: pointer;}
            }

        }
        .popup-o{display: block;
            .cont{display: flex; align-items: center; justify-content: center;
                input{width: auto;}
            }
        }
    }

    .hidden-popup{position: fixed; z-index: 999; top: 0; left: 0; right: 0; bottom: 0; height: 100vh; display: flex; align-items: center; justify-content: center; background-color: rgba(0,0,0,0.5);
        .overlay{position: absolute; top: 0; left: 0; right: 0; bottom: 0;}
        .mbox{width: 100%; display: block; max-width: 860px;}
    }

    @media screen and (max-width: 960px) {
        .header .cart-counter{width: 120px;}
        .header svg{ display: block;}
        .header .cart-counter span{display: none;}
        .header .mbox{flex-wrap: wrap; }
        .header .logo-side{order: 1;}
        .header .texter-slogan{width: 100%; order: 3; margin: 10px 0 10px;}
        .tel-to-us{order: 4; width: 100%; text-align: center;}
        .header .cart-counter{order: 2;}
    }

    @media screen and (max-width: 640px) {
        .header .texter-slogan h2 { font-size: 16px; }
        .header .tel-to-us a{font-size: 18px;}
    }
</style>
