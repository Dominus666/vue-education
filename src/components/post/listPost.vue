<template>
  <v-container>
    <v-layout row wrap v-for="(post, i) in posts" :key="i">
      <v-flex xs12>
        <v-card class="card-custom">
          <v-img
            :src="post.imgSrc"
            height="350px"
          ></v-img>

          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{ post.title }}</h3>
              <h4>{{ post.id }}</h4>
              <div>{{ post.description.substring(0,120)}}...</div>
            </div>
          </v-card-title>

          <v-card-actions>
            <v-spacer></v-spacer>
            <app-edit-post :post="post"></app-edit-post>
            <v-btn flat @click="deletePost(post.id)">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import EditPost from './editPost'
  export default {
    methods: {
      deletePost (post) {
        this.$store.dispatch('deletePost', post)
      }
    },
    computed: {
      posts () {
        return this.$store.getters.posts
      }
    },
    components: {
      appEditPost: EditPost
    }
  }
</script>