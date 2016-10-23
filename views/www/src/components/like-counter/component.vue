<template lang="jade">
    button.btn-like(ref="button" @click.native="handleClick")
        i.icon.icon-like-fill(ref="like")
        .counter
            span {{count}}
            span likes
</template>

<script>
    import mojs from 'mo-js';
    import { postLikes } from '../../models/likes';

    export default {
        name: 'like-counter',
        componentName: 'like-counter',
        props: {
            id: [Number],
            value: [Number]
        },
        data() {
            return {
                count: this.value,
                timeline: {},
                checked: 0
            };
        },
        mounted() {
            this.init();
        },
        methods: {
            init() {
                const $button = this.$refs.button;
                const $like = this.$refs.like;
                const likeTweens = [
                    // ring animation
                    new mojs.Shape({
                        parent: $button,
                        duration: 750,
                        type: 'circle',
                        radius: {0: 40},
                        fill: 'transparent',
                        stroke: '#F35186',
                        strokeWidth: {35:0},
                        opacity: 0.2,
                        top: '45%',
                        easing: mojs.easing.bezier(0, 1, 0.5, 1)
                    }),
                    new mojs.Shape({
                        parent: $button,
                        duration: 500,
                        delay: 100,
                        type: 'circle',
                        radius: {0: 20},
                        fill: 'transparent',
                        stroke: '#F35186',
                        strokeWidth: {5:0},
                        opacity: 0.2,
                        x : 40,
                        y : -60,
                        easing: mojs.easing.sin.out
                    }),
                    new mojs.Shape({
                        parent: $button,
                        duration: 500,
                        delay: 180,
                        type: 'circle',
                        radius: {0: 10},
                        fill: 'transparent',
                        stroke: '#F35186',
                        strokeWidth: {5:0},
                        opacity: 0.5,
                        x: -10,
                        y: -80,
                        isRunLess: true,
                        easing: mojs.easing.sin.out
                    }),
                    new mojs.Shape({
                        parent: $button,
                        duration: 800,
                        delay: 240,
                        type: 'circle',
                        radius: {0: 20},
                        fill: 'transparent',
                        stroke: '#F35186',
                        strokeWidth: {5:0},
                        opacity: 0.3,
                        x: -70,
                        y: -10,
                        easing: mojs.easing.sin.out
                    }),
                    new mojs.Shape({
                        parent: $button,
                        duration: 800,
                        delay: 240,
                        type: 'circle',
                        radius: {0: 20},
                        fill: 'transparent',
                        stroke: '#F35186',
                        strokeWidth: {5:0},
                        opacity: 0.4,
                        x: 80,
                        y: -50,
                        easing: mojs.easing.sin.out
                    }),
                    new mojs.Shape({
                        parent: $button,
                        duration: 1000,
                        delay: 300,
                        type: 'circle',
                        radius: {0: 15},
                        fill: 'transparent',
                        stroke: '#F35186',
                        strokeWidth: {5:0},
                        opacity: 0.2,
                        x: 20,
                        y: -100,
                        easing: mojs.easing.sin.out
                    }),
                    new mojs.Shape({
                        parent: $button,
                        duration: 600,
                        delay: 330,
                        type: 'circle',
                        radius: {0: 25},
                        fill: 'transparent',
                        stroke: '#F35186',
                        strokeWidth: {5:0},
                        opacity: 0.4,
                        x: -40,
                        y: -90,
                        easing: mojs.easing.sin.out
                    }),
                    // icon scale animation
                    new mojs.Tween({
                        duration : 1200,
                        easing: mojs.easing.ease.out,
                        onUpdate: function(progress) {
                            if(progress > 0.3) {
                                const elasticOutProgress = mojs.easing.elastic.out(1.43 * progress - 0.43);

                                $like.style.WebkitTransform = $like.style.transform = `scale3d(${elasticOutProgress},${elasticOutProgress},1)`;
                            } else {
                                $like.style.WebkitTransform = $like.style.transform = 'scale3d(0,0,1)';
                            }
                        }
                    })
                ];

                this.timeline = new mojs.Timeline();

                for(let j = 0, len = likeTweens.length; j < len; j += 1) {
                    this.timeline.add(likeTweens[j]);
                }

                $($button).on('click', () => {
                    if (this.checked) {
                        $button.style.color = '#C0C1C3';
                        this.count -= 1;
                    } else {
                        $button.style.color = '#F35186';
                        this.timeline.replay();
                        this.count += 1;
                        this.post();
                    }

                    this.checked = this.checked ? 0 : 1;
                });
            },
            post() {
                return postLikes(this.id)
                    .then(res => res.data)
                    .then(data => {
                        this.count = data.like_count;
                    });
            }
        }
    }
</script>

<style lang="scss">
    @import "../../stylesheets/common";

    .btn-like{
        position: relative;
        display: inline-block;
        width: 36px;
        height: 36px;
        padding: 0;
        background-color: transparent;
        border: 0;
        color: #c0c1c3;
        .icon{
            display: block;
            font-size: 36px;
            line-height: 1;
        }
        .counter{
            position: absolute;
            bottom: -30px;
            left: 50%;
            height: 20px;
            line-height: 20px;
            white-space: nowrap;
            font-size: 14px;
            color: #c0c1c3;
            @include transform(translateX(-50%));
            span{
                margin: 0 2px;
            }
        }
    }
</style>