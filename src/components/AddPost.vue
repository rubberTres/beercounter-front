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
          :options="beers"
          v-model="selected"
          label="label"
        ></v-select>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="mt-2 d-flex justify-content-center align-items-center">
        <div class="formHelper">
          <input
            type="text"
            name="desc"
            placeholder="Opis"
            class="formInput"
            maxlength="100"
            v-model="desc"
            style="padding-right: 22px"
          />
          <label id="desc">{{ desc.length }}/100</label>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="mt-5 d-flex justify-content-center align-items-center">
        <button
          @click="showBeerForm()"
          class="btn btn-sm animated-button mainButton smol rounded-0"
        >
          {{ text }}
        </button>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="mt-5 d-flex justify-content-center align-items-center">
        <button
          @click="addPost()"
          class="btn btn-sm animated-button mainButton bigButtonForDrunkPeople rounded-0"
          :disabled="hasClicked"
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
      hasClicked: false,
      desc: "",
    };
  },
  computed: {
    beers() {
      let arr = this.$store.getters.returnBeerTable;
      for (let i = 0; i < arr.length; i++) {
        arr[i].label = `${arr[i].beername} | ${arr[i].volume}ml`;
      }
      return arr;
    },
    text() {
      if (this.beerButton == false) {
        return "Wróć do listy piw";
      } else {
        return "Brakuje mojego piwa";
      }
    },
  },
  methods: {
    showBeerForm: function () {
      this.nieMaPiwa = !this.nieMaPiwa;
      this.beerButton = !this.beerButton;
    },
    uploadImage: function () {
      let uploaded = document.getElementById("file");
      let fd = new FormData();
      fd.append("image", uploaded.files[0]);
      this.$store.dispatch("imgurUpload", fd);
    },
    addPost: function () {
      let uploaded = document.getElementById("file");
      let fd = new FormData();
      fd.append("file", uploaded.files[0]);
      fd.append("upload_preset", "penisjs");
      if (uploaded.files[0] != null && this.beerButton) {
        if (this.selected != null) {
          this.hasClicked = true;
          let dane = {
            who: this.$store.state.username,
            fd: fd,
            beer: this.selected.beername,
            desc: this.desc == "" ? "brak opisu" : this.desc,
          };
          console.log(dane);
          this.$store.dispatch("imageUpload", dane);
        } else alert("Nie wybrałeś piwa!");
      } else if (uploaded.files[0] != null && !this.beerButton) {
        let beerName = document.querySelector("input[type=text][name=beerName]")
          .value;
        let beerVolume = document.querySelector("input[type=text][name=volume]")
          .value;
        let beerAlc = document.querySelector("input[type=text][name=procent]")
          .value;
        let duplicate = false;
        for (let i = 0; i < this.$store.getters.returnBeerTable.length; i++) {
          if (beerName == this.$store.getters.returnBeerTable[i].beername)
            duplicate = true;
        }
        if (
          beerName != "" &&
          beerVolume != "" &&
          beerAlc != "" &&
          !duplicate &&
          !isNaN(parseFloat(beerAlc)) &&
          !isNaN(parseInt(beerVolume))
        ) {
          this.hasClicked = true;
          let object = {
            name: beerName,
            voltage: parseFloat(beerAlc),
            volume: parseInt(beerVolume),
          }; // wybrane nowe piwo
          this.$store.dispatch("addNewBeer", object);
          let dane = {
            who: this.$store.state.username,
            fd: fd,
            beer: beerName,
            desc: this.desc == "" ? "brak opisu" : this.desc,
          };
          this.$store.dispatch("imageUpload", dane);
        } else if (duplicate) {
          alert("Jest już piwo o tej nazwie!");
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