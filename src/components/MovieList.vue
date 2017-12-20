<template>
    <div id="movie-list">
        <div v-if="filteredMovies.length > 0">
            <movie-item v-for="movie in filteredMovies" 
                        v-bind:key="movie.movie.Title" 
                        v-bind:movie="movie.movie" 
                        v-bind:sessions="movie.sessions"
                        v-bind:day="day">
            </movie-item>
        </div>
        <div class="no-results" v-else-if="movies.length > 0">
            No results.
        </div>
        <div class="no-results" v-else>
            Loading...
        </div>
    </div>
</template>
<script>
    import genres from '../util/genres';
    import times from '../util/times';
    import MovieItem from './MovieItem.vue';

    export default {
        props: ['genre', 'time', 'day', 'movies'],
        methods: {
            moviePassesGenreFilter(movie){
                if(this.genre.length === 0){
                        return true
                    } else {
                        let movieGenres = movie.movie.Genre.split(", ");
                        let matched = true;
                        this.genre.forEach(genre => {
                            if(movieGenres.indexOf(genre) === -1){
                                matched = false;
                            }
                        });
                        return matched;
                    } 
            },
            sessionPassesTimeFilter(session){
                if (!this.day.isSame(this.$moment(session.time), 'day')){
                    return false;
                } else if (this.time.length === 0 || this.time.length === 2){
                    return true
                } else if (this.time[0] == times.AFTER_6PM){
                    return this.$moment(session.time).hour() >= 18;
                } else {
                    return this.$moment(session.time).hour() < 18;
                }
                return true;
            }
        },
        computed: {
            filteredMovies(){
                return this.movies
                    .filter(this.moviePassesGenreFilter)
                    .filter((movie) => {
                        return movie.sessions.find(this.sessionPassesTimeFilter)
                    });
            }
        },
        components: {
            MovieItem
        }
    }
</script>

