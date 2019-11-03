<template>
    <v-container>
      <div class="small">
        <bar-chart :chartdata="chartData" :options="chartOptions"/>
        <button @click="fillData()">Randomize</button>
      </div>
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
  import { Bar } from 'vue-chartjs'

  export default {
    extends: Bar,
    data: () => ({
      name: '',
      calories: '',
      addFoodModal: false,
      chartdata: {
        labels: ['January', 'February'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [40, 20]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      },
    }),
    mounted () {
      this.renderChart(this.chartdata, this.options)
    },
    methods: {
      fillData () {
        this.datacollection = {
          labels: [this.getRandomInt(), this.getRandomInt()],
          datasets: [
            {
              label: 'Data One',
              backgroundColor: '#f87979',
              data: [this.getRandomInt(), this.getRandomInt()]
            }, {
              label: 'Data One',
              backgroundColor: '#f87979',
              data: [this.getRandomInt(), this.getRandomInt()]
            }
          ]
        }
      },
      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      }
    }
    //methods: {
    //  createFood() {
    //    let food = {
    //      name: this.name,
    //      calories: this.calories,
    //    }
    //    console.log(food);
    //    this.$store.dispatch('createFood', food)
    //    this.name = ''
    //    this.calories = ''
    //  },
    //}
  };
  </script>
  