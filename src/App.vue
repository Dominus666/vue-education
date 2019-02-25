<template>
  <v-app dark>
  <Header/>
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
  }
}
</script>


<style lang="scss">
  html {
    overflow: auto !important;
  }
</style>
