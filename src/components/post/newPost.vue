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
                    <label>
                      <v-btn @click="upload">
                        Upload
                        <v-icon>cloud_upload</v-icon>
                      </v-btn>
                      <input
                        ref="fileInput" 
                        type="file" 
                        style="display: none;" 
                        accept="image/*"
                        @change="onChangeFile"
                       >
                    </label>
                    <v-spacer></v-spacer>
                    <v-btn :disabled="!valid || loading || !img" :loading="loading" @click="createPost">Create Post</v-btn>
                  </v-card-actions>
                </v-card>
                  <v-layout>
                    <v-flex>
                      <img :src="imgSrc" height="200px" v-if="imgSrc">
                  </v-flex>
                </v-layout>
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
    description: '',
    img: null,
    imgSrc: ""
  }),
  methods: {
    createPost () {
      const post = {
        title: this.title,
        description: this.description,
        img: this.img
      }
      this.$store.dispatch('createPost', post)
      .then(() => {
        this.$router.push('/')
      })
      .catch(() => {})
    },
    upload () {
      this.$refs.fileInput.click()
    },
    onChangeFile (e) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = () => {
        this.imgSrc = reader.result
      }
      reader.readAsDataURL(file)
      this.img = file
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>


<style lang="scss" scoped>

</style>
