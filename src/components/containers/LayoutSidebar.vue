<template lang="pug">
  ul.nav
    li.nav-item
      a(href="/#/layout") 共用樣式
    li.nav-item
      a(href="/#/layout/buttons") 按鈕
    li.nav-item
      a(href="/#/layout/modals") Modals 組件
    li.nav-item
      a(href="/#/layout/loading") Loading 組件
</template>

<script>

export default {
  name: 'Layout_Sidebar',
  data() {
    return {};
  },
  computed: {},
  methods: {},
  components: {},
};
</script>

<style lang="scss" scoped>
.nav {
  padding: convertUnit(7) convertUnit(21);
}
</style>
