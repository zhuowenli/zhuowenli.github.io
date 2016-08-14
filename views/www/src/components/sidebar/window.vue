<template>
    <div class="site-window">
        <hr></hr>
        <div class="body">
            <span class="hide high">WIDTH</span>
            <span class="hide wW">000</span>
            <span class="hide high">HEIGHT</span>
            <span class="hide wH">000</span>
        </div>
        <hr></hr>
    </div>
</template>

<script>
    import Hr from '../ui/hr.vue';

    export default {
        components: {
            Hr,
        },
        ready() {
            const $wW = $('.wW');
            const $wH = $('.wH');

            setSize();

            function setSize(){
                const windowWidth = window.innerWidth;
                const windowHeight = window.innerHeight;

                $wW.text(windowWidth);
                $wH.text(windowHeight);
            }

            $(window).resize(function() {
                setTimeout(function() {
                    setSize();
                }, 500);
            });
        }
    }
</script>