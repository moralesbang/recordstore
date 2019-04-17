<template>
  <header class="bg-grey-lighter p-4">
    <div class="flex flex-wrap items-center justify-between">
      <div class="flex items-center mr-6">
        <svg
          class="fill-current text-indigo"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <title>record vinyl</title>
          <path
            d="M23.938 10.773a11.915 11.915 0 0 0-2.333-5.944 12.118 12.118 0 0 0-1.12-1.314A11.962 11.962 0 0 0 12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12c0-.414-.021-.823-.062-1.227zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-5a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
          ></path>
        </svg>

        <router-link
          to="/"
          class="uppercase no-underline font-mono ml-4 font-semibold text-indigo-dark hover:text-indigo-darker tracking-tight"
          >Record Store</router-link
        >
      </div>

      <div class="flex-grow flex items-center w-auto">
        <div class="text-sm lg:flex-grow">
          <router-link
            to="/records"
            class="text-indigo-light hover:text-indigo-dark mr-4 no-underline"
            v-if="signedIn"
            >Records</router-link
          >
          <router-link
            to="/artists"
            class="text-indigo-light hover:text-indigo-dark mr-4 no-underline"
            v-if="signedIn"
            >Artists</router-link
          >
        </div>

        <div>
          <router-link to="/" class="btn btn--secondary" v-if="!signedIn"
            >Sign in</router-link
          >
          <router-link to="/signup" class="btn btn--primary" v-if="!signedIn"
            >Sign up</router-link
          >
          <a href="#" class="btn" @click.prevent="signOut" v-if="signedIn"
            >Log out</a
          >
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  computed: {
    signedIn() {
      return this.$store.state.signedIn
    }
  },
  methods: {
    setError(error, text) {
      this.error =
        (error.response && error.response.data && error.response.data.error) ||
        text
    },
    signOut() {
      this.$http.secured
        .delete('/logout')
        // eslint-disable-next-line no-unused-vars
        .then(response => {
          delete localStorage.csrf
          this.$store.commit('changeSignedIn', false)
          this.$router.replace('/')
        })
        .catch(error => this.setError(error, 'Cannot sign out'))
    }
  }
}
</script>
