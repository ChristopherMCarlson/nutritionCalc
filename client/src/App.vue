<template>
  <v-app>
      <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      app
    >
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-title>{{user.name}}</v-list-item-title>

        <v-btn icon  @click.stop="mini = !mini" >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

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

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>

  export default {
    name: 'App',
    data() {
      return {
        drawer: true,
        items: [
          { title: 'Nutrition', icon: 'mdi-food-apple', method: 'nutrition'},
          { title: 'News', icon: 'mdi-newspaper' , method: 'news'},
          { title: 'Users', icon: 'mdi-account-group-outline' , method: 'users'},
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