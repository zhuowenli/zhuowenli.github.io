<template>
    <div class="side-logo">
        <div class="logo-left">
            <a class="logo link hide" v-link="'/'">
                <svg viewBox="0 0 500 500">
                    <polyline points="413.9,104.2 139.7,104.2 139.7,123.9 322.8,123.9 115.8,354.3 139.7,354.3 352.6,123.9 413.9,124 413.9,137.4 213.1,354.3 219,354.3 377.3,354.3 377.3,413.9 103.1,413.9 103.1,433.6 395.6,433.6 395.9,354.5 413.9,354.3 413.9,453.5 84.8,453.5 84.8,394.5 359,394.5 359,374.4 176.5,374.4 171.2,374.4 383.8,143.6 359,143.6 145.7,374.4 84.6,374.4 84.6,361.5 286.5,143.6 121.7,143.6 121.7,84.3 395.6,84.3 395.5,64.3 103.1,64.3 103.1,143.6 84.5,143.6 84.5,44.9 413.9,44.9 "/>
                </svg>
            </a>
            <hr :dark="true" :right="false"></hr>
        </div>
        <div class="logo-right">
            <div class="format hide">Xiamen, Fujian, China</div>
            <div class="temp">
                <div class="cell">
                    <hr></hr>
                    <p class="today hide">{{now | date "yyyy.MM.dd"}}</p>
                    <hr></hr>
                </div>
                <div class="cell">
                    <hr :dark="true" :left="false"></hr>
                    <p class="weather icon hide" :class='{on: on}'>{{weather}}</p>
                    <hr :dark="true" :left="false"></hr>
                </div>
            </div>
            <div class="tenji">
                <div class="tenjibody">
                    <svg viewBox="0 0 171 23" class="hidechild"> <circle class="st0" cx="1.5" cy="11.5" r="1.5"/> <circle class="st0" cx="17.5" cy="11.5" r="1.5"/> <circle class="st0" cx="25.5" cy="11.5" r="1.5"/> <circle class="st0" cx="33.5" cy="11.5" r="1.5"/> <circle class="st0" cx="41.5" cy="11.5" r="1.5"/> <circle class="st0" cx="49.5" cy="11.5" r="1.5"/> <circle class="st0" cx="57.5" cy="11.5" r="1.5"/> <circle class="st0" cx="65.5" cy="11.5" r="1.5"/> <circle class="st0" cx="73.5" cy="11.5" r="1.5"/> <circle class="st0" cx="105.5" cy="11.5" r="1.5"/> <circle class="st0" cx="129.5" cy="11.5" r="1.5"/> <circle class="st0" cx="145.5" cy="11.5" r="1.5"/> <circle class="st0" cx="153.5" cy="11.5" r="1.5"/> <circle class="st0" cx="161.5" cy="11.5" r="1.5"/> <circle class="st0" cx="1.5" cy="21.5" r="1.5"/> <circle class="st0" cx="9.5" cy="21.5" r="1.5"/> <circle class="st0" cx="17.5" cy="21.5" r="1.5"/> <circle class="st0" cx="33.5" cy="21.5" r="1.5"/> <circle class="st0" cx="57.5" cy="21.5" r="1.5"/> <circle class="st0" cx="65.5" cy="21.5" r="1.5"/> <circle class="st0" cx="73.5" cy="21.5" r="1.5"/> <circle class="st0" cx="81.5" cy="21.5" r="1.5"/> <circle class="st0" cx="105.5" cy="21.5" r="1.5"/> <circle class="st0" cx="121.5" cy="21.5" r="1.5"/> <circle class="st0" cx="129.5" cy="21.5" r="1.5"/> <circle class="st0" cx="137.5" cy="21.5" r="1.5"/> <circle class="st0" cx="145.5" cy="21.5" r="1.5"/> <circle class="st0" cx="153.5" cy="21.5" r="1.5"/> <circle class="st0" cx="161.5" cy="21.5" r="1.5"/> <circle class="st0" cx="169.5" cy="21.5" r="1.5"/> <circle class="st0" cx="1.5" cy="1.5" r="1.5"/> <circle class="st0" cx="9.5" cy="1.5" r="1.5"/> <circle class="st0" cx="17.5" cy="1.5" r="1.5"/> <circle class="st0" cx="25.5" cy="1.5" r="1.5"/> <circle class="st0" cx="33.5" cy="1.5" r="1.5"/> <circle class="st0" cx="41.5" cy="1.5" r="1.5"/> <circle class="st0" cx="73.5" cy="1.5" r="1.5"/> <circle class="st0" cx="81.5" cy="1.5" r="1.5"/> <circle class="st0" cx="97.5" cy="1.5" r="1.5"/> <circle class="st0" cx="113.5" cy="1.5" r="1.5"/> <circle class="st0" cx="137.5" cy="1.5" r="1.5"/> <circle class="st1" cx="9.5" cy="11.5" r="1.5"/> <circle class="st1" cx="81.5" cy="11.5" r="1.5"/> <circle class="st1" cx="89.5" cy="11.5" r="1.5"/> <circle class="st1" cx="97.5" cy="11.5" r="1.5"/> <circle class="st1" cx="113.5" cy="11.5" r="1.5"/> <circle class="st1" cx="121.5" cy="11.5" r="1.5"/> <circle class="st1" cx="137.5" cy="11.5" r="1.5"/> <circle class="st1" cx="169.5" cy="11.5" r="1.5"/> <circle class="st1" cx="25.5" cy="21.5" r="1.5"/> <circle class="st1" cx="41.5" cy="21.5" r="1.5"/> <circle class="st1" cx="49.5" cy="21.5" r="1.5"/> <circle class="st1" cx="89.5" cy="21.5" r="1.5"/> <circle class="st1" cx="97.5" cy="21.5" r="1.5"/> <circle class="st1" cx="113.5" cy="21.5" r="1.5"/> <circle class="st1" cx="49.5" cy="1.5" r="1.5"/> <circle class="st1" cx="57.5" cy="1.5" r="1.5"/> <circle class="st1" cx="65.5" cy="1.5" r="1.5"/> <circle class="st1" cx="89.5" cy="1.5" r="1.5"/> <circle class="st1" cx="105.5" cy="1.5" r="1.5"/> <circle class="st1" cx="121.5" cy="1.5" r="1.5"/> <circle class="st1" cx="129.5" cy="1.5" r="1.5"/> <circle class="st1" cx="145.5" cy="1.5" r="1.5"/> <circle class="st1" cx="153.5" cy="1.5" r="1.5"/> <circle class="st1" cx="161.5" cy="1.5" r="1.5"/> <circle class="st0" cx="169.5" cy="1.5" r="1.5"/> </svg>
                </div>
            </div>
            <hr></hr>
        </div>
    </div>
</template>

<script>
    import Hr from '../ui/hr.vue';
    import WeatherModels from '../../models/weather';

    export default {
        components: {
            Hr
        },
        data() {
            return {
                now: Date.now(),
                weather: 9,
                on: false
            }
        },
        ready() {
            this.init();
        },
        methods: {
            load() {
                return WeatherModels.getWeather(this);
            },
            init() {
                const that = this;

                this.load().then(res => {
                    const {data} = res;
                    const {id} = data.weather[0];
                    const e = Math.floor(id / 100);

                    let weather = that.getWeather(e, id);

                    that.$set('weather', weather);
                    that.$set('on', true);
                }, res => {
                    that.$set('on', true);
                });
            },
            getWeather(e, id) {
                if (e === 2) {
                    return 8;
                } else if(e === 3) {
                    return 4;
                } else if(e === 5) {
                    if (id === 500) {
                        return 4;
                    } else {
                        return 5;
                    }
                } else if(e === 6) {
                    return 6;
                } else if(e === 7) {
                    return 3;
                } else if(e === 8) {
                    if (id === 800) {
                        return 1;
                    } else if (id === 801) {
                        return 2;
                    } else {
                        return 7;
                    }
                } else {
                    return 9;
                }
            }
        }
    }
</script>