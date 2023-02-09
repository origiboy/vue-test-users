<template>
  <div class="container">
    <div class="flex header">
      <ButtonAdd  @handlerClick="popupOpen = true" />

      <Popup v-if="popupOpen" @handlerClick="popupOpen = false" />
    </div>

    <Users />

  </div>
</template>

<script>
import './style/app.css'
import './style/button.css'
import './style/popup.css'

import ButtonAdd from './components/ButtonAdd.vue'
import Users from './components/Users.vue'
import Popup from './components/Popup.vue'

export default {
  name: 'App',
  components: {
    ButtonAdd,
    Users,
    Popup
  },
  data () {
    return {
      popupOpen: false
    }
  },
  beforeMount () {
    this.$root.$data.getDataFromLocalStorage()
  }
}
</script>
