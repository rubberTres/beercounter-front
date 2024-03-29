import axios from 'axios'
import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex);

const state = {
    currentComponent: "",
    logged: false,
    username: null,
    userRanking: [],
    userRankingAll: [],
    userList: [],
    beerList: [],
    chosenUser: "Oskar",
    selectedBeer: "",
    posts: [],
    newestPosts: true,
    numberOfPosts: 5,
    usernamesList: [],
    currentDate: "month"
}

// getters
const getters = {
    returnBeerTable: (state) => {
        let beerRanking = state.beerList;
        for (let i = 0; i < state.posts.length; i++) {
            for (let j = 0; j < beerRanking.length; j++) {
                if (beerRanking[j].drank == null) beerRanking[j].drank = 0;
                if (state.posts[i].beer == beerRanking[j].beername) {
                    beerRanking[j].drank =
                        beerRanking[j].drank == 0 ? 1 : beerRanking[j].drank + 1;
                }
            }
        }
        beerRanking.sort((a, b) =>
            a.drank < b.drank
                ? 1
                : a.drank === b.drank
                    ? a.volume < b.volume
                        ? 1
                        : -1
                    : -1
        );

        return beerRanking;
    },
    filterPosts: (state) => {
        let filteredPosts = []
        if (state.newestPosts) {
            filteredPosts = state.posts.sort((a, b) => {
                let arr = a.date.split(/[\s:-]+/)
                let x = new Date(arr[0], arr[1], arr[2], arr[3], arr[4], arr[5])
                arr = b.date.split(/[\s:-]+/)
                let y = new Date(arr[0], arr[1], arr[2], arr[3], arr[4], arr[5])
                return (x < y) ? 1 : - 1
            })
        } else {
            filteredPosts = state.posts.sort((a, b) => {
                let arr = a.date.split(/[\s:-]+/)
                let x = new Date(arr[0], arr[1], arr[2], arr[3], arr[4], arr[5])
                arr = b.date.split(/[\s:-]+/)
                let y = new Date(arr[0], arr[1], arr[2], arr[3], arr[4], arr[5])
                return (x > y) ? 1 : -1
            })
        }
        filteredPosts = filteredPosts.filter(controlFunction)
        function controlFunction(element, index) {
            return index < state.numberOfPosts
        }
        return filteredPosts
    },
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
        })
    },
    logout({ commit }) {
        localStorage.removeItem('token')
        commit("LOGOUT")
        commit("CHANGE_COMPONENT", 'Login')
        alert("Zostałeś wylogowany.")
    },
    checkIfLogged({ commit }) {
        let checkTable = []
        let control = false
        axios.post("https://beer-counter-api.herokuapp.com/usersClient").then((res) => {
            checkTable = res.data
        })
        axios.post("https://beer-counter-api.herokuapp.com/login/authenticate", { dane: `Bearer ${localStorage.getItem('token')}` }).then((res) => {
            if (res.data.text != "err") {
                for (let i = 0; i < checkTable.length; i++) {
                    if (res.data.data.user.name == checkTable[i].name) {
                        control = true
                        commit("LOGGED", res.data.data.user.name)
                        commit("CHANGE_COMPONENT", "Main")
                    }
                }
                if (!control) commit("CHANGE_COMPONENT", "Login")
            } else {
                commit("CHANGE_COMPONENT", "Login")
            }
        })
    },
    getBeerList({ commit }) {
        axios.post("https://beer-counter-api.herokuapp.com/beers").then((res) => {
            commit("CHANGE_BEERLITS", res.data)
        })
    },
    addNewBeer({ commit }, dane) {
        axios.post("https://beer-counter-api.herokuapp.com/addBeer", dane).then((res1) => {
            axios.post("https://beer-counter-api.herokuapp.com/beers").then((res) => {
                commit("CHANGE_BEERLITS", res.data)
            })
        })
    },
    getPosts({ commit }) {
        axios.post("https://beer-counter-api.herokuapp.com/posts").then((res) => {
            commit("GET_POSTS", res.data)
        })
    },
    imageUpload({ dispatch }, dane) {
        let axiosInstance = axios.create({
            baseURL: 'https://api.imgur.com/3/',
            headers: {
                'Authorization': `Client-ID ${process.env.VUE_APP_IMGUR_ID}`,
                'Accept': 'application/json',
            },
            crossDomain: true
        })
        axiosInstance.post('image', dane.fd).then((res) => {
            let dateNow = new Date().toLocaleString("pl-PL", {
                timeZone: "Europe/Warsaw",
            });
            dateNow = dateNow.split(".");
            dateNow[2] = dateNow[2].split(",");
            dateNow = `${dateNow[2][0]}-${dateNow[1]}-${dateNow[0]}${dateNow[2][1]}`;

            let postData = {
                who: dane.who,
                beer: dane.beer,
                link: res.data.data.link,
                date: dateNow,
                desc: dane.desc
            }
            dispatch("uploadPost", postData)
        })
    },
    uploadPost({ commit }, dane) {
        axios.post("https://beer-counter-api.herokuapp.com/upload", dane).then((res) => {
            console.log(dane)
            alert("Dodałeś nowego posta!")
            commit("CHANGE_COMPONENT", "Posts")
        })
    },
    getUserRanking({ commit }) {
        axios.post("https://beer-counter-api.herokuapp.com/usersClient").then((res) => {
            state.userList = res.data
            let userTable = res.data
            // generate userTable
            for (let i = 0; i < state.posts.length; i++) {
                for (let j = 0; j < userTable.length; j++) {
                    if (userTable[j].drank == null) userTable[j].drank = 0
                    if (userTable[j].alcVol == null) userTable[j].alcVol = 0
                    if (userTable[j].score == null) userTable[j].score = 0

                    if (state.posts[i].who == userTable[j].name) {
                        let userName = state.posts[i].who
                        let index = userTable.findIndex(x => x.name == userName);
                        userTable[index].drank += 1
                        let beerIndex = state.beerList.findIndex(x => x.beername == state.posts[i].beer)
                        userTable[index].volume = userTable[index].volume == null ? state.beerList[beerIndex].volume : userTable[index].volume + state.beerList[beerIndex].volume
                        userTable[index].alcVol += state.beerList[beerIndex].voltage * state.beerList[beerIndex].volume * 0.01
                        userTable[index].alcVol = Math.round(userTable[index].alcVol * 100) / 100
                        userTable[index].score += parseFloat(state.beerList[beerIndex].volume) * (1 + (state.beerList[beerIndex].voltage * 0.1))
                    }
                }
            }
            userTable.sort((a, b) => (a.score < b.score) ? 1 : (a.score === b.score) ? ((a.drank < b.drank) ? 1 : -1) : -1)
            state.userRanking = userTable.filter(onlyFive)
            state.userRankingAll = userTable
            function onlyFive(element, index) {
                return index < 5
            }
        })
    },
    getUsernames({ commit }) {
        axios.post("https://beer-counter-api.herokuapp.com/usersClient").then((res) => {
            state.usernamesList = res.data
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
    SELECTED_BEER(state, val) {
        state.selectedBeer = val
    },
    GET_POSTS(state, val) {
        state.posts = val.sort((a, b) => {
            let arr = a.date.split(/[\s:-]+/)
            let x = new Date(arr[0], arr[1], arr[2], arr[3], arr[4], arr[5])
            arr = b.date.split(/[\s:-]+/)
            let y = new Date(arr[0], arr[1], arr[2], arr[3], arr[4], arr[5])
            return (x < y) ? 1 : -1
        })
    },
    UPDATE_RAKNING(state, val) {
        state.userRanking = val
    },
    FILTER_UPDATE(state) {
        state.newestPosts = !state.newestPosts
    },
    RESET_FILTER(state) {
        state.numberOfPosts = 5
    },
    SHOW_MORE(state) {
        state.numberOfPosts += 5
    }
}

//export store 
export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})