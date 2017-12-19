<template>
    <div id="movie-list">
        <div class="movie" v-for="movie in filteredMovies" v-bind:key="movie.title">{{ movie.title }}</div>
    </div>
</template>
<script>
    import genres from '../util/genres';
    export default {
        data: function () {
            return {
                movies: [{
                        title: 'Pulp Fiction',
                        genre: genres.CRIME
                    },
                    {
                        title: 'Godfather',
                        genre: genres.CRIME
                    },
                    {
                        title: 'Titanic',
                        genre: genres.DRAMA
                    },
                    {
                        title: 'Avengers',
                        genre: genres.FANTASY
                    },
                ]
            };
        },
        props: ['genre', 'time'],
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
    }
</script>

