<template>
  <div>
    <navbar></navbar>
    <b-row>
      <b-col class="mt-3 d-flex justify-content-center align-items-center">
        <p class="header">TOP 5</p>
      </b-col>
    </b-row>
    <rank-table
      :userTable="this.$store.state.userRanking"
      :users="true"
    ></rank-table>
    <b-row>
      <b-col class="mt-3 d-flex justify-content-center align-items-center">
        <button
          @click="report()"
          class="btn btn-sm animated-button mainButton bigButtonForDrunkPeople rounded-0"
        >
          ZGŁOŚ WYPITE
        </button>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="mt-5 d-flex justify-content-center align-items-center">
        <button
          @click="getFullList()"
          class="btn btn-sm animated-button mainButton bigButtonForDrunkPeople rounded-0"
        >
          PEŁNY RANKING
        </button>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="mt-5 d-flex justify-content-center align-items-center">
        <button
          @click="getBeers()"
          class="btn btn-sm animated-button mainButton bigButtonForDrunkPeople rounded-0"
        >
          RANKING PIW
        </button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Navbar from "./Navbar.vue";
import RankTable from "./RankTable.vue";
export default {
  methods: {
    getFullList: function () {
      this.$store.commit("CHANGE_COMPONENT", "AllUsers");
    },
    getBeers: function () {
      this.$store.commit("CHANGE_COMPONENT", "BeerRanking");
    },
    report: function () {
      this.$store.commit("CHANGE_COMPONENT", "AddPost");
    },
  },
  components: { RankTable, Navbar },
  mounted() {
    this.$store.dispatch("getPosts");
    this.$store.dispatch("getBeerList");
    this.$store.dispatch("getUserRanking");
  },
};
</script>

<style lang="sass" scoped>
</style>