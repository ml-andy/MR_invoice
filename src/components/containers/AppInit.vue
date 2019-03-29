<template lang="pug">
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'App_init',
  computed: {
    ...mapState({
      thirdPartyType: state => state.app.thirdParty.type,
      thirdPartyName: state => state.app.thirdParty.name,
    }),
  },
  head: {
    title() {
      return {
        inner: this.thirdPartyName || '',
        separator: ' ',
        complement: '',
      };
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapActions('app', ['appInit', 'getThirdParty']),
    async init() {
      await this.getThirdParty();
      this.$emit('updateHead');

      if (this.thirdPartyType) {
        this.appInit();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.hide {
  display: none;
}
</style>
