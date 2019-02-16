<template>
  <v-dialog width="400px" v-model="dialog">
    <v-btn flat slot="activator">Edit</v-btn>
    <v-card>
      <v-container>
        <v-layout row>
          <v-flex xs12>
            <v-card-title>
                <h1>Edit Post</h1>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                name="title" 
                label="Title" 
                type="text"
                required
                :rules="[v => !!v || 'Title is require']"
                v-model="editTitle"
                >
              </v-text-field>
              <v-textarea 
                name="description"
                label="Description" 
                type="text"
                required
                :rules="[v => !!v || 'Description is require']"
                v-model="editDescription"
                >
              ></v-textarea>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn outline @click="onCancel">Cansel</v-btn>
              <v-btn @click="onSave">Save</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['post'],
    data () {
      return {
        dialog: false,
        editTitle: this.post.title,
        editDescription: this.post.description
      }
  },
  methods: {
    onCancel () {
      this.editTitle = this.post.title
      this.editDescription = this.post.description
      console.log(this.post.title)
      this.dialog = false
    },
    onSave () {
      if(this.editTitle !== '' && this.editDescription !== '') {
        this.$store.dispatch('updatePost', {
          title: this.editTitle,
          description: this.editDescription,
          id: this.post.id
        })
        this.dialog = false
      }
    }

  }
}
</script>
