<template>
  
    <div class="footer">
        <div class="mbox">
            <div class="footer-logo">
                <a href="http://rotata.pizza/">
                    <img width="80" height="54" src="http://if.rotata.pizza/images/logonew.png" class="custom-logo">
                </a>	
                <h4>Rotata Pizza – <br /> твій особистий космос!</h4>
            </div>

            <div class="footer_contacts">
                <h2>Контакти</h2>
                <ul>
                    <li>+ 38 (050)-479-45-45</li>
                    <li>Івано-Франківськ, вул. Грушевского 1</li>
                    <li>box@rotata.pizza</li>
                </ul>
            </div>

            <div class="social-share">
                <span> Приєднуйтесь до нас</span>
                <ul>
                    <li>
                        <a href="https://www.instagram.com/rotata_pizza/" target="_blank">
                            <img src="https://botw-pd.s3.amazonaws.com/styles/logo-thumbnail/s3/052016/untitled-1_201.png" alt="">
                        </a>
                    </li>
                    <li>
                        <a href="https://www.facebook.com/rotatadrive/" target="_blank">
                            <img src="https://facebookbrand.com/wp-content/themes/fb-branding/prj-fb-branding/assets/images/fb-art.png" alt="">
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: 'footerComponent'
    }
</script>

<style lang="scss" scoped>
    
    .footer{ background-color: #fff; padding: 15px 0; border-top: 1px solid #ccc;
        .mbox{display: flex; align-items: center; justify-content: space-around; flex-wrap: wrap;}
        .footer-logo{max-width: 220px; text-align: center;
            a{display: block;}
            h4{margin: 10px 0; font-size: 16px; font-weight: 400;}
        }
        .footer_contacts{max-width: 320px; text-align: center;
            h2{margin: 0 0 10px; font-size: 20px; font-weight: 700;}
            ul{ list-style: none; padding: 0; margin: 0;
                li{ font-size: 14px;; margin: 5px 0;}
            }
        }
        .social-share{width: 240px; text-align: center;
            span{    margin: 0 0 10px; font-size: 20px; font-weight: 700;}
            ul{ list-style: none; padding: 0; margin: 0; display: flex; align-items: center; justify-content: center;
                li{ max-width: 40px; margin: 5px 10px;
                    a{text-decoration: none;}
                }
            }
        }
    }
    

</style>
