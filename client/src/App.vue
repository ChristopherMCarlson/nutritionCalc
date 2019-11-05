<template>
  <v-app>

      <v-navigation-drawer
      v-model="drawer"
      app
    >
    <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon @click='changeComponent(item.method)'>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content @click='changeComponent(item.method)'>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="indigo"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>My Dash</v-toolbar-title>
    </v-app-bar>

    <v-content>
        <router-view />
    </v-content>
    <v-footer
      color="indigo"
      app
    >
      <span class="white--text">&copy; 2019</span>
    </v-footer>

  </v-app>
</template>

<script>

  export default {
    name: 'App',
    data() {
      return {
        drawer: false,
        items: [
          { title: 'Nutrition', icon: 'mdi-food-apple', method: 'nutrition'},
          { title: 'News', icon: 'mdi-newspaper' , method: 'news'},
          { title: 'Lists', icon: 'mdi-clipboard-list' , method: 'users'},
        ],
        mini: true,
      }
    },
    computed: {
      user() {
        return this.$store.state.user
      },
      food() {
        return this.$store.state.food
      },
      weather() {
        return this.$store.state.weather
      },
      temp() {
        return this.$store.state.tempF
      }
    },
    methods: {
      changeComponent(componentType){
        console.log(componentType)
        this.$store.dispatch('changeActiveComponent', componentType)
      }
    }
  }
</script>

<style>
</style>