<template>
  <div>
    <v-progress-linear :indeterminate="true" v-if="loading" color="blue"></v-progress-linear>
    <v-layout row wrap v-else>
      <v-flex xs12 sm6 md4 lg3 padding-cusstom v-for="(post, i) in posts" :key="i">
        <v-card class="card-custom">
          <v-img
            :src="post.imgSrc"
            height="300px"
          ></v-img>

          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{ post.title }}</h3>
              <div>{{ post.description.substring(0,60) }}...</div>
            </div>
          </v-card-title>

          <v-card-actions>
            <h2>{{ post.userName }}</h2>
            <v-spacer></v-spacer>
            <v-btn flat :to="'/post/' + post.id">Read more</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  export default {
    data: () => ({

    }),
    computed: {
      posts () {
        return this.$store.getters.posts
      },
      loading () {
        return this.$store.getters.loading
      }
    }
  }
</script>

<style lang="scss">
.padding-cusstom {
  padding: 10px;
}
  .card-custom {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
</style>
