import Vue from 'vue';
import './style.scss';

import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import moment from 'moment-timezone';

import { checkFilter, setDay } from './util/bus.js';
import routes from './util/routes';
moment.tz.setDefault("UTC");
Object.defineProperty(Vue.prototype, '$moment', {get(){return this.$root.moment}})


Vue.use(VueResource);
Vue.use(VueRouter);


const bus = new Vue();
Object.defineProperty(Vue.prototype, '$bus', { get() {return this.$root.bus}});

const router = new VueRouter({routes});

new Vue({
    el: '#app',
    router,
    data: {
        genre: [],
        time: [],
        movies: [],
        moment,
        day: moment(),
        bus
    },
    created() {
        this.$http.get('/api').then(res => {
            this.movies = res.data;
        });
        this.$bus.$on('check-filter', checkFilter.bind(this));
        this.$bus.$on('set-day', setDay.bind(this));
    }

});