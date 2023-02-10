<template>
  <div class="flex table__line" :class="backgroundColors" :key="user.id">
    <div class="table__ceil" :style="leftPadding">{{ user.name }}</div>

    <div class="table__ceil">{{ user.phoneNumber }}</div>
  </div>
</template>

<script>

export default {
  name: 'User',
  props: ['user'],
  data () {
    return {
      leftPadding: '10px',
    }
  },
  computed: {
    backgroundColors () {
      if (this.user.enclosure === 0) {
        return 'bg-f0f0f0'
      } else {
        return 'bg-fafafa'
      }
    },
  },
  mounted () {
    this.leftPadding = 'padding-left: ' + (10 + this.user.enclosure * 16 + 'px')
  },
}
</script>
