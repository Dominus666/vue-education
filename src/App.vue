<template>
  <v-app dark>
  <Header></Header>
  </v-app>
</template>

<script>

import Header from './components/header'


export default {
  name: 'App',
  components: {
    Header
  },
  data () {
    return {
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  }
}
</script>


<style lang="scss">
  html {
    overflow: auto !important;
  }
</style>
