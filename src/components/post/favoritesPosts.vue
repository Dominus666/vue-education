<template>
  <div>
    <v-progress-linear :indeterminate="true" v-if="loading" color="blue"></v-progress-linear>
    <v-layout row wrap v-else>
      <v-flex xs12 sm6 md4 lg3 padding-custom v-for="(favoritesPost, i) in favoritesPosts" :key="i">
        <v-card class="card-custom">
          <v-img
            :src="favoritesPost.imgSrc"
            height="300px"
          ></v-img>

          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{favoritesPost.title }}</h3>
              <div>{{ favoritesPost.description.substring(0,60) }}...</div>
            </div>
          </v-card-title>

          <v-card-actions>
            <h2>{{ favoritesPost.userName }}</h2>
            <v-spacer></v-spacer>
            <v-btn flat :to="'/post/' + favoritesPost.id">Read more</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  computed: {
    user () {
      return this.$store.getters.user
    },
    favoritesPosts () {
      return this.$store.getters.favoritesPosts
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  mounted() {
    this.$store.dispatch('fetchFavoritesPosts')
  }
}
</script>