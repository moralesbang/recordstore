<template>
  <div class="max-w-sm m-auto my-8">
    <div class="border p-10 border-grey-light shadow rounded">
      <h3 class="text-2xl mb-6 text-grey-darkest">Sign Up</h3>
      <form @submit.prevent="signup">
        <div class="mb-6">
          <label for="email" class="label">E-amil address</label>
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

        <div class="mb-6">
          <label for="passwordConfirmation" class="label"
            >Password Confirmation</label
          >
          <input
            type="password"
            v-model="passwordConfirmation"
            class="input"
            id="passwordConfirmation"
            placeholder="Enter again"
          />
        </div>

        <button
          type="submit"
          class="font-sans font-bold px-4 rounded cursor-pointer bg-indigo-dark py-2 text-white"
        >
          Sign Up
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Signup',
  data() {
    return {
      email: '',
      password: '',
      passwordConfirmation: '',
      error: ''
    }
  },
  created() {
    this.checkedSignedIn()
  },
  updated() {
    this.checkedSignedIn()
  },
  methods: {
    signup() {
      this.$http.plain
        .post('/signup', {
          email: this.email,
          password: this.password,
          password_confirmation: this.passwordConfirmation
        })
        .then(response => this.signupSuccessful(response))
        .catch(error => this.signupFailed(error))
    },
    signupSuccessful(response) {
      if (!response.data.csrf) {
        this.signupFailed(response)
        return
      }

      localStorage.csrf = response.data.csrf
      localStorage.signedIn = true
      this.error = ''
      this.$router.replace('/records')
    },
    signupFailed(error) {
      this.error =
        (error.response && error.response.data && error.response.data.error) ||
        'Something went wrong'
      delete localStorage.csrf
      delete localStorage.signedIn
    },
    checkedSignedIn() {
      if (localStorage.signedIn) {
        this.$router.replace('/records')
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
