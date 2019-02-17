<template>
  <v-layout row wrap>
    <v-flex xs12 sm6 md4 lg3 v-for="(post, i) in posts" :key="i">
      <v-card class="card-custom">
        <v-img
          :src="post.img"
          higth="350px"
        ></v-img>

        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{ post.title }}</h3>
            <div>{{ post.description }}...</div>
          </div>
        </v-card-title>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat :to="'/post/' + post.id">Read more</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data: () => ({

    }),
    computed: {
      posts () {
        return this.$store.getters.posts
      }
    }
  }
</script>

<style lang="scss">
  .card-custom {
    margin: 10px;
  }
</style>
