<template>
    <aside class="expand leftside" :class="{on: on}">
        <svg viewBox="0 0 62.5 866">
            <path class="st0" d="M17.5,0.5H36v141l-10,10v560l10,10v144H17.5" style="transition-delay: 0s; -webkit-transition-delay: 0s; stroke-dashoffset: 910.284301757813px; stroke-dasharray: 910.284301757813px;"></path>
            <path class="st1" d="M43,723v142.5h19.5" style="transition-delay: 0.05s; -webkit-transition-delay: 0.05s; stroke-dashoffset: 162px; stroke-dasharray: 162px;"></path>
            <path class="st1" d="M43,143V0.5h19.5" style="transition-delay: 0.1s; -webkit-transition-delay: 0.1s; stroke-dashoffset: 162px; stroke-dasharray: 162px;"></path>
            <path class="st1" d="M25.7,231.7C16,269.8,9,308.8,4.9,348.8c-2.9,28-4.4,56.4-4.4,85.2c0,28.8,1.5,57.3,4.4,85.4
                C9,559.3,16,598.3,25.7,636.3" style="transition-delay: 0.15s; -webkit-transition-delay: 0.15s; stroke-dashoffset: 408.787078857422px; stroke-dasharray: 408.787078857422px;"></path>
            <line class="st2" x1="15.5" y1="275.5" x2="25.5" y2="275.5"></line>
            <line class="st2" x1="15.5" y1="591.5" x2="25.5" y2="591.5"></line>
            <path class="st1" d="M25,802.5c0-8.4,0-20,0-20h4v20H25z" style="transition-delay: 0.2s; -webkit-transition-delay: 0.2s; stroke-dashoffset: 48px; stroke-dasharray: 48px;"></path>
            <path class="st1" d="M25,853.5c0-8.7,0-40,0-40h4v40H25z" style="transition-delay: 0.25s; -webkit-transition-delay: 0.25s; stroke-dashoffset: 88px; stroke-dasharray: 88px;"></path>
        </svg>
    </aside>
</template>

<script>
    export default {
        props: {
            on: Boolean
        }
    }
</script>