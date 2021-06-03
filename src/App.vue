<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      fixed
    >
      <v-list dense>
        <router-link v-bind:to="{name: 'Home' }"
          class="side_bar_link">
          <v-list-item>
            <v-list-item-action>
              <v-icon>home</v-icon>
            </v-list-item-action>
            <v-list-item-content>Home</v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link v-bind:to="{name: 'Contact' }"
          class="side_bar_link">
          <v-list-item>
            <v-list-item-action>
              <v-icon>contact_mail</v-icon>
            </v-list-item-action>
            <v-list-item-content>Contact</v-list-item-content>
          </v-list-item>
        </router-link>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar color="indigo" dark fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Home</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn v-bind:to="{ name: 'AddMovie' }">Add Movie</v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <div id="app">
          <router-view/>
        </div>
      </v-container>
    </v-main>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2021</span>
    </v-footer>
  </v-app>
</template>
<script>
import './assets/stylesheets/main.css';

export default {
  name: 'App',
  data: ()=>({
    drawer: null,
  }),
  props: {
    source: String,
  }
}
</script>
