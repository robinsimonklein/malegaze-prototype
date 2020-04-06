import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSocketIO from 'vue-socket.io'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

const socketUrl = (process.env.VUE_APP_HTTPS === "true" ? 'https://' : 'http://') + process.env.VUE_APP_SERVER_HOST + (process.env.VUE_APP_SERVER_PORT ? ':' + process.env.VUE_APP_SERVER_PORT : '')

console.log(socketUrl)

Vue.use(new VueSocketIO({
    debug: process.env.NODE_ENV === 'development',
    connection: socketUrl,
    vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
    },//Optional options
}))


new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
