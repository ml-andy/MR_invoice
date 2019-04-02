<template lang="pug">
  #app
    RootLoading
    ErrorModal
    .wraper
      main.container
        AppInit(v-if="!isInit")
        router-view(v-else)

</template>

<script>
import ErrorModal from '@/components/containers/ErrorModal';
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
