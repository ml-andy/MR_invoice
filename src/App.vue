<template lang="pug">
  #app
    RootLoading
    ErrorModal
    .wraper
      main.container
        router-view(v-if="isInit")

</template>

<script>
import * as routePath from '@/constant/routePath';
import ErrorModal from '@/components/containers/ErrorModal';
import RootLoading from '@/components/containers/RootLoading';
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  name: 'App',
  computed: mapState({
    isInit: state => state.app.isInit,
    isBound: state => state.phonecode.isBound,
    isIncluded: state => state.phonecode.included,
  }),
  mounted() {
    this.init();
  },
  methods: {
    ...mapActions('app', ['appInit']),
    ...mapActions('phonecode', ['getCarrierCheck']),
    ...mapMutations('app', ['initSetup']),
    async init() {
      await this.appInit();
      if (this.isBound) {
        await this.getCarrierCheck();
        if (this.isIncluded) {
          this.$router.push(routePath.INVOICE);
        } else if (this.isIncluded === false) {
          this.$router.push(routePath.PHONECODE_BIND);
        }
      } else {
        this.$router.push(`${routePath.INTRODUCTION}/1`);
      }

      this.initSetup();
    },
  },
  components: {
    ErrorModal,
    RootLoading,
  },
};
</script>

<style lang="scss" scoped>
#app {
  box-sizing: border-box;
}

.wraper {
  width: 100%;
  box-sizing: border-box;
}

.container {
  padding-left: 0;
  padding-right: 0;
}
</style>
