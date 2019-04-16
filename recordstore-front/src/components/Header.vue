<template>
  <header>
    <div>
      <div>
        <a href="/">Record Store</a>
      </div>
      <div>
        <router-link to="/" v-if="signedIn2">Sign in</router-link>
        <a href="#" @click.prevent="signOut" v-if="signedIn2">Log out</a>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    setError(error, text) {
      this.error =
        (error.response && error.response.data && error.response.data.error) ||
        text
    },
    signedIn() {
      return localStorage.signedIn
    },
    signOut() {
      this.$http.secured
        .delete('/logout')
        // eslint-disable-next-line no-unused-vars
        .then(response => {
          delete localStorage.csrf
          delete localStorage.signedIn
          this.$router.replace('/')
        })
        .catch(error => this.setError(error, 'Cannot sign out'))
    }
  }
}
</script>
