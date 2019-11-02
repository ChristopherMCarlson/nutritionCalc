<template>
  <v-row class="fill-height">
      <component :is='activeComponent'></component>
  </v-row>
</template>

<script>
  import Nutrition from '../components/Nutrition.vue'

  export default {
    components: {
      'Nutrition':Nutrition 
    },
    created() {
      //blocks users not logged in
      if (!this.$store.state.user._id) {
        this.$router.push({ name: "home" });
      }
    },
    data: () => ({
    }),
    computed: {
      activeComponent() {
        return this.$store.state.activeComponent
      },
    },
    methods: {
    },
  }
</script>