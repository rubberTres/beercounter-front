<template>
  <div>
    <navbar></navbar>
    <b-row>
      <b-col class="mt-3 d-flex justify-content-center align-items-center">
        <p class="header">
          STATYSTYKI {{ this.$store.state.selectedBeer.toUpperCase() }}
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
        <p class="userStats">
          ilość wypitego piwa: {{ userStat.volume * userStat.drank }} ml
        </p>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="mt-2 d-flex justify-content-center align-items-center">
        <p class="userStats">alkohol: {{ userStat.voltage }}%</p>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="mt-3 d-flex justify-content-center align-items-center">
        <p class="header">TOP BEERS</p>
      </b-col>
    </b-row>
    <beer-rank-table :userTable="rankingLudzi"></beer-rank-table>
    <b-row>
      <b-col class="mt-3 d-flex justify-content-center align-items-center">
        <p class="header">POSTY</p>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="mt-2 d-flex justify-content-center align-items-center">
        <beer-posts></beer-posts>
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
          RESZTA PIW
        </button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Navbar from "./Navbar.vue";
import BeerRankTable from "./BeerRankTable.vue";
import BeerPosts from "./BeerPosts.vue";
export default {
  computed: {
    rankingLudzi() {
      let beerRanking = this.$store.state.usernamesList;

      for (let i = 0; i < this.$store.state.posts.length; i++) {
        if (this.$store.state.posts[i].beer == this.$store.state.selectedBeer) {
          let index = beerRanking.findIndex(
            (x) => x.name == this.$store.state.posts[i].who
          );
          if (index != -1) {
            beerRanking[index].drank =
              beerRanking[index].drank == null
                ? 1
                : beerRanking[index].drank + 1;
          }
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
      return this.$store.getters.returnBeerTable.find(
        (x) => x.beername == this.$store.state.selectedBeer
      );
    },
  },
  methods: {
    getFullList: function () {
      this.$store.commit("CHANGE_COMPONENT", "BeerRanking");
    },
    getPosts: function () {
      this.$store.commit("CHANGE_COMPONENT", "Posts");
    },
  },
  components: { BeerRankTable, Navbar, BeerPosts },
  mounted() {
    this.$store.dispatch("getUsernames");
  },
};
</script>

<style lang="sass" scoped>
</style>