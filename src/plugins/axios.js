import Vue from 'vue'
import axios from 'axios'

const https = axios.create({
  baseURL: '/stdglprj',
  headers: {
    'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
  },
})
const nohttps = axios.create({
  baseURL: '/stdglprj',
})
https.interceptors.request.use(
  (config) => {
    if(window.sessionStorage.getItem('Authorization')){
      config.headers['scistor-token'] = window.sessionStorage.getItem('Authorization')
      config.headers['Authorization'] = window.sessionStorage.getItem('Authorization')
    }
    return config
  },
  (err) =>　{
    return Promise.reject(err)
  }
  
)

nohttps.interceptors.request.use(
  (config) => {
    if(window.sessionStorage.getItem('Authorization')){
      config.headers['scistor-token'] = window.sessionStorage.getItem('Authorization')
      config.headers['Authorization'] = window.sessionStorage.getItem('Authorization')
    }
    return config
  },
  (err) =>　{
    return Promise.reject(err)
  }
  
)

const jsonAxios = axios.create({})
jsonAxios.interceptors.request.use(
  (config) => {
    if(window.sessionStorage.getItem('Authorization')){
      config.headers['scistor-token'] = window.sessionStorage.getItem('Authorization')
    }
    return config
  },
  (err) =>　{
    return Promise.reject(err)
  }
  
)


Vue.prototype.$nohttps = nohttps
Vue.prototype.$https = https
Vue.prototype.$jsonAxios = jsonAxios

Vue.use(axios)

