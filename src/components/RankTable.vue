<template>
  <div>
    <b-row class="ml-2 mr-2 ml-lg-5 mr-lg-5">
      <b-col
        cols="2"
        class="mt-3 d-flex justify-content-center align-items-center rankHeader"
      >
        NR
      </b-col>
      <b-col
        cols="4"
        class="mt-3 d-flex justify-content-center align-items-center rankHeader"
      >
        IMIĘ
      </b-col>
      <b-col
        cols="3"
        class="mt-3 d-flex justify-content-center align-items-center rankHeader"
      >
        WYPITE PIWSKA
      </b-col>
      <b-col
        cols="3"
        class="mt-3 d-flex justify-content-center align-items-center rankHeader"
      >
        WYPITY ALKOHOL
      </b-col>
    </b-row>
    <div v-for="(user, i) in userTable" :key="user.name">
      <b-row
        class="ml-2 mr-2 ml-lg-5 mr-lg-5 singleItem"
        @click="renderUserStats(user.name)"
      >
        <b-col
          cols="2"
          class="d-flex justify-content-center align-items-center rankItem"
        >
          {{ i + 1 }}
        </b-col>
        <b-col
          cols="4"
          class="d-flex justify-content-center align-items-center rankItem"
        >
          <div class="cut">{{ user.name }}</div>
        </b-col>
        <b-col
          cols="3"
          class="d-flex justify-content-center align-items-center rankItem"
        >
          {{ user.drank }}
        </b-col>
        <b-col
          cols="3"
          class="d-flex justify-content-center align-items-center rankItem"
        >
          {{ user.alcVol }}
        </b-col>
      </b-row>
    </div>
    <b-row class="mt-3">
      <b-col
        class="d-flex justify-content-center align-content-center fontMono"
      >
        <button
          @click="algorithm()"
          class="btn btn-outline-success my-2 my-sm-0"
        >
          algorytm
        </button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  props: ["userTable"],
  methods: {
    algorithm: function () {
      alert(
        `Punkty są liczone poprzez liczenie dla każdego wypitego piwa:\r\n\r\n  ilość ml * (1 + % alc * 1/10)`
      );
    },
    renderUserStats: function (val) {
      this.$store.commit("CHANGE_CHOSEN", val);
      this.$store.commit("CHANGE_COMPONENT", "UserStats");
    },
  },
};
</script>

<style lang="sass" scoped>
</style>