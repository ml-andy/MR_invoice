<template lang="pug">
  .root-loading(v-if="isActive")
    .root-loading__inner
      Loading
</template>

<script>
import Loading from '@/components/units/Loading';
import { mapState } from 'vuex';

export default {
  name: 'Root_Loading',
  computed: {
    ...mapState({
      isActive: state => state.rootLoading.isActive,
    }),
  },
  components: {
    Loading,
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/variables";

.root-loading {
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  left: 0;
  top: 0;
  z-index: 98;

  &__inner {
    width: 90%;
    text-align: center;
    z-index: 1;
  }

  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: $gray-color-light;
    opacity: 0.8;
  }

}
</style>
