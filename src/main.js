import Vue from 'vue';
import App from './App.vue';

/*
Axios is an Http client that helps you with making https requests.
It returns a promise, which is a javascript object that represents the eventual completion
of an asynchronous  operation and its result.
 */
import Axios from "axios";
/*
Used in the second part of the tutorial by Bastiaan.
 */
import 'bootstrap';
/*
We set a base url to axios so that we do not have to worry about it in the rest of our project.
 */
Axios.defaults.baseURL = "https://reqres.in/api/";

/*
Add axios to the global Vue instance, this allows us to access it in any vue instance (like this "this.$axios").
 */
Vue.prototype.$axios = Axios;

Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
}).$mount('#app');
