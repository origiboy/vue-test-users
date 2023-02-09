<template>
  <div class="flex table">
    <div class="flex table__header">

      <h3 class="flex table__ceil" @click="filterClick">Имя
        <button class="button button-arrow" :class="buttonRotate">
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path fill="currentColor" d="M6.7 14.7q-.275-.275-.275-.7q0-.425.275-.7l4.6-4.6q.15-.15.325-.213q.175-.062.375-.062t.388.075q.187.075.312.2l4.6 4.6q.275.275.275.7q0 .425-.275.7q-.275.275-.7.275q-.425 0-.7-.275L12 10.8l-3.9 3.9q-.275.275-.7.275q-.425 0-.7-.275Z"/></svg>
        </button>
      </h3>

      <h3 class="flex table__ceil">Телефон</h3>
    </div>

    <User v-for="user in this.$root.$data.state.users"
    :user="user"
    :key="user.id" />

  </div>
</template>

<script>
import User from './User.vue'

export default {
  name: 'Users',
  components: {
    User
  },
  data () {
    return {
      activeFilterName: this.$root.$data.state.settings.type
    }
  },
  methods: {
    filterClick () {
      if (this.activeFilterName === 'asc') {
        this.activeFilterName = 'desc'
      } else {
        this.activeFilterName = 'asc'
      }
      this.$root.$data.setFilters('name', this.activeFilterName)
    }
  },
  computed: {
    buttonRotate () {
      return {
        'button-arrow-rotate': this.activeFilterName === 'desc'
      }
    }
  }
}
</script>
