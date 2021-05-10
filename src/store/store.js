import axios from 'axios'
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex);

const state = {
    currentComponent: "",
    logged: false,
    username: null,
    userRanking: [],
    userList: [],
    beerList: [],
    chosenUser: "Oskar",
    posts: []
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
    addNewBeer({ commit }, dane) {
        axios.post("https://beer-counter-api.herokuapp.com/addBeer", dane).then((res1) => {
            console.log("dodales nowe piwo!")
            console.log(res1.data)
            axios.post("https://beer-counter-api.herokuapp.com/beers").then((res) => {
                console.log(res.data)
                commit("CHANGE_BEERLITS", res.data)
            })
        })
    },
    getPosts({ commit }) {
        axios.post("https://beer-counter-api.herokuapp.com/posts").then((res) => {
            console.log(res.data)
            commit("GET_POSTS", res.data)
        })
    },
    imageUpload({ commit }, dane) {
        const url = " https://api.cloudinary.com/v1_1/jebacpolicje-pl/upload";
        axios.post(url, dane.fd).then((res) => {
            console.log(res.data['secure_url'])
            let postData = {
                who: dane.who,
                beer: dane.beer,
                link: res.data['secure_url']
            }
            axios.post("https://beer-counter-api.herokuapp.com/upload", postData).then((res) => {
                console.log("SIEMA ENIU WYSYŁAM POSTA")
            })
        })
    },
    getUserRanking({ commit }) {
        axios.post("https://beer-counter-api.herokuapp.com/usersClient").then((res) => {
            state.userList = res.data
            let userTable = res.data
            // generate userTable
            for (let i = 0; i < state.posts.length; i++) {
                for (let j = 0; j < userTable.length; j++) {
                    if (state.posts[i].who == userTable[j].name) {
                        let userName = state.posts[i].who
                        let index = userTable.findIndex(x => x.name == userName);
                        console.log(userName, index)
                        userTable[index].drank = userTable[index].drank == null ? 1 : userTable[index].drank + 1
                        let beerIndex = state.beerList.findIndex(x => x.beername == state.posts[i].beer)
                        console.log(beerIndex)
                        console.log(state.beerList[beerIndex])
                        userTable[index].volume = userTable[index].volume == null ? state.beerList[beerIndex].volume : userTable[index].volume + state.beerList[beerIndex].volume
                        userTable[index].alcVol = userTable[index].alcVol == null ? state.beerList[beerIndex].voltage * state.beerList[beerIndex].volume * 0.01 : userTable[index].alcVol + (state.beerList[beerIndex].voltage * state.beerList[beerIndex].volume * 0.01)
                    }
                }
            }
            state.userRanking = userTable
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
    },
    GET_POSTS(state, val) {
        state.posts = val
    },
    UPDATE_RAKNING(state, val) {
        state.userRanking = val
    }
}

//export store 
export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})