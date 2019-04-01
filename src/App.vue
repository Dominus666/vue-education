<template>
  <v-app dark>
    <Header></Header>
    <div v-if="error">
      <v-snackbar
        :multi-line="true"
        :timeout="5000"
        :top="true"
        color="error"
        @input="closeError"
        :value="true"
      >
        {{ error }}
        <v-btn
          dark
          flat
          @click.native="closeError"
        >
          Close
        </v-btn>
      </v-snackbar>
    </div>
  </v-app>
</template>

<script>

import Header from './components/header'


export default {
  name: 'App',
  components: {
    Header
  },
  methods: {
    closeError () {
      this.$store.dispatch('clearError')
    }
  },
  computed: {
    error () {
      return this.$store.getters.error
    }
  }
}
</script>


<style lang="scss">
  html {
    overflow: auto !important;
  }
</style>
