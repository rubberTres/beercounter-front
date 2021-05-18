<template>
  <div>
    <b-row>
      <b-col class="mt-3 d-flex justify-content-center align-items-center">
        <p class="header">Rejestracja</p>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="mt-3 d-flex justify-content-center align-items-center">
        <input
          type="text"
          name="login"
          placeholder="Login"
          class="formInput"
          required
        />
      </b-col>
    </b-row>
    <b-row>
      <b-col class="mt-3 d-flex justify-content-center align-items-center">
        <input
          type="password"
          name="pass"
          placeholder="Password"
          class="formInput"
          required
        />
      </b-col>
    </b-row>
    <b-row>
      <b-col class="mt-3 d-flex justify-content-center align-items-center">
        <input
          type="text"
          name="code"
          placeholder="Haslo dostepowe"
          class="formInput"
          required
        />
      </b-col>
    </b-row>
    <b-row>
      <b-col class="mt-5 d-flex justify-content-center align-items-center">
        <!-- <button
          @click="register()"
          class="btn btn-outline-success my-2 my-sm-0 bigButtonForDrunkPeople"
        >
          ZAREJESTRUJ SIĘ
        </button> -->
        <button
          @click="register()"
          class="btn btn-sm animated-button mainButton bigButtonForDrunkPeople"
        >
          ZAREJESTRUJ SIE
        </button>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="mt-5 d-flex justify-content-center align-items-center">
        <button
          @click="changeToLogin()"
          class="btn btn-sm animated-button mainButton bitSmallerButtonForDrunkPeople"
        >
          CHCE SIE ZALOGOWAC
        </button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  methods: {
    register: function () {
      let login = document.querySelector("input[type=text][name=login").value;
      let password = document.querySelector("input[type=password][name=pass")
        .value;
      let kod = document.querySelector("input[type=text][name=code").value;
      console.log(kod);
      console.log(process.env.VUE_APP_PASSPHRASE);
      if (kod == process.env.VUE_APP_PASSPHRASE) {
        if (login != "" && password != "") {
          let dane = {
            name: login,
            password: password,
          };
          let pom = false;
          for (let i = 0; i < this.$store.state.userList.length; i++) {
            if (login == this.$store.state.userList[i].name) {
              pom = true;
              alert("JEST JUŻ USER O TYM LOGINIE");
            }
          }
          if (!pom) {
            this.$store.dispatch("register", dane);
          }
        } else {
          alert("nie wpisałeś loginu/hasła");
        }
      }
    },
    changeToLogin: function () {
      this.$store.commit("CHANGE_COMPONENT", "Login");
    },
  },
};
</script>

<style lang="sass" scoped>
</style>