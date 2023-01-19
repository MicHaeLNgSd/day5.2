import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router';

import App from './App.vue'
import MainWeather from './components/MainWeather.vue'
import CityWeather from './components/CityWeather.vue'

import axios from 'axios'
import VueAxios from 'vue-axios'

const routes = [
    { path: "/", component: MainWeather },
    { path: "/city-weather/:city", component: CityWeather, props: true }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

createApp(App)
    .use(VueAxios, axios)
    .use(router)
    .mount('#app')
