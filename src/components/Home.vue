<template>
  <v-layout row wrap>
    <v-flex xs4 v-for="movie in movies" :key="movie._id">
      <v-card>
        <v-card-title primary-title>
          <div>
            <v-btn text v-bind:to="`/movies/${movie._id}`">
              {{ movie.name }}
            </v-btn>
            <span class="grey--text">{{ movie.release_year }} . {{ movie.genre }}</span>
          </div>
        </v-card-title>
        <v-card-text class="text-justify">{{ movie.description }}</v-card-text>
        <div class="text-center">
          <v-btn color="primary">Rate this movie</v-btn>
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
      return axios({
        method: 'get',
        url: 'http://localhost:8081/movies',
      })
      .then((response)=>{
        this.movies = response.data.movies;
      })
      .catch(()=>{});
    },

    reply() {
      this.message = "I'm doing great. Thank you!"
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
