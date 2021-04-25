<template>
  <div>
    <navbar></navbar>
    <b-row>
      <b-col class="mt-3 d-flex justify-content-center align-items-center">
        <p class="header">Dodaj zdjęcie</p>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="mt-2 d-flex justify-content-center align-items-center">
        <input type="file" accept="image/*" capture="camera" />
      </b-col>
    </b-row>
    <div v-if="nieMaPiwa">
      <b-row>
        <b-col class="mt-3 d-flex justify-content-center align-items-center">
          <input
            type="text"
            name="beerName"
            placeholder="Nazwa piwa"
            class="formInput"
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col class="mt-3 d-flex justify-content-center align-items-center">
          <input
            type="text"
            name="procent"
            placeholder="Procent alkoholu"
            class="formInput"
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col class="mt-3 d-flex justify-content-center align-items-center">
          <input
            type="text"
            name="volume"
            placeholder="Pojemność (w ml)"
            class="formInput"
          />
        </b-col>
      </b-row>
    </div>
    <b-row v-if="beerButton">
      <b-col class="mt-5 d-flex justify-content-center align-items-center">
        <p class="header">Wybierz piwo</p>
      </b-col>
    </b-row>
    <b-row v-if="beerButton">
      <b-col class="mt-2 d-flex justify-content-center align-items-center">
        <v-select
          class="bigSelect"
          :options="this.$store.state.beerList"
          label="beername"
        ></v-select>
      </b-col>
    </b-row>
    <b-row v-if="beerButton">
      <b-col class="mt-5 d-flex justify-content-center align-items-center">
        <button
          @click="showBeerForm()"
          class="btn btn-sm animated-button mainButton smol rounded-0"
        >
          Brakuje mojego piwa
        </button>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="mt-5 d-flex justify-content-center align-items-center">
        <button
          class="btn btn-sm animated-button mainButton bigButtonForDrunkPeople rounded-0"
        >
          DODAJ
        </button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import vSelect from "vue-select";
import Navbar from "./Navbar.vue";
export default {
  data: () => {
    return {
      beerButton: true,
      nieMaPiwa: false,
    };
  },
  methods: {
    showBeerForm: function () {
      this.nieMaPiwa = true;
      this.beerButton = false;
    },
  },
  components: { vSelect, Navbar },
  mounted() {
    this.$store.dispatch("getBeerList");
  },
};
</script>

<style lang="sass" scoped>
</style>