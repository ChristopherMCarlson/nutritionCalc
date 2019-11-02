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

const USDAKey = 'n0yIYdYvgbcp898BaqZh6AFAIm1wJipeicR45m5c';
const USDAURL = 'https://developer.nrel.gov/api/alt-fuel-stations/v1/nearest.json?api_key=' + USDAKey;

const pixKey = '9888263-5e82026c4efaed628c83b0467';
const url2 = 'https://pixabay.com/api/?key=' + pixKey + '&q=sunset&order=popular&per_page=200&image_type=photo&page='
const apiUrl = url2;
function randomNum() {
  return Math.floor(Math.random() * 3) + 1;
}

const imgApi = axios.create({
  baseURL: apiUrl,
  timeout: 3000
});

const USDAApi = axios.create({
  baseURL: USDAURL,
  timeout: 3000
});

const weatherKey = 'c71f73f66f69011b48df6b46800d4e79'

const weatherApi = axios.create({
  baseURL: '//api.openweathermap.org/data/2.5/',
  timeout: 3000
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    bgImg: '',
    imgResults: [],
    food: [],
    opacity: 0,
    weather: '',
    tempF: '',
    activeComponent: ''
  },
  mutations: {
    setImgResults(state, imgData) {
      state.imgResults.push(...imgData)
    },
    setUser(state, user) {
      state.user = user
    },
    setImg(state, img) {
      state.bgImg = img
    },
    setFood(state, food) {
      state.food = food
    },
    setOpacity(state, opacity) {
      state.opacity = opacity
    },
    setActiveComponent(state, activeComponent) {
      state.activeComponent = activeComponent
    },
    // setWeather(state, weather) {
    //   state.weather = weather
    // },
    // setF(state, temp) {
    //   state.tempF = temp
    // }
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
          // dispatch('getFood')
          // dispatch('getWeather')
          router.push({ name: 'main' })
        })
    },
    login({ commit, dispatch }, creds) {
      auth.post('login', creds)
        .then(res => {
          console.log(res.data)
          commit('setUser', res.data)
          // dispatch('getFood')
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
    createFood({ dispatch }, food) {
      api.post('/food/createFood', food)
        .then(res => {
          dispatch('getFoods')
        })
    },
    getFoods({ commit }) {
      api.get('/food/' + this.state.user._id)
        .then(res => {
          commit('setFood', res.data)
        })
    },
    changeActiveComponent({commit}, activeComponent) {
      commit('setActiveComponent', activeComponent)
    },
    // changeTask({ dispatch }, taskId) {
    //   var task = this.state.tasks.find(task => task._id == taskId)
    //   task.completed = !task.completed
    //   api.put('/task/update/' + taskId, task)
    //     .then(res => {
    //       dispatch('getFood')
    //     })
    // },
    // deleteTask({ dispatch }, taskId) {
    //   api.delete('/task/delete/' + taskId)
    //     .then(res => {
    //       dispatch('getFood')
    //     })
    // },
    changeOpacity({ commit }, opacity) {
      commit('setOpacity', opacity)
    },
    getFood({ commit }, queryDirty) {
      var query = queryDirty.split(' ').join('+');
      USDAApi('' + '&generalSearchInput=' + query)
        .then(res=> {
          commit('returnQuery', res.data)
        })
    },
    // getWeather({ commit }) {
    //   var city = this.state.user.city
    //   weatherApi('' + 'weather?q=' + city + '&&APPID=' + weatherKey)
    //     .then(res => {
    //       commit('setWeather', res.data)
    //       commit('setF', Math.round((res.data.main.temp * 9 / 5) - 459.67))
    //     })
    // },
    changeCity({ dispatch, commit }, userData) {
      api.put('/user/city', userData)
        .then((res) => {
          commit('setUser', res.data)
          dispatch('getWeather')
        })
    }
  }
})