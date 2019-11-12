/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
// Styles
require('./bootstrap');
import 'bootstrap-vue/dist/bootstrap-vue.css';


// Installed Components
import VueRouter from 'vue-router';
import BootstrapVue from 'bootstrap-vue';
import Vue from 'vue'
import { Form, HasError, AlertError } from 'vform'

// Components
import DashboardComponent from './components/DashboardComponent.vue';
import CustomerComponent from './components/customer/CustomerComponent.vue';




// Global Declaration
window.Vue = require('vue');
window.Form = Form;






// Usage of Components
Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)


// Initialize the Router View
let routes = [
	{ path: '/dashboard', component: DashboardComponent },
	{ path: '/customer', component: CustomerComponent }
]

let router = new VueRouter({
	routes, // short for `routes: routes`
	mode:'history'
})
/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

// Vue.component('example-component', require('./components/ExampleComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
	el: '#app',
	router
});
