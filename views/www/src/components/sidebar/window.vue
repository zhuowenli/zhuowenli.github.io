<template>
    <div class="site-window">
        <hr></hr>
        <div class="body">
            <span class="hide high">WIDTH</span>
            <span class="hide wW">{{width}}</span>
            <span class="hide high">HEIGHT</span>
            <span class="hide wH">{{height}}</span>
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
        props: {
            width: Number,
            height: Number,
        }
    }
</script>