<template>
  <q-page class="flex flex-center">
    <!-- <img alt="Quasar logo" src="~assets/quasar-logo-full.svg"> -->
    <div
      class="q-pa-md q-gutter-md"
      style="width: 400px; max-width: 800px"
    >
      <q-input
        v-model="userInput"
        filled
        autogrow
      />
      <div class="row justify-around q-gutter-xs">
        <q-btn-toggle
        v-model="model"
        push
        spread
        toggle-color="primary"
        :options="[
          {label: 'Criptografar', value: 'encrypt'},
          {label: 'Descriptografar', value: 'decrypt'},
        ]"
      />
      </div>
      <div
        v-if="result"
        class="row justify-around"
      >
        {{result}}</div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Encrypt',
  data () {
    return {
      userInput: '',
      result: undefined,
      model: 'encrypt'
    }
  },
  methods: {
    ...mapActions({
      encrypt: 'encryptationStore/encrypt',
      decrypt: 'encryptationStore/decrypt'
    })
  },
  computed: {
    ...mapGetters({
      encrypted: 'encryptationStore/getEncryptedData',
      decrypted: 'encryptationStore/getNonEncryptedData'
    })

  },
  watch: {
    userInput () {
      this[this.model](this.userInput)
      this.result = this[`${this.model}ed`]
    }
  }

}
</script>
