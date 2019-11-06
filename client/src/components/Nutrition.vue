<template>
    <v-container>
      <v-row justify="center">
        <v-dialog v-model="addFoodModal" persistent max-width="600px">
          <template v-slot:activator="{ on }">
            <v-btn color="indigo lighten-2" dark v-on="on">Add Meal</v-btn>
          </template>
          <v-card>
            <v-form ref="form" @submit.prevent="createFood">
              <v-card-title>
                <span class="headline">User Profile</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-select v-model="meal" label="Meal" :items='meals' required></v-select>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="calories" label="Calories" required></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
                <small>*indicates required field</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="indigo darken-1" text @click="addFoodModal = false">Cancel</v-btn>
                <v-btn color="indigo darken-1" text @click="addFoodModal = false" type="submit">Save</v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>
      </v-row>
      <div>
        <canvas id="food-dist-chart" height="[$vuetify.breakpoint.mdAndDown ? 1000: 10]"></canvas>
      </div>
      <div>
        <canvas id="total-cals-by-day-chart" height="[$vuetify.breakpoint.mdAndDown ? 1000 : 100]"></canvas>
      </div>
      <div>
        <canvas id="weight-chart" height="[$vuetify.breakpoint.mdAndDown ? 1000 : 100]"></canvas>
      </div>
    </v-container>
  </template>
  
  <script>
  import Chart from 'chart.js';

  export default {
    data: () => ({
      meal: '',
      meals: [
        'Breakfast',
        'Lunch',
        'Dinner',
        'Snack'
      ],
      calories: '',
      addFoodModal: false,
      weightChartData: {
        type: 'line',
        data: {
          labels: ['9/1', '9/8', '9/15', '9/22', '9/29', '10/6', '10/13', '10/20'],
          datasets: [{
            label: 'Weight',
            data: [264, 259, 254, 260, 255, 249, 243, 230],
            fill: false
          }]
        },
        options: {
          responsive: true,
          // maintainAspectRatio: false,
          // scaleOverride: true,
          lineTension: 1,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: false,
                padding: 10,
              }
            }]
          },
          title: {
            display: true,
            position: 'top',
            fontsize: 80,
            text: 'Weight'
          },
          legend: {
            display: false
          }
        }
      },
      foodDistChartData: {
        type: 'doughnut',
        data: {
          labels: [
            'Breakfast',
            'Lunch',
            'Dinner'
          ],
          datasets: [{
            data: [154, 320, 1300],
            backgroundColor: ['blue', 'green', 'red']
          }]
        },
        options: {
          responsive: true,
          title: {
            display: true,
            position: 'top',
            fontsize: 80,
            text: "Today's Calorie Distribution"
          }
        }
      },
      caloriesByDayChartData: {
        type: 'bar',
        data: {
          labels: ['10/28', '10/29', '10/30', '10/31', '11/1', '11/2', '11/3'],
          datasets: [{
            data: [1800, 1526, 1200, 1365, 1589, 1845, 1365],
            backgroundColor: 'rgba(172, 33, 253, 0.48)',
            borderColor: 'rgba(172, 33, 253, 1.0)'
          }]
        },
        options: {
          responsive: true,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                padding: 10,
              }
            }]
          },
          title: {
            display: true,
            position: 'top',
            fontsize: 80,
            text: "Last Week's Calories"
          }
        }
      }
    }),
    mounted () {
      this.createChart('food-dist-chart', this.foodDistChartData)
      this.createChart('total-cals-by-day-chart', this.caloriesByDayChartData)
      this.createChart('weight-chart', this.weightChartData)
      this.$store.dispatch('getMeals', (new Date(Date.now() - ((new Date).getTimezoneOffset() * 60000))).toISOString().slice(0,10))
    },
    methods: {
      createChart(chartId, chartData) {
        const ctx = document.getElementById(chartId);
        const myChart = new Chart(ctx, {
          type: chartData.type,
          data: chartData.data,
          options: chartData.options,
        });
      },
      createFood() {
        let meal = {
          user: this.$store.state.user._id,
          meal: this.meal,
          calories: this.calories,
          date: (new Date(Date.now() - ((new Date).getTimezoneOffset() * 60000))).toISOString().slice(0,10)
        }
        console.log(meal)
        this.$store.dispatch('createMeal', meal)
      }
    },
    //computed: {
    //  weight() {
    //    let wData = this.$store.getters.weightChartData
    //    if (document.getElementById('weight-chart')) {
    //      this.createChart('weight-chart', wData);
    //    }
    //    return "success"
    //  },
    //}
  };
  </script>
  