<template>
  <div>
    <navbar></navbar>
    <b-row>
      <b-col class="mt-3 d-flex justify-content-center align-items-center">
        <p class="header">LISTA PIW</p>
      </b-col>
    </b-row>
    <beer-table :beerTable="rankingPiw"></beer-table>
    <b-row>
      <b-col class="mt-5 mb-5 d-flex justify-content-center align-items-center">
        <button
          @click="getFullList()"
          class="btn btn-sm animated-button mainButton bigButtonForDrunkPeople rounded-0"
        >
          TOP USERS
        </button>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="mt-5 mb-5 d-flex justify-content-center align-items-center">
        <button
          @click="getPosts()"
          class="btn btn-sm animated-button mainButton bigButtonForDrunkPeople rounded-0"
        >
          POSTY
        </button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Navbar from "./Navbar.vue";
import BeerTable from "./BeerTable.vue";
export default {
  computed: {
    rankingPiw() {
      let beerRanking = this.$store.state.beerList;
      for (let i = 0; i < this.$store.state.posts.length; i++) {
        for (let j = 0; j < beerRanking.length; j++) {
          if (beerRanking[j].drank == null) beerRanking[j].drank = 0;
          if (this.$store.state.posts[i].beer == beerRanking[j].beername) {
            beerRanking[j].drank =
              beerRanking[j].drank == 0 ? 1 : beerRanking[j].drank + 1;
          }
        }
      }
      // beerRanking = beerRanking.filter((x) => x.drank != null);
      beerRanking.sort((a, b) => (a.drank < b.drank ? 1 : -1));
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
  components: { BeerTable, Navbar },
};
</script>

<style lang="sass" scoped>
</style>