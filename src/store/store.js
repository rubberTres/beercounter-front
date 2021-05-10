import axios from 'axios'
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex);

const state = {
    currentComponent: "",
    logged: false,
    username: null,
    userRanking: [
        { name: "Oskar", drank: 16, alcVol: 448 },
        { name: "Kawoola", drank: 16, alcVol: 448 },
        { name: "Igor", drank: 16, alcVol: 448 },
        { name: "Pawel", drank: 16, alcVol: 448 },
        { name: "Oliwka", drank: 50, alcVol: 0 }
    ],
    beerList: [],
    chosenUser: "Oskar",
    posts: [
        { who: "Oskar", beer: "Harnaś", imgLink: "https://i.imgur.com/SZ3CYCb.jpg", date: "2020.03.23 13:53" },
        { who: "Oliwka", beer: "Żubr", imgLink: "https://ocen-piwo.pl/upload/cdab48dc2216cfaaf044af81078fe6bf.png", date: "2020.03.23 13:55" },
        { who: "Kawula", beer: "Somersby Rose", imgLink: "https://i.imgur.com/SZ3CYCb.jpg", date: "2020.03.23 13:57" },
        { who: "Oskar", beer: "MAZURSKI Dzikun Pils", imgLink: "https://untappd.akamaized.net/photos/2020_08_02/305d6542f77fd60a632267ef14b294f7_640x640.jpg", date: "2020.03.23 14:02" },

    ],
}

// getters
const getters = {

}

// actions
const actions = {
    login({ commit }, dane) {
        axios.post("https://beer-counter-api.herokuapp.com/login", dane).then((res) => {
            localStorage.setItem('token', res.data.token)
            if (res.data.token != null) {
                alert("Zalogowano.")
                commit('CHANGE_COMPONENT', "Main")
                commit("LOGGED", dane.name)
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
        commit("LOGOUT")
        commit("CHANGE_COMPONENT", 'Login')
        alert("Zostałeś wylogowany.")
    },
    checkIfLogged({ commit }) {
        // if (localStorage.getItem('token') != null) {
        axios.post("https://beer-counter-api.herokuapp.com/login/authenticate", { dane: `Bearer ${localStorage.getItem('token')}` }).then((res) => {
            if (res.data.text != "err") {
                commit("LOGGED", res.data.data.user.name)
                commit("CHANGE_COMPONENT", "Main")
            } else {
                commit("CHANGE_COMPONENT", "Login")
            }
        })
        // } else {
        //     commit("CHANGE_COMPONENT", "Login")
        // }
    },
    getBeerList({ commit }) {
        axios.post("https://beer-counter-api.herokuapp.com/beers").then((res) => {
            console.log(res.data)
            commit("CHANGE_BEERLITS", res.data)
        })
    },
    addPost({ commit }, dane) {
        axios.post("https://beer-counter-api.herokuapp.com/upload", dane).then((res) => {
            console.log("SIEMA ENIU WYSYŁAM POSTA")
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
    },
    CHANGE_CHOSEN(state, val) {
        state.chosenUser = val
    }
}

//export store 
export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})