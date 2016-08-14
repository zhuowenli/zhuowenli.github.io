<template>
    <div class="site-sns">
        <div class="body">
            <a href="https://github.com/zhuowenli" target="_blank" class="btn link on">
                <span class="hide name">github</span>
                <span class="lefttop"></span>
                <span class="rightbottom"></span>
            </a>
            <a href="https://www.zhihu.com/people/zhuowenli" target="_blank" class="btn link">
                <span class="hide name">zhihu</span>
                <span class="lefttop"></span>
                <span class="rightbottom"></span>
            </a>
            <a href="https://github.com/zhuowenli/zhuowenli.github.io" target="_blank" class="btn link">
                <span class="hide name">fork me</span>
                <span class="lefttop"></span>
                <span class="rightbottom"></span>
            </a>
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
    }
</script>