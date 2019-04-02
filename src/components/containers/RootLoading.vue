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
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  &__inner {
    width: 90%;
    text-align: center;
  }
}
</style>
