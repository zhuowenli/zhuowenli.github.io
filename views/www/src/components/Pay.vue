<template>
    <div class="pay">

        pay {{title}}
    </div>
</template>

<script>
    export default {
        name: "Pay",
        data () {
            return {
                title: '提交订单',
                data: null,
                price: ''
            }
        },
    }
</script>
