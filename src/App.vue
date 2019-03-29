<template lang="pug">
  #app
    RootLoading
    AgreeModal(v-if="isInit")
    ErrorModal
    .wraper
      main.container
        .content__inner(v-if="!isInit")
          AppInit
        .content__inner(v-else)
          router-view
</template>

<script>
import ErrorModal from '@/components/containers/ErrorModal';
import AgreeModal from '@/components/containers/AgreeModal';
import AppInit from '@/components/containers/AppInit';
import RootLoading from '@/components/containers/RootLoading';
import { mapState } from 'vuex';

export default {
  name: 'App',
  computed: mapState({
    isInit: state => state.app.isInit,
  }),
  components: {
    AppInit,
    ErrorModal,
    AgreeModal,
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
