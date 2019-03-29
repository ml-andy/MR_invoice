<template lang="pug">
  .root-loading(v-if="true")
    .root-loading__inner
      img.root-loading__logoImg(
        v-if="thirdPartyLogo"
        :src="thirdPartyLogo"
      )
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
      thirdPartyLogo: state => state.app.thirdParty.image,
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
  &__logoImg {
    width: convertUnit(140);
  }
}
</style>
