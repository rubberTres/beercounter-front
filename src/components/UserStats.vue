<template>
  <div>
    <navbar></navbar>
    <b-row>
      <b-col class="mt-3 d-flex justify-content-center align-items-center">
        <p class="header">
          STATYSTYKI {{ this.$store.state.chosenUser.toUpperCase() }}
        </p>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="mt-2 d-flex justify-content-center align-items-center">
        <p class="userStats">wypite piwa: {{ userStat.drank }}</p>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="mt-2 d-flex justify-content-center align-items-center">
        <p class="userStats">ilość wypitego piwa: {{ userStat.volume }} ml</p>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="mt-2 d-flex justify-content-center align-items-center">
        <p class="userStats">wypity alkohol: {{ userStat.alcVol }}ml</p>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="mt-3 d-flex justify-content-center align-items-center">
        <p class="header">TOP BEERS</p>
      </b-col>
    </b-row>
    <beer-table :beerTable="rankingPiw"></beer-table>
    <b-row>
      <b-col class="mt-3 d-flex justify-content-center align-items-center">
        <p class="header">POSTY</p>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="mt-2 d-flex justify-content-center align-items-center">
        <user-posts></user-posts>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="mt-5 mb-3 d-flex justify-content-center align-items-center">
        <button
          @click="getPosts()"
          class="btn btn-sm animated-button mainButton bigButtonForDrunkPeople rounded-0"
        >
          WSZYSTKIE POSTY
        </button>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="mt-3 mb-5 d-flex justify-content-center align-items-center">
        <button
          @click="getFullList()"
          class="btn btn-sm animated-button mainButton bigButtonForDrunkPeople rounded-0"
        >
          RESZTA UŻYTKOWNIKÓW
        </button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Navbar from "./Navbar.vue";
import BeerTable from "./BeerTable.vue";
import UserPosts from "./UserPosts.vue";
export default {
  computed: {
    rankingPiw() {
      let beerRanking = this.$store.state.beerList;
      for (let i = 0; i < this.$store.state.posts.length; i++) {
        if (this.$store.state.posts[i].who == this.$store.state.chosenUser) {
          let index = beerRanking.findIndex(
            (x) => x.beername == this.$store.state.posts[i].beer
          );
          beerRanking[index].drank =
            beerRanking[index].drank == null ? 1 : beerRanking[index].drank + 1;
        }
      }
      beerRanking = beerRanking.filter((x) => x.drank != null);
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
    userStat() {
      return this.$store.state.userList.find(
        (x) => x.name == this.$store.state.chosenUser
      );
    },
  },
  methods: {
    getFullList: function () {
      this.$store.commit("CHANGE_COMPONENT", "AllUsers");
    },
    getPosts: function () {
      this.$store.commit("CHANGE_COMPONENT", "Posts");
    },
  },
  components: { BeerTable, Navbar, UserPosts },
};
</script>

<style lang="sass" scoped>
</style>