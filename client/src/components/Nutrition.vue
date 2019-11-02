<template>
    <v-container>
      <h1>NUTRITION!</h1>
        <v-dialog v-model="addFoodModal" max-width="290">
          <v-card>
            <v-card-title class="headline">Add Food</v-card-title>
            <v-form ref="form" @submit.prevent="createFood">
              <v-text-field v-model="name" label="Name" required></v-text-field>
              <v-text-field v-model="calories" label="Calories" required></v-text-field>
              <v-btn color="green darken-1" text @click="dialog = false">Cancel</v-btn>
              <v-btn color="success" class="mr-4" type="submit">Submit</v-btn>
            </v-form>
          </v-card>
        </v-dialog>
    </v-container>
  </template>
  
  <script>
  export default {
    data: () => ({
      name: '',
      calories: '',
      addFoodModal: false
    }),
    methods: {
      createFood() {
        let food = {
          name: this.name,
          calories: this.calories,
        }
        console.log(food);
        this.$store.dispatch('createFood', food)
        this.name = ''
        this.calories = ''
      },
    }
  };
  </script>
  