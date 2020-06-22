import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
Vue.use(Vuex)
import constantRouterMaps from '@/router/paths'
export default new Vuex.Store({
    /* state:{
        mant:1
    }, */
    /* state: sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')): {
        mant: 1
    }, */
    state: {
        Authorization: sessionStorage.getItem('Authorization') ? sessionStorage.getItem('Authorization') : '',
        saisi: sessionStorage.getItem('scistor-token') ? sessionStorage.getItem('scistor-token') : '',
        routerList: []
    },

    getters: {
        Authorization: state => state.Authorization,
        'scistor-token': state => state.scistor - token,
        routerList: state => state.routerList,
        menuList: state => {
            const data = JSON.parse(JSON.stringify(state.routerList)).map(v => {
                v.icon =  'mdi-file'
                v.title =  v.name
                v.path =  v.route
                return v
            })
            const firstLevel = data.filter(v => !v.parentid)
            const secondLevel = data.filter(v => v.parentid)
            firstLevel.forEach(item => {
                const target = secondLevel.filter(v => item.id == v.parentid)
                if(target && target.length){
                    item.items = target
                }
            })
            return firstLevel
        }
    },
    mutations: {
        /* changeMant(state, data) {
            state.mant = data;
        }, */
        changeLogin(state, user) {
            state.Authorization = user.Authorization;
            sessionStorage.setItem('Authorization', user.Authorization);
            sessionStorage.setItem('scistor-token', user.Authorization);
        },
        setSouterList(state, data) {
            if (data && data.length) {
                localStorage.setItem('menu', JSON.stringify(data))
                state.routerList = data
                const results = []
                data.map(item => {
                    const target = constantRouterMaps.find(v => v.path == item.route)
                    if(target){
                        target.title = item.name
                        target.id = item.id
                        target.parentid = item.parentid
                        results.push(target)
                    }
                })
                results.push({ path: "*", redirect: "/404", hidden: true })
                router.addRoutes(results)
            } else {
                localStorage.setItem('menu', null)
                state.routerList = []
            }
        }
    },
    actions: {}
})
