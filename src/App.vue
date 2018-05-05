<template>
  <div id="app" class="container">
    <header>
      <nav-bar>
        <router-link slot="title" to="/">SmartMap</router-link>

        <template v-if="token">
          <router-link class="nav" to="/dashboard">Dashboard</router-link>
          <a class="nav" @click.prevent="logout" >Logout</a>
        </template>
        <template v-else>
          <router-link class="nav" to="/login">Login</router-link>
          <router-link class="nav" to="/register">Register</router-link>
        </template>
      </nav-bar>
    </header>

    <div class="content">
      <nav></nav>

      <main>
        <error-alert :error="logoutError"></error-alert>
        <router-view></router-view>
      </main>

      <aside></aside>
    </div>

    <footer></footer>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import ErrorAlert from '@/components/ErrorAlert'
import { REQUEST_STATUS } from './api/constants'
import { mapGetters } from 'vuex'

const { REQUESTING, SUCCESS } = REQUEST_STATUS

export default {
  name: 'app',

  computed: {
    ...mapGetters(['token', 'logoutRequest']),

    logoutStatus () { return this.logoutRequest.status },
    logoutError () { return this.logoutRequest.error }
  },

  watch: {
    logoutStatus (val, old) {
      if (old === REQUESTING && val === SUCCESS) {
        this.$router.replace('/')
      }
    }
  },

  components: {
    NavBar,
    ErrorAlert
  },

  methods: {
    logout () {
      this.$store.dispatch('logout', {
        token: this.token
      })
    }
  }
}
</script>

<style>
/* Global variables - Can be used in every components by using var(--var-name) method*/
:root {
  /* Body */
  --body-bg: #f5f8fa;

  /* Borders */
  --laravel-border-color: darken(var(--body-bg), 10%);
  --list-group-border: --laravel-border-color;
  --navbar-default-border: --laravel-border-color;
  --panel-default-border: --laravel-border-color;
  --panel-inner-border: --laravel-border-color;

  /* Brands */
  --brand-primary: #337ab7;
  --brand-secondary: #fff;
  --brand-info: #5bc0de;
  --brand-success: #5cb85c;
  --brand-warning: #f0ad4e;
  --brand-danger: #d9534f;

  /* Borders */
  --border-secondary: #ccc;

  /* Typography */
  --icon-font-path: "";
  --font-family-sans-serif: "Helvetica Neue", Helvetica, Arial, sans-serif;
  --font-size-base: 14px;
  --line-height-base: 1.5;
  --text-color: #636b6f;

  /* Navbar */
  --navbar-default-bg: #ad0a0a;
  --navbar-height: 40px;
  --nav-color: #FC0;
  --nav-bg: #000;

  /* Buttons */
  --btn-default-color: var(--text-color);

  /* Inputs */
  --input-border: lighten(var(--text-color), 40%);
  --input-border-focus: lighten(var(--brand-primary), 25%);
  --input-color-placeholder: lighten(var(--text-color), 30%);

  /* Panels */
  --panel-default-heading-bg: #fff;
}

/* Global style */
html {
  font-size: 1em;
  line-height: var(--line-height-base);
  min-height: 100vh;
}

body {
  color: var(--text-color);
  background-color: var(--body-bg);
  font-size: var(--font-size-base);
  font-family: var(--font-family-sans-serif);
  margin: 0;
  padding: 0;
  min-height: 100vh;
}

#app {
  min-height: 100vh;
}

/* Holy Grail */
.container {
  display: flex;
  min-height: 100vh; /* 1, 3 */
  flex-direction: column;
}

.container > header,
.container > footer {
  flex: none; /* 2 */
}

.container > .content {
  display: flex;
  flex: 1 0 auto; /* 2 */
  flex-direction: column;
  padding: 0;
}

.content > main {
  margin-top: 0;
}

.content > nav {
  order: -1;
}

.content > nav,
.content > aside {
  padding: 0;
}

@media (min-width: 768px) {
  .container > .content {
    flex-direction: row;
  }
  .content > main {
    flex: 1;
    padding: 0;
    margin: 0;
  }
  .content > nav, .content > aside {
    flex: 0 0 auto;
  }
}
</style>
