import Vue from 'vue'
import Vuex from 'vuex'
// @ts-ignore
import axios from 'axios'
import router from './router'

var production = !window.location.host.includes('localhost');
var baseUrl = production ? '//cmcinspire.herokuapp.com/' : '//localhost:3000/';

let auth = axios.create({
  baseURL: baseUrl + 'auth',
  timeout: 3000,
  withCredentials: true
})

let api = axios.create({
  baseURL: baseUrl + 'api',
  timeout: 3000,
  withCredentials: true
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    bgImg: '',
    imgResults: [],
    meals: [],
    todaysMeals: {},
    opacity: 0,
    weather: '',
    tempF: '',
    activeComponent: 'Nutrition'
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setActiveComponent(state, activeComponent) {
      state.activeComponent = activeComponent
    },
    setMeal(state, meals){
      state.meals = meals
      let chartData = {
        type: 'doughnut',
        data: {
          labels: [],
          datasets: [{
            data: [],
            backgroundColor: ['green', 'blue', 'yellow', 'red']
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
      }
      meals.forEach(eData => {
        if(!chartData.data.labels.includes(eData.meal)){
          chartData.data.labels.push(eData.meal);
          chartData.data.datasets[0].data.push(eData.calories);
        } else {
          chartData.data.datasets[0].data[chartData.data.labels.indexOf(eData.meal)] += eData.calories;
        }
      })
      state.todaysMeals = chartData;
    }
  },
  actions: {
    //AUTH STUFF
    // @ts-ignore
    register({ commit, dispatch }, newUser) {
      auth.post('register', newUser)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'main' })
        })
    },
    authenticate({ commit, dispatch }) {
      auth.get('authenticate')
        .then(res => {
          commit('setUser', res.data)
          console.log("Authenticate has shot off")
          // dispatch('getMeal')
          // dispatch('getWeather')
          router.push({ name: 'main' })
        })
    },
    login({ commit, dispatch }, creds) {
      auth.post('login', creds)
        .then(res => {
          console.log(res.data)
          commit('setUser', res.data)
          // dispatch('getMeal')
          // dispatch('getWeather')
          router.push({ name: 'main' })
        })
    },
    logout({ commit }) {
      auth.delete('logout')
        // @ts-ignore
        .then(res => {
          router.push({ name: 'home' })
          commit('setUser', {})
        })
    },
    createMeal({ dispatch }, meal) {
      api.post('/meal/createMeal', meal)
        .then(res => {
          dispatch('getMeals')
        })
    },
    getMeals({ commit }, date) {
      api.get('/meal/mealsByDate/' + date)
        .then(res => {
          commit('setMeal', res.data)
        })
    },
    changeActiveComponent({commit}, activeComponent) {
      commit('setActiveComponent', activeComponent)
    },
    changeOpacity({ commit }, opacity) {
      commit('setOpacity', opacity)
    },
    changeCity({ dispatch, commit }, userData) {
      api.put('/user/city', userData)
        .then((res) => {
          commit('setUser', res.data)
          dispatch('getWeather')
        })
    }
  },
  getters: {
    mealsChartData(state){
      let data = state.meals
      let chartData = {
        type: 'doughnut',
        data: {
          labels: [],
          datasets: [{
            data: [],
            backgroundColor: ['green', 'blue', 'yellow', 'red']
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
      }
      data.forEach(eData => {
        if(!chartData.data.labels.includes(eData.meal)){
          chartData.data.labels.push(eData.meal);
          chartData.data.datasets[0].data.push(eData.calories);
        } else {
          chartData.data.datasets[0].data[chartData.data.labels.indexOf(eData.meal)] += eData.calories;
        }
      })
      return chartData
    }
  }
})