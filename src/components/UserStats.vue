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
        <p class="userStats">wypite piwa: 3</p>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="mt-2 d-flex justify-content-center align-items-center">
        <p class="userStats">ilość piwa w ml: 1500</p>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="mt-2 d-flex justify-content-center align-items-center">
        <p class="userStats">wypity alkohol: 90ml</p>
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
      <b-col class="mt-5 mb-5 d-flex justify-content-center align-items-center">
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
      let beerRanking = [
        { name: "Kustosz Tequila", drank: 6, volume: 500, alcVol: 5 },
        { name: "Kuflowe Mocne", drank: 5, volume: 500, alcVol: 6 },
        { name: "Sombersy Rose", drank: 4, volume: 400, alcVol: 4 },
        { name: "Żubr", drank: 3, volume: 500, alcVol: 3 },
        { name: "Perła Export", drank: 1, volume: 500, alcVol: 2 },
      ];
      return beerRanking;
    },
  },
  methods: {},
  components: { BeerTable, Navbar, UserPosts },
};
</script>

<style lang="sass" scoped>
</style>