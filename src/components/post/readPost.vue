<template>
  <v-container>
    <v-progress-linear :indeterminate="true" v-if="loading" color="blue"></v-progress-linear>
    <section mt-3 elevation-10 v-else>
      <v-layout row wrap>
        <v-flex xs12 lg6>
          <img :src="post.imgSrc">
        </v-flex>
        <v-flex xs12 lg6>
          <div class="post">
            <h4 class="post-title">{{ post.title }}</h4>
            <p class="post-description">{{ post.description }}</p>
          </div>
          <v-card-actions v-if="user">
            <v-spacer></v-spacer>
            <v-btn @click="addLikedPost">
              <v-icon>thumb_up</v-icon>
            </v-btn>
          </v-card-actions>
        </v-flex>
      </v-layout>
    </section>
  </v-container>
</template>

<script>
export default {
  props: ['id'],
  computed: {
    post () {
      const id = this.id
      return this.$store.getters.postById(id)
    },
    user () {
      return this.$store.getters.user
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    addLikedPost () {
      const likedPost = {
        uid: this.user.uid,
        id: this.post.id
      };
      this.$store.dispatch('addLikePost', likedPost)
    }
  }

}
</script>
