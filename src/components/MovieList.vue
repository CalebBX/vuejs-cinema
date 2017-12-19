<template>
    <div id="movie-list">
        <movie-item v-for="movie in filteredMovies" v-bind:key="movie.movie.Title" v-bind:movie="movie.movie"></movie-item>
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
                });
            }
        },
        components: {
            MovieItem
        }
    }
</script>

