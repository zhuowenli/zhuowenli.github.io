<template>
    <div class="side-chart">
        <div class="chart">
            <vr :class="'left'"></vr>
            <div class="graphics table">
                <div class="cell">
                    <svg class="svg-graphics" viewBox="0 0 188.3 44.2">
                        <g class="line hide">
                            <line x1="0.5" y1="39.2" x2="187.8" y2="39.2"/>
                        </g>
                        <g>
                            <path class="hide pathline st1" d="M187.8,39.2c0,0-6.6-6.6-18.6-14.1c-12-7.5-21.8-15-37.1-5.3S112.4,29.1,88,30.7s-25.6,8.6-45.3,8.5H0.5"/>
                            <path class="hide pathline st0" d="M0.5,39.2c0,0,43.8-4,65.9-7.3c31-4.5,33.3-31.5,50.4-31.5c19,0,23.7,24.9,43.1,24.9 c19.4,0,21.3,13.8,27.8,13.8"/>
                        </g>
                        <g class="base hide">
                            <line x1="187.8" y1="34.2" x2="187.8" y2="44.2"/>
                            <line x1="0.5" y1="34.2" x2="0.5" y2="44.2"/>
                            <line x1="94.5" y1="36.2" x2="94.5" y2="42.2"/>
                        </g>
                    </svg>
                    <span class="hide unit tx-l">0:00</span>
                    <span class="hide unit tx-c">12:00</span>
                    <span class="hide unit tx-r">24:00</span>
                </div>
                <div class="cell hide">
                    <div class="chart-line">
                        <p>CLOCK IN</p>
                        <div class="line st0"><span></span></div>
                    </div>
                    <div class="chart-line">
                        <p>CLOCK OUT</p>
                        <div class="line st1"><span></span></div>
                    </div>
                </div>
            </div>
            <vr :class="'right'"></vr>
        </div>
        <div class="chart">
            <div class="malefemale">
                <span class="hide unit tx-l">MALE</span>
                <span class="hide unit tx-r">FEMALE</span>
                <div class="hide bar cf">
                    <span class="m"></span>
                    <span class="f"></span>
                </div>
            </div>
            <div class="tenjibody">
                <svg viewBox="0 0 299.5 23" class="hidechild"> <circle class="st0" cx="1.5" cy="1.5" r="1.5"/> <circle class="st0" cx="9.5" cy="1.5" r="1.5"/> <circle class="st0" cx="17.5" cy="1.5" r="1.5"/> <circle class="st0" cx="25.5" cy="1.5" r="1.5"/> <circle class="st0" cx="33.6" cy="1.5" r="1.5"/> <circle class="st0" cx="73.6" cy="1.5" r="1.5"/> <circle class="st0" cx="81.6" cy="1.5" r="1.5"/> <circle class="st0" cx="97.7" cy="1.5" r="1.5"/> <circle class="st0" cx="113.7" cy="1.5" r="1.5"/> <circle class="st0" cx="137.7" cy="1.5" r="1.5"/> <circle class="st0" cx="129.7" cy="1.5" r="1.5"/> <circle class="st0" cx="145.8" cy="1.5" r="1.5"/> <circle class="st0" cx="153.8" cy="1.5" r="1.5"/> <circle class="st0" cx="161.8" cy="1.5" r="1.5"/> <circle class="st0" cx="169.8" cy="1.5" r="1.5"/> <circle class="st0" cx="201.9" cy="1.5" r="1.5"/> <circle class="st0" cx="209.9" cy="1.5" r="1.5"/> <circle class="st0" cx="225.9" cy="1.5" r="1.5"/> <circle class="st0" cx="241.9" cy="1.5" r="1.5"/> <circle class="st0" cx="266" cy="1.5" r="1.5"/> <circle class="st0" cx="298" cy="1.5" r="1.5"/> <circle class="st0" cx="1.5" cy="11.5" r="1.5"/> <circle class="st0" cx="17.5" cy="11.5" r="1.5"/> <circle class="st0" cx="25.5" cy="11.5" r="1.5"/> <circle class="st0" cx="33.6" cy="11.5" r="1.5"/> <circle class="st0" cx="41.6" cy="11.5" r="1.5"/> <circle class="st0" cx="73.6" cy="11.5" r="1.5"/> <circle class="st0" cx="49.6" cy="11.5" r="1.5"/> <circle class="st0" cx="57.6" cy="11.5" r="1.5"/> <circle class="st0" cx="65.6" cy="11.5" r="1.5"/> <circle class="st0" cx="105.7" cy="11.5" r="1.5"/> <circle class="st0" cx="129.7" cy="11.5" r="1.5"/> <circle class="st0" cx="145.8" cy="11.5" r="1.5"/> <circle class="st0" cx="153.8" cy="11.5" r="1.5"/> <circle class="st0" cx="161.8" cy="11.5" r="1.5"/> <circle class="st0" cx="169.8" cy="11.5" r="1.5"/> <circle class="st0" cx="177.8" cy="11.5" r="1.5"/> <circle class="st0" cx="185.8" cy="11.5" r="1.5"/> <circle class="st0" cx="193.8" cy="11.5" r="1.5"/> <circle class="st0" cx="201.9" cy="11.5" r="1.5"/> <circle class="st0" cx="257.9" cy="11.5" r="1.5"/> <circle class="st0" cx="274" cy="11.5" r="1.5"/> <circle class="st0" cx="290" cy="11.5" r="1.5"/> <circle class="st0" cx="233.9" cy="11.5" r="1.5"/> <circle class="st0" cx="282" cy="11.5" r="1.5"/> <circle class="st0" cx="1.5" cy="21.5" r="1.5"/> <circle class="st0" cx="9.5" cy="21.5" r="1.5"/> <circle class="st0" cx="17.5" cy="21.5" r="1.5"/> <circle class="st0" cx="33.6" cy="21.5" r="1.5"/> <circle class="st0" cx="73.6" cy="21.5" r="1.5"/> <circle class="st0" cx="81.6" cy="21.5" r="1.5"/> <circle class="st0" cx="137.7" cy="21.5" r="1.5"/> <circle class="st0" cx="57.6" cy="21.5" r="1.5"/> <circle class="st0" cx="65.6" cy="21.5" r="1.5"/> <circle class="st0" cx="105.7" cy="21.5" r="1.5"/> <circle class="st0" cx="121.7" cy="21.5" r="1.5"/> <circle class="st0" cx="129.7" cy="21.5" r="1.5"/> <circle class="st0" cx="145.8" cy="21.5" r="1.5"/> <circle class="st0" cx="161.8" cy="21.5" r="1.5"/> <circle class="st0" cx="185.8" cy="21.5" r="1.5"/> <circle class="st0" cx="193.8" cy="21.5" r="1.5"/> <circle class="st0" cx="201.9" cy="21.5" r="1.5"/> <circle class="st0" cx="209.9" cy="21.5" r="1.5"/> <circle class="st0" cx="249.9" cy="21.5" r="1.5"/> <circle class="st0" cx="257.9" cy="21.5" r="1.5"/> <circle class="st0" cx="274" cy="21.5" r="1.5"/> <circle class="st0" cx="290" cy="21.5" r="1.5"/> <circle class="st0" cx="233.9" cy="21.5" r="1.5"/> <circle class="st1" cx="41.6" cy="1.5" r="1.5"/> <circle class="st1" cx="49.6" cy="1.5" r="1.5"/> <circle class="st1" cx="57.6" cy="1.5" r="1.5"/> <circle class="st1" cx="65.6" cy="1.5" r="1.5"/> <circle class="st1" cx="89.7" cy="1.5" r="1.5"/> <circle class="st1" cx="105.7" cy="1.5" r="1.5"/> <circle class="st1" cx="121.7" cy="1.5" r="1.5"/> <circle class="st1" cx="177.8" cy="1.5" r="1.5"/> <circle class="st1" cx="185.8" cy="1.5" r="1.5"/> <circle class="st1" cx="193.8" cy="1.5" r="1.5"/> <circle class="st1" cx="217.9" cy="1.5" r="1.5"/> <circle class="st1" cx="249.9" cy="1.5" r="1.5"/> <circle class="st1" cx="257.9" cy="1.5" r="1.5"/> <circle class="st1" cx="274" cy="1.5" r="1.5"/> <circle class="st1" cx="290" cy="1.5" r="1.5"/> <circle class="st1" cx="233.9" cy="1.5" r="1.5"/> <circle class="st1" cx="282" cy="1.5" r="1.5"/> <circle class="st1" cx="9.5" cy="11.5" r="1.5"/> <circle class="st1" cx="81.6" cy="11.5" r="1.5"/> <circle class="st1" cx="97.7" cy="11.5" r="1.5"/> <circle class="st1" cx="113.7" cy="11.5" r="1.5"/> <circle class="st1" cx="137.7" cy="11.5" r="1.5"/> <circle class="st1" cx="89.7" cy="11.5" r="1.5"/> <circle class="st1" cx="121.7" cy="11.5" r="1.5"/> <circle class="st1" cx="209.9" cy="11.5" r="1.5"/> <circle class="st1" cx="217.9" cy="11.5" r="1.5"/> <circle class="st1" cx="249.9" cy="11.5" r="1.5"/> <circle class="st1" cx="225.9" cy="11.5" r="1.5"/> <circle class="st1" cx="241.9" cy="11.5" r="1.5"/> <circle class="st1" cx="266" cy="11.5" r="1.5"/> <circle class="st1" cx="298" cy="11.5" r="1.5"/> <circle class="st1" cx="25.5" cy="21.5" r="1.5"/> <circle class="st1" cx="41.6" cy="21.5" r="1.5"/> <circle class="st1" cx="97.7" cy="21.5" r="1.5"/> <circle class="st1" cx="113.7" cy="21.5" r="1.5"/> <circle class="st1" cx="49.6" cy="21.5" r="1.5"/> <circle class="st1" cx="89.7" cy="21.5" r="1.5"/> <circle class="st1" cx="153.8" cy="21.5" r="1.5"/> <circle class="st1" cx="169.8" cy="21.5" r="1.5"/> <circle class="st1" cx="177.8" cy="21.5" r="1.5"/> <circle class="st1" cx="217.9" cy="21.5" r="1.5"/> <circle class="st1" cx="225.9" cy="21.5" r="1.5"/> <circle class="st1" cx="241.9" cy="21.5" r="1.5"/> <circle class="st0" cx="266" cy="21.5" r="1.5"/> <circle class="st0" cx="282" cy="21.5" r="1.5"/> <circle class="st0" cx="298" cy="21.5" r="1.5"/></svg>
            </div>
        </div>
        <div class="chart">
            <vr :class="'left'"></vr>
            <vr :class="'right'"></vr>
            <div class="graphics age table">
                <div class="cell">
                    <h4 class="hide">AGE</h4>
                    <div class="svg-graphics">
                        <svg viewBox="0 0 279.6 37.5">
                            <g class="hide line">
                                <line x1="0.5" y1="32.5" x2="279.1" y2="32.5"/>
                            </g>
                            <path class="pathline hide st0" d="M0,31.7c0,0,17.6-5.9,26.2-6.8C65.4,20.7,64.4,0.6,86.1,0.6c19.6,0,25,19,63.9,25.3c36,5.8,59.9,5.8,59.9,5.8 c26.3,0,69.7,0,69.7,0"/>
                            <g class="hide base">
                                <line x1="279.1" y1="27.5" x2="279.1" y2="37.5"/>
                                <line x1="0.5" y1="27.5" x2="0.5" y2="37.5"/>
                                <line x1="139" y1="29.5" x2="139" y2="35.5"/>
                            </g>
                        </svg>
                    </div>
                    <span class="hide unit tx-l">20</span>
                    <span class="hide unit tx-r">50</span>
                </div>
            </div><!-- .svgGraphics -->
        </div>
    </div>
</template>

<script>
    import Hr from '../ui/hr.vue';
    import Vr from '../ui/vr.vue';

    export default {
        components: {
            Hr,
            Vr
        }
    }
</script>