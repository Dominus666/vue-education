<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark>
            <v-toolbar-title>Login form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-text-field 
                prepend-icon="person" 
                v-model="email"
                :rules="emailRules"
                label="E-mail"
              >
              </v-text-field>
              <v-text-field 
                prepend-icon="lock" 
                name="password" 
                label="Password" 
                type="password"
                :rules="passwordRules"
                v-model="password"
              >
              </v-text-field>
              <v-text-field 
                prepend-icon="repeat" 
                name="confirmPassword" 
                label="Confirm Password" 
                type="password"
                :rules="passwordConfirmRules"
                v-model="confirmPassword"
              >
              </v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              @click="onSubmit"
              :disabled="!valid || loading"
              :loading="loading"
            >Create Account</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      valid: false,
      passwordRules: [
        v => !!v || 'Password is required',
        v => v.length >= 6 || 'Password must be equal or than 6 characters'
      ],
      passwordConfirmRules: [
        v => !!v || 'Password is required',
        v => v === this.password || 'Password should match'
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ]
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    onSubmit () {
      if(this.$refs.form.validate()) {
        const user = {
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('registerUser', user)
        .then(() => {
          this.$router.push('/')
        })
      }
      
    }
  }
}
</script>