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
      return this.$store.getters.returnBeerTable;
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
  mounted() {
    this.$store.dispatch("getBeerList");
  },
};
</script>

<style lang="sass" scoped>
</style>