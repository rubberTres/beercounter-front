import axios from 'axios'
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex);

const state = {
    currentComponent: "Login",
    logged: false,
    username: "",
    userRanking: [
        { name: "Oskar", drank: 16, alcVol: 448 },
        { name: "Kawoola", drank: 16, alcVol: 448 },
        { name: "Igor", drank: 16, alcVol: 448 },
        { name: "Pawel", drank: 16, alcVol: 448 },
        { name: "Oliwka", drank: 50, alcVol: 0 }
    ]
}

// getters
const getters = {

}

// actions
const actions = {
    login({ commit }, dane) {
        axios.post("http://linkdoheroku:2115/login", dane).then((res) => {
            if (res.data.gituwa) commit('LOGGED', res.data.login)
            else alert("DANE SĄ NIEPRAWIDŁOWE")
        })
    },
    register({ commit }, dane) {
        axios.post("https://beer-counter-api.herokuapp.com/addUser", dane).then((res) => {
            alert("Zostałeś zarejestrowany. Teraz możesz się zalogować.")
            commit('CHANGE_COMPONENT', "Login")
            console.log(res.data.message)
            console.log("registered user", dane.name)
        })
    },
}
const mutations = {
    CHANGE_COMPONENT(state, name) {
        state.currentComponent = name
    },
    LOGGED(state, val) {
        state.logged = true
        state.username = val
    }
}

//export store 
export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})