import axios from 'axios'
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex);

const state = {
    currentComponent: "",
    logged: false,
    username: localStorage.getItem('name') || null,
    userRanking: [
        { name: "Oskar", drank: 16, alcVol: 448 },
        { name: "Kawoola", drank: 16, alcVol: 448 },
        { name: "Igor", drank: 16, alcVol: 448 },
        { name: "Pawel", drank: 16, alcVol: 448 },
        { name: "Oliwka", drank: 50, alcVol: 0 }
    ],
    beerList: []
}

// getters
const getters = {

}

// actions
const actions = {
    login({ commit }, dane) {
        axios.post("https://beer-counter-api.herokuapp.com/login", dane).then((res) => {
            if (res.data.token != false) {
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('name', res.data.name)
                alert("Zalogowano.")
                commit('CHANGE_COMPONENT', "Main")
                commit("LOGGED", res.data.name)
            } else {
                alert("Nieprawidłowe dane")
            }
        })
    },
    register({ commit }, dane) {
        axios.post("https://beer-counter-api.herokuapp.com/addUser", dane).then((res) => {
            alert("Zostałeś zarejestrowany. Teraz możesz się zalogować.")
            commit('CHANGE_COMPONENT', "Login")
            console.log(res.data.message, dane.name)
        })
    },
    logout({ commit }) {
        localStorage.removeItem('token')
        localStorage.removeItem('name')
        commit("LOGOUT")
        commit("CHANGE_COMPONENT", 'Login')
        alert("Zostałeś wylogowany.")
    },
    checkIfLogged({ commit }) {
        if (localStorage.getItem('token') == "chuj") {
            commit("LOGGED", localStorage.getItem('name'))
            commit("CHANGE_COMPONENT", "Main")
        } else {
            commit("CHANGE_COMPONENT", "Login")
        }
    },
    getBeerList({ commit }) {
        axios.post("https://beer-counter-api.herokuapp.com/beers").then((res) => {
            console.log(res.data)
            commit("CHANGE_BEERLITS", res.data)
        })
    }
}
const mutations = {
    CHANGE_COMPONENT(state, name) {
        state.currentComponent = name
    },
    LOGGED(state, val) {
        state.logged = true
        state.username = val
    },
    LOGOUT(state) {
        state.logged = false
        state.username = null
    },
    CHANGE_BEERLITS(state, val) {
        state.beerList = val
    }
}

//export store 
export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})