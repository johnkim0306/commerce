import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import mixins from './mixins'
import store from './store'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import vue3GoogleLogin from 'vue3-google-login'
import gAuthPlugin from 'vue3-google-oauth2';

const app = createApp(App)
let gauthClientId = '646217269169-ota10u0kq54b14cr3p70mb14s2lnin9r.apps.googleusercontent.com';
const gAuthOptions = { 
    clientId: gauthClientId, 
    prompt: true, 
    scope: 'email', 
    fetch_basic_profile: true,
    popupType: "TOKEN"
}

app.use(router).mixin(mixins).use(store).use(vue3GoogleLogin, gAuthOptions).use(gAuthPlugin, { clientId: gauthClientId, scope: 'email', prompt: 'consent', fetch_basic_profile: false }).mount('#app')
