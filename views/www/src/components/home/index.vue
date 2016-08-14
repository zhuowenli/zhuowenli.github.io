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
            activate: function (transition) {
                $html.addClass('fetch');

                setTimeout(function() {
                    $html.removeClass('fetch');
                }, 1000);

                transition.next()
            }
        }
    }
</script>

<style lang="scss">

</style>
