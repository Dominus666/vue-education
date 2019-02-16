<template>
  <v-container>
    <section mt-3 elevation-10>
      <v-layout row wrap>
        <v-flex xs12 lg6>
          <img src="../../img/beer1.jpg">
        </v-flex>
        <v-flex xs12 lg6>
          <div class="post">
            <h4 class="post-title">{{ posts.title }}</h4>
            <p class="post-description">{{ posts.description }}</p>
          </div>
        </v-flex>
      </v-layout>
    </section>
  </v-container>
</template>

<script>
export default {
  props: ['id'],
  computed: {
    posts () {
      const id = this.id
      return this.$store.getters.postById(id)
    }
  }

}
</script>
