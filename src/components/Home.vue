<template>
  <v-layout row wrap>
    <v-flex xs4 v-for="movie in movies" :key="movie._id">
      <v-card>
        <v-card-title primary-title>
          <v-btn
            class="text-blue text-center"
            text v-bind:to="`/movies/${movie._id}`">
            {{ movie.name }}
          </v-btn>
          <v-spacer></v-spacer>
          <p class="grey--text text-center">{{ movie.release_year }} . {{ movie.genre }}</p>
        </v-card-title>
        <v-card-text
          class="text-justify">
          {{ movie.description.length > 200 ? movie.description.slice(0, 200)+ '...' : movie.description   }}
          <v-btn text v-bind:to="`/movies/${movie._id}`" >Read More</v-btn>
        </v-card-text>

        <div class="text-center">
          <v-btn
            text v-bind:to="`/movies/${movie._id}`"
            color="primary">
              Rate this movie
          </v-btn>
          <v-spacer></v-spacer>
        </div>
        <v-spacer></v-spacer>
      </v-card>
    </v-flex>
    </v-layout>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Movies',
  data () {
    return {
      movies: [],
    };
  },
  mounted(){
    this.fetchMovies();
  },
  methods: {
    async fetchMovies(){
     // const token = window.localStorage.getItem('auth')
      return axios({
        method: 'get',
        url: '/movies',
      })
      .then((response)=>{
        this.movies = response.data.movies;
       // this.current_user = response.data.current_user
      })
      .catch(()=>{});
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
