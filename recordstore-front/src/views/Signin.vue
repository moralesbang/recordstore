<template>
  <div class="max-w-sm m-auto my-8">
    <div class="border p-10 border-grey-light shadow rounded">
      <h3 class="title">Sign In</h3>
      <form @submit.prevent="signin">
        <div class="mb-6">
          <label for="email" class="label">E-mail address</label>
          <input
            type="email"
            v-model="email"
            class="input"
            id="email"
            placeholder="janedoe@example.com"
          />
        </div>

        <div class="mb-6">
          <label for="password" class="label">Password</label>
          <input
            type="password"
            v-model="password"
            class="input"
            id="password"
          />
        </div>

        <button type="submit" class="btn btn--primary">Sign In</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Signin',
  created() {
    this.checkSignedIn()
  },
  updated() {
    this.checkSignedIn()
  },
  data() {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  computed: {
    signedIn() {
      return this.$store.state.signedIn
    }
  },
  methods: {
    signin() {
      this.$http.plain
        .post('/signin', {
          email: this.email,
          password: this.password
        })
        .then(response => this.signinSucessful(response))
        .catch(error => this.signinFailed(error))
    },
    signinSucessful(response) {
      if (!response.data.csrf) {
        this.signinFailed(response)
        return
      }

      localStorage.csrf = response.data.csrf

      this.$store.dispatch('toggleSignedIn')
      this.error = ''
      this.$router.replace('/records')
    },
    signinFailed(error) {
      this.error =
        (error.response && error.response.data && error.response.data.error) ||
        ''
      delete localStorage.csrf
      delete localStorage.signedIn
    },
    checkSignedIn() {
      console.log('signedIn', this.signedIn)
      if (this.signedIn) {
        this.$router.replace('/records')
      }
    }
  }
}
</script>
