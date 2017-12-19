import Vue from 'vue';
import './style.scss';

import MovieList from './components/MovieList.vue';
import MovieFilter from './components/MovieFilter.vue';

import VueResource from 'vue-resource';
import moment from 'moment-timezone';
Object.defineProperty(Vue.prototype, '$moment', {get(){return this.$root.moment}})

Vue.use(VueResource);

new Vue({
    el: '#app',
    data: {
        genre: [],
        time: [],
        movies: [],
        moment
    },
    methods: {
        checkFilter(category, title, checked) {
            if (checked) {
                this[category].push(title);
            } else {
                let index = this[category].indexOf(title);
                if(index > -1){
                    this[category].splice(index, 1);
                }
            }
        }
    },
    components: {
        MovieList,
        MovieFilter
    },
    created() {
        this.$http.get('/api').then(res => {
            this.movies = res.data;
        });
    }
});