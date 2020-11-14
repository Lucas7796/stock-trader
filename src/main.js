import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import './registerServiceWorker'
import vuetify from './plugins/vuetify';
import './plugins/axios'
import * as firebase from './plugins/firebase.js'

Vue.config.productionTip = false

Vue.use(firebase)

Vue.filter('formatBalance', function (balance) {
    return 'R$ ' + (Math.round(balance * 100) / 100).toFixed(2);
})

import './assets/style/globalStyle.css'

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
