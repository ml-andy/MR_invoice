<template lang="pug">
  section.invoice invoice list
</template>

<script>
import * as routePath from '@/constant/routePath';

export default {
  name: 'phonecodeIndex',
  methods: {
    onNextStep(hasPhonecode) {
      const path = hasPhonecode
        ? routePath.PHONECODE_SIGNIN
        : routePath.PHONECODE_SIGNUP;
      this.$router.push(path);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../style/variables";

.phonecode {
  padding-left: $space;
  padding-right: $space;

  &__btn {
    width: 100%;
    background-color: $light-color;
    border: 1px solid rgba(217,217,217,1);
    padding: #{convertUnit(15)} #{convertUnit(20)};
    margin-bottom: convertUnit(15);
    font-size: $fontSize3;

    .columns {
      align-items: center;
    }

    .btn-icon {
      font-size: convertUnit(60);
    }
  }

  .text-sm {
    color: rgb(102,102,102);
  }
}
</style>

