<template>
    <div id="movie-list">
        <movie-item class="movie" v-for="movie in filteredMovies" v-bind:key="movie.movie.Title" v-bind:movie="movie.movie"></movie-item>
    </div>
</template>
<script>
    import genres from '../util/genres';
    import MovieItem from './MovieItem.vue';
    export default {
        props: ['genre', 'time', 'movies'],
        computed: {
            filteredMovies(){
                return this.movies.filter((movie) => {
                    if(this.genre.length === 0){
                        return true
                    }
                    return this.genre.find((genre) => {
                        return movie.genre === genre;
                    });
                });
            }
        },
        components: {
            MovieItem
        }
    }
</script>

