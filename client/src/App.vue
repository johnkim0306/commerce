<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" to="/">Sold out</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link active" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link active" to="/"
                >productList</router-link
              >
            </li>
            <li v-if="user.email != undefined" class="nav-item">
              <router-link class="nav-link active" to="/Sales"
                >productCreate
              </router-link>
            </li>
          </ul>
          <form class="d-flex" role="search">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-success me-2" type="submit">
              Search
            </button>
            <GoogleLogin :callback="callback" prompt auto-login>
              <button
                v-if="user.email == undefined"
                class="btn btn-danger me-4"
                type="button"
                @click="clickLogin"
              >
                Login
              </button>
              <button
                v-else
                class="btn btn-danger"
                type="button"
                @click="handleSignOut"
              >
                Logout
              </button>
            </GoogleLogin>
          </form>
        </div>
      </div>
    </nav>
  </header>
  <router-view />
  <footer class="mt-5 py-5 bg-dark">
    <div class="row">
      <div class="col-12 col-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          class="d-block mb-2"
          role="img"
          viewBox="0 0 24 24"
        >
          <title>Product</title>
          <circle cx="12" cy="12" r="10"></circle>
          <path
            d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83m13.79-4l-5.74 9.94"
          ></path>
        </svg>
        <small class="d-block mb-3 text-muted">© 2017–2022</small>
      </div>
      <div class="col-6 col-md">
        <h5>Features</h5>
        <ul class="list-unstyled text-small">
          <li><a class="link-secondary" href="#">Cool stuff</a></li>
          <li><a class="link-secondary" href="#">Random feature</a></li>
          <li><a class="link-secondary" href="#">Team feature</a></li>
          <li><a class="link-secondary" href="#">Stuff for developers</a></li>
          <li><a class="link-secondary" href="#">Another one</a></li>
          <li><a class="link-secondary" href="#">Last time</a></li>
        </ul>
      </div>
      <div class="col-6 col-md">
        <h5>Resources</h5>
        <ul class="list-unstyled text-small">
          <li><a class="link-secondary" href="#">Resource name</a></li>
          <li><a class="link-secondary" href="#">Resource</a></li>
          <li><a class="link-secondary" href="#">Another resource</a></li>
          <li><a class="link-secondary" href="#">Final resource</a></li>
        </ul>
      </div>
      <div class="col-6 col-md">
        <h5>Resources</h5>
        <ul class="list-unstyled text-small">
          <li><a class="link-secondary" href="#">Business</a></li>
          <li><a class="link-secondary" href="#">Education</a></li>
          <li><a class="link-secondary" href="#">Government</a></li>
          <li><a class="link-secondary" href="#">Gaming</a></li>
        </ul>
      </div>
      <div class="col-6 col-md">
        <h5>About</h5>
        <ul class="list-unstyled text-small">
          <li><a class="link-secondary" href="#">Team</a></li>
          <li><a class="link-secondary" href="#">Locations</a></li>
          <li><a class="link-secondary" href="#">Privacy</a></li>
          <li><a class="link-secondary" href="#">Terms</a></li>
        </ul>
      </div>
    </div>
  </footer>
</template>
<script setup>
const callback = (response) => {
  console.log("Handle the response", response);
};
</script>
<script>
import { googleLogout } from "vue3-google-login";
export default {
  data() {
    return {
      client: {
        email: "testing@testing.com",
        email_needs_agreement: false,
        gender: "male",
        has_email: true,
        has_gender: true,
        is_email_valid: true,
        is_email_verified: true,
        profile: {
          nickanme: "testing"
        }
      },
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },

  methods: {
    // This library isn't supporting Vue3 as of September 26th. Not using this codeblock but keep this for future reference
    async handleClickSignIn(){
      try {
        const googleUser = await this.$gAuth.signIn();
        if (!googleUser) {
          return null;
        }
        console.log("googleUser", googleUser);
        this.user = googleUser.getBasicProfile().getEmail();
        console.log("getId", this.user);
        console.log("getBasicProfile", googleUser.getBasicProfile());
        console.log("getAuthResponse", googleUser.getAuthResponse());
        console.log(
          "getAuthResponse",
          this.$gAuth.instance.currentUser.get().getAuthResponse()
        );
      } catch (error) {
        //on fail do something
        console.error(error);
        return null;
      }
    },

    // Vue 3 Version
    async clickLogin() {
      await this.$api("/api/login", {
        param: [
          {
            email: this.client.email,
            nickname: this.client.profile.nickname,
          },
          { nickname: this.client.profile.nickname },
        ],
      });
      this.$store.commit("user", this.client);
    },

    // Vue 3 version 
    async handleSignOut() {
      try {
        googleLogout();
        this.$store.commit("user", {});
        alert("Log out");
        this.$router.push({path:'/'}); 
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
