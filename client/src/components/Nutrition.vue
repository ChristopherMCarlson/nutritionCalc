<template>
    <v-container>
      <div>
        <canvas id="food-dist-chart" height="[$vuetify.breakpoint.mdAndDown ? 1000 : 50]"></canvas>
      </div>
      <div>
        <canvas id="total-cals-by-day-chart" height="[$vuetify.breakpoint.mdAndDown ? 1000 : 100]"></canvas>
      </div>
      <div>
        <canvas id="weight-chart" height="[$vuetify.breakpoint.mdAndDown ? 1000 : 100]"></canvas>
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
  import Chart from 'chart.js';

  export default {
    data: () => ({
      name: '',
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
            backgroundColor: ['blue', 'red', 'yellow', 'green', 'cyan', 'orange', 'purple']
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
  