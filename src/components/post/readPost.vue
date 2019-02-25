<template>
  <v-container>
    <v-progress-linear :indeterminate="true" v-if="loading" color="blue"></v-progress-linear>
    <section mt-3 elevation-10 v-else>
      <v-layout row wrap>
        <v-flex xs12 lg6>
          <img :src="posts.imgSrc">
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
    },
    loading () {
      return this.$store.getters.loading
    }
  }

}
</script>
