<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <v-content>
          <v-container fluid fill-height>
            <v-layout align-center justify-center>
              <v-flex xs12>
                <v-card class="elevation-12">
                  <v-toolbar dark>
                    <v-toolbar-title>Create Post</v-toolbar-title>
                  </v-toolbar>
                  <v-card-text>
                    <v-form ref="form" v-model="valid">
                      <v-text-field
                        name="title" 
                        label="Title" 
                        type="text"
                        required
                        :rules="[v => !!v || 'Title is require']"
                        v-model="title"
                        >
                      </v-text-field>
                      <v-textarea 
                        name="description"
                        label="Description" 
                        type="text"
                        required
                        :rules="[v => !!v || 'Description is require']"
                        v-model="description"
                        >
                        ></v-textarea>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn :disabled="!valid" @click="createPost">Create Post</v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-content>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    title: '',
    description: ''
  }),
  methods: {
    createPost () {
      const post = {
        title: this.title,
        description: this.description
      }
      this.$store.dispatch('createPost', post)
      this.$router.push('/')
    }
  }
}
</script>


<style lang="scss" scoped>

</style>
