<template>
  <div>
    <navbar></navbar>
    <b-row>
      <b-col class="mt-3 d-flex justify-content-center align-items-center">
        <p class="header">NAJNOWSZE POSTY</p>
      </b-col>
    </b-row>

    <div v-for="post in this.$store.state.posts" :key="post.imgLink">
      <b-row>
        <b-col class="d-flex justify-content-center align-items-center">
          <div class="projectBox" @click="renderThisUser(post.who)">
            <b-row>
              <b-col class="ml-2 mr-2 ml-lg-5 mr-lg-5 singleItem">
                <p class="postTitle">{{ post.who }}</p>
              </b-col>
            </b-row>
            <b-row class="ml-2 mr-2 ml-lg-5 mr-lg-5 singleItem">
              <b-col
                md="5"
                class="d-flex justify-content-center align-items-center beerPost"
              >
                <img
                  :src="post.imgLink"
                  style="
                    height: 20vh;
                    max-height: 100%;
                    max-width: 100%;
                    border: 1px solid rgba(0, 0, 0, 0.1);
                  "
                />
              </b-col>
              <b-col md="7" class="beerPost">
                <b-row>
                  <b-col
                    class="mt-2 d-flex justify-content-center align-items-center"
                  >
                    <p class="text-center">piwo: {{ post.beer }}</p>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col
                    class="mt-2 d-flex justify-content-center align-items-center"
                  >
                    <p>alkohol: {{ beerVoltage(post.beer) }}%</p>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col
                    class="mt-2 d-flex justify-content-center align-items-center"
                  >
                    <p>pojemność: {{ beerVolume(post.beer) }}ml</p>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col
                    class="mt-2 d-flex justify-content-center align-items-center"
                  >
                    <p>{{ post.date }}</p>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import Navbar from "./Navbar.vue";

export default {
  methods: {
    beerVoltage(val) {
      for (let i = 0; i < this.$store.state.beerList.length; i++) {
        if (this.$store.state.beerList[i].beername == val)
          return this.$store.state.beerList[i].voltage;
      }
    },
    beerVolume(val) {
      for (let i = 0; i < this.$store.state.beerList.length; i++) {
        if (this.$store.state.beerList[i].beername == val)
          return this.$store.state.beerList[i].volume;
      }
    },
    renderThisUser: function (val) {
      if (confirm(`Czy na pewno chcesz przejść na profil użytkownika ${val}`)) {
        this.$store.commit("CHANGE_CHOSEN", val);
        this.$store.commit("CHANGE_COMPONENT", "UserStats");
      }
    },
  },
  components: { Navbar },
  mounted() {
    this.$store.dispatch("getBeerList");
    this.$store.dispatch("getPosts");
  },
};
</script>

<style lang="sass" scoped>
.postBox
  width: 80vw
.projectBox
  height: 300px
  width: 80vw
  @media(max-width: 800px)
    height: 450px
</style>