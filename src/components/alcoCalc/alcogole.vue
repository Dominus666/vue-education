<template>
  <v-layout class="custom-input">
    <v-flex xs5>
      <v-text-field
      v-model="procent"
      label="Procent"
      ></v-text-field>
    </v-flex>
    <v-flex xs5>
      <v-text-field
      v-model="mAlc"
      label="weight"
    ></v-text-field>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      procent: null,
      mAlc: null
    }
  }
}
</script>
