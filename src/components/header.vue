<template>
  <div>
    <v-navigation-drawer 
      app
      temporary
      v-model="sideNav">
          <v-list>
            <v-list-tile
              flat v-for="(link, i) in links" 
              :key="i" 
              :to="link.url"
            >
              <v-list-tile-action>
                <v-icon>{{ link.icon }}</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title v-text="link.title"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              v-if="isUserLoggedIn"
              @click="onLogout"
            >
              <v-list-tile-action>
                <v-icon>exit_to_app</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title v-text="'LogOut'"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
    </v-navigation-drawer>
    <v-toolbar>
      <v-toolbar-side-icon @click="sideNav = !sideNav" class="hidden-md-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>Blog</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat v-for="(link, i) in links" :key="i" :to="link.url"><v-icon left>{{ link.icon }}</v-icon>{{ link.title }}</v-btn>
        <v-btn flat @click="onLogout" v-if="isUserLoggedIn"><v-icon left>exit_to_app</v-icon>LogOut</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
   </v-content>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        sideNav: false
      }
    },
    computed: {
      isUserLoggedIn () {
        return this.$store.getters.isUserLoggedIn
      },
      user () {
        return this.$store.getters.user
      },
      links () {
        if(this.isUserLoggedIn) {
          if(this.user.admin) {
            return [
              {title: 'Home', icon: 'home', url: '/'},
              {title: 'New Post', icon: 'add', url: '/newpost'},
              {title: 'List', icon: 'list', url: '/list'},
              {title: 'calculator', icon: 'weekend', url: '/calc'},
              {title: 'favorites', icon: 'favorite', url: '/favorites'}
            ] 
          }else {
            return [
              {title: 'Home', icon: 'home', url: '/'},
              {title: 'calculator', icon: 'weekend', url: '/calc'},
              {title: 'favorites', icon: 'favorite', url: '/favorites'}
            ]
          } 
        }else {
          return [
            {title: 'Home', icon: 'home', url: '/'},
            {title: 'Login', icon: 'account_box', url: '/login'},
            {title: 'Register', icon: 'face', url: '/register'}
          ]
        }
        
      }
    },
    methods: {
      onLogout () {
        this.$store.dispatch('logoutUser')
        this.$router.push('/')
      }
    },
    props: {
      source: String
    }
  }
</script>
