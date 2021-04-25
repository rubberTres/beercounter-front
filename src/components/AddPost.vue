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
        <input type="file" accept="image/*" capture="camera" id="file" />
      </b-col>
    </b-row>
    <div v-if="!beerButton">
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
          <div class="formHelper">
            <input
              type="text"
              name="procent"
              placeholder="Procent alkoholu"
              class="formInput"
            />
            <label>%</label>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="mt-3 d-flex justify-content-center align-items-center">
          <div class="formHelper">
            <input
              type="text"
              name="volume"
              placeholder="Pojemność (w ml)"
              class="formInput"
            />
            <label>ml</label>
          </div>
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
          v-model="selected"
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
          @click="addPost()"
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
      selected: null,
    };
  },
  methods: {
    showBeerForm: function () {
      this.nieMaPiwa = true;
      this.beerButton = false;
    },
    addPost: function () {
      let uploaded = document.getElementById("file");
      let fd = new FormData();
      fd.append("file", uploaded.files[0]);

      if (uploaded.files[0] != null && this.beerButton) {
        if (this.selected != null) {
          console.log(this.selected); // wybrany obiekt beer
          //tutaj wstawić dispatcha z piwem które już istnieje
        } else alert("Nie wybrałeś piwa!");
      } else if (uploaded.files[0] != null && !this.beerButton) {
        let beerName = document.querySelector("input[type=text][name=beerName]")
          .value;
        let beerVolume = document.querySelector("input[type=text][name=volume]")
          .value;
        let beerAlc = document.querySelector("input[type=text][name=procent]")
          .value;
        if (
          beerName != "" &&
          beerVolume != "" &&
          beerAlc != "" &&
          !isNaN(parseFloat(beerAlc)) &&
          !isNaN(parseInt(beerVolume))
        ) {
          let object = {
            beername: beerName,
            voltage: parseFloat(beerAlc),
            volume: parseInt(beerVolume),
          }; // wybrane nowe piwo
          console.log(object);
          //tutaj wstawić dispatcha z dodawaniem nowego piwa
        } else alert("Złe wartości w piwie! Czy na pewno wypełniłeś wszystko?");
      } else alert("Nie przesłałeś pliku");
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