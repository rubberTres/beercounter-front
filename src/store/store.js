import axios from 'axios'
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex);

const state = {
    currentComponent: "Login",
    logged: false,
    username: ""
}

// getters
const getters = {

}

// actions
const actions = {
    login({ commit }, nick, pass) {
        axios.post("http://linkdoheroku:2115/login", { login: nick, password: pass }).then((res) => {
            if (res.data.gituwa) commit('LOGGED', res.data.login)
            else alert("DANE SĄ NIEPRAWIDŁOWE")
        })
    },
    register({ commit }, nick, pass) {
        axios.post("http://linkdoheroku:2115/register", { login: nick, password: pass }).then((res) => {
            commit('LOGGED', res.data.login)
            console.log("registered user", nick)
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