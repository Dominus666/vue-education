<template>
  <div class="small">
    <line-chart :chart-data="datacollection"></line-chart>
    <v-btn @click="fillData">Посторить график</v-btn>
    <!-- <div v-for="(user, i) in allUsers" :key="i">
      <span @click="catchUser(user)">{{user}}</span> 
    </div> -->
    <v-layout wrap align-center>
      <v-flex xs12 sm6 d-flex>
        <v-select
          v-model="currentUser"
          @change="getUser"
          :items="allUsers"
          label="Users"
        ></v-select>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import LineChart from '@/components/lineChart.js'

  export default {
    data () {
      return {
        datacollection: {},
        currentUser: null
      }
    },
    components: {
      LineChart
    },
    mounted () {
      this.$store.dispatch('fetchUsers')
      this.$store.dispatch('fetchAlcoUser')
    },
    methods: {
      fillData () {
        this.datacollection = {
          labels: [],
          datasets: [
            {
              label: 'Промиль',
              borderColor: '#FC2525',
              pointBackgroundColor: 'white',
              borderWidth: 2,
              pointBorderColor: 'white',
              backgroundColor: '#79020285',
              data: []
            },
            {
              label: 'Промиль1',
              borderColor: '#27ff02',
              pointBackgroundColor: 'white',
              borderWidth: 2,
              pointBorderColor: 'white',
              backgroundColor: '#27ff029c',
              data: []
            }
          ]
        }
        const promile = []
        const date = []
      
        this.alcoGraphics.forEach((key) => {
          promile.push(key.alcohol)
        });
        this.alcoGraphics.forEach((key) => {
          date.push(`${new Date(key.date).getDate()}.${new Date(key.date).getMonth() + 1}`)
        });
        this.datacollection.datasets[0].data = promile.reverse()
        this.datacollection.labels = date.reverse()
        
        const promile1 = []
        if(this.currentAlcoUser === null || this.currentAlcoUser === undefined) {
          promile1.push({})
        }else {
            Object.values(this.currentAlcoUser).forEach((key) => {
            promile1.push(key)
          })
        } 
        
        this.datacollection.datasets[1].data = promile1.reverse()
      },
      getUser () {
        this.$store.dispatch('currentAlcoUser', this.currentUser)
      }
    },
    computed: {
      alcoGraphics () {
        return this.$store.getters.alcoGraphics
      },
      allUsers () {
        return this.$store.getters.allUsers
      },
      currentAlcoUser () {
        return this.$store.getters.currentAlcoUser
      }
    }
  }
</script>

<style>
  .small {
    max-width: 600px;
    margin:  0 auto;
  }
</style>