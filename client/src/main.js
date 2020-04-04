import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSocketIO from 'vue-socket.io'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

console.log(window.location)

Vue.use(new VueSocketIO({
    debug: true,
    connection: process.env.VUE_APP_SERVER_HOST + ':' + process.env.VUE_APP_SERVER_PORT,
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
