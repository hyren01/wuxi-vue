import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import Vuetify from 'vuetify/lib'
// Translation provided by Vuetify (javascript)
import zhHans from 'vuetify/es5/locale/zh-Hans'

// import 'vuetify/src/stylus/app.styl'
import '../assets/default.styl';

Vue.use(Vuetify, {
    iconfont: 'md' || 'mdi',
    // options: {
    //     themeVariations: ['primary', 'secondary', 'accent'],
    //     extra: {
    //         mainToolbar: {
    //             color: 'primary',
    //         },
    //         sideToolbar: {
    //         },
    //         sideNav: 'primary',
    //         mainNav: 'primary lighten-1',
    //         bodyBg: '',
    //     }
    // }
    lang: {
        locales: { zhHans },
        current: 'zhHans'
    }
})
