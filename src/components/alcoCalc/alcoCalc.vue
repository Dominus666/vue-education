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
                    <v-toolbar-title>Calc</v-toolbar-title>
                  </v-toolbar>
                  <v-card-text>
                    <v-form >
                      <v-layout class="custom-input">
                        <v-flex xs5>
                          <v-select
                            :items="items"
                            v-model="male"
                            label="Пол"
                          ></v-select>
                        </v-flex>
                        <v-flex xs5>
                          <v-text-field
                            v-model="weight"
                            label="Вес"
                            type="number"
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs5>
                          <v-text-field
                            v-model="procent"
                            label="Процент"
                            type="number"
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs5>
                          <v-text-field
                            v-model="mAlc"
                            label="Количество"
                            type="number"
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-layout v-for="(alcohol, i) in alcohols" :key="i">
                        <v-flex>
                          Процент: {{alcohol.procent}}
                        </v-flex>
                        <v-spacer></v-spacer>
                        <v-flex>
                          Количество: {{alcohol.mAlc}}
                        </v-flex>
                        <v-btn @click="removeField(alcohol.alcId)">Удалить</v-btn>
                      </v-layout>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn
                      slot="activator"
                      dark
                      @click="calc"
                      :disabled="!mAlc || !procent || !male || !weight"
                      >
                        Рассчитать
                    </v-btn>
                    
                    <v-btn
                      dark
                      @click="addField"
                      :disabled="!mAlc || !procent"
                    >
                      Добавить алкоголь
                    </v-btn>
                    <v-spacer></v-spacer>
                    ПРОМИЛЬ: {{result}} 
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
  data () {
    return {
      items: ['мужчина', 'женщина'],
      male: null,
      weight: null,
      procent: null,
      mAlc: null,
      result: '',
      alcohols: []
    }      
  },
  methods: {
    calc () {
      let A = null
      this.alcohols.forEach((i) => {
        A += (i.mAlc * 1000) / 100 * i.procent
      })
      A += (this.mAlc * 1000) / 100 * this.procent
      let r = null
      if(this.male == 'мужчина') {
        r = 0.7
      }else {
        r = 0.6
      }
      this.result = A / (this.weight * r)
      this.result = Math.round(this.result * 100) / 100

      this.$store.dispatch('alcoUser', {
          alco: this.result,
          date: new Date(),
          uid: this.user.uid

        }
      )
    },
    addField () {
      const alcohol = {
        procent: this.procent,
        mAlc: this.mAlc,
        alcId: this.alcohols.length + 1 
      }
      this.alcohols.push(alcohol)
      this.mAlc = null
      this.procent = null
    },
    removeField (id) {
      const newalcohols = this.alcohols.filter((i) => {
        return i.alcId !== id
      })
      this.alcohols = newalcohols
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  }
}
</script>


<style lang="scss" scoped>
  .custom-input {
    justify-content: space-between;
    flex-wrap: wrap;
  }
</style>