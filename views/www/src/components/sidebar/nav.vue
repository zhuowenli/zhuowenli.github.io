<template>
    <nav class="side-nav">
        <div class="title table">
            <div class="cell">
                <hr></hr>
                <h3 class="emp hide">MENU</h3>
                <hr></hr>
            </div>
            <div class="cell">
                <hr :dark="true" :left="false"></hr>
                <span class="emp hide"></span>
                <hr :dark="true" :left="false"></hr>
            </div>
        </div>
        <ul>
            <a v-for="(i, menu) in menus" v-link="menu.url" class="link btn">
                <span class="hide num">0{{i + 1}}</span>
                <span class="hide name">{{menu.name | uppercase}}</span>
                <span class="hide lefttop"></span>
                <span class="hide rightbottom"></span>
                <div class="light hidechild"><span class="d"></span><span class="d"></span><span class="d"></span><span class="d"></span><span class="d"></span><span class="d"></span><span class="d"></span><span class="d"></span><span class="d"></span><span class="d"></span><span class="d"></span></div>
            </a>
        </ul>
    </nav>
</template>

<script>
    import Hr from '../ui/hr.vue';
    import {TimelineLite, Power4} from 'gsap/src/uncompressed/TweenMax.js';

    const BTNCOLOR = ['rgba(255,255,255,0.5)', 'rgba(255,255,255,0)'];

    export default {
        components: {
            Hr
        },
        data() {
            const MENUS = [
                {
                    name: 'home',
                    url: '/'
                }, {
                    name: 'front end',
                    url: 'frontend'
                }, {
                    name: 'design',
                    url: 'design'
                }, {
                    name: 'diary',
                    url: 'diary'
                }, {
                    name: 'about',
                    url: 'about'
                }, {
                    name: 'contact',
                    url: 'contact'
                }
            ];

            return {
                menus: MENUS
            }
        },
        ready(){
            $(document).on({
                mouseenter:function(){
                    const $this = $(this);
                    $this.siblings().removeClass('on');
                    $this.addClass('on');

                    const tl = new TimelineLite();

                    tl.to($this, 0.23, {
                        backgroundColor: BTNCOLOR[0],
                        ease: Bounce.easeOut
                    });
                    tl.to($this, 0.5, {
                        backgroundColor:BTNCOLOR[1],
                        ease: Power4.easeOut
                    });
                },
                mouseleave:function(){
                    const $this = $(this);
                }
            },'.btn');
        }
    }
</script>