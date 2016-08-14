<template>
    <div class="home">
    </div>
</template>

<script>
    const $html = $('html');

    export default {
        components: {
        },
        data () {
            return {
            }
        },
        ready() {
        },
        route: {
            activate(transition) {
                $html.addClass('fetch');

                setTimeout(function() {
                    $html.removeClass('fetch');
                }, 1000);

                setTimeout(function() {
                    $('.main').css('opacity', 1);
                }, 2000);

                transition.next();
            },
            deactivate() {
                $('.main').css('opacity', 0);
            }
        }
    }
</script>

<style lang="scss">

</style>
