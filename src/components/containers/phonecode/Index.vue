<template lang="pug">
  section.phonecode.stepbarSpace
    .section__header
      h3.text-primary.text-center 申請手機條碼
    .section__main
      button.phonecode__btn(@click="onNextStep(true)")
        .columns
          .column.col-3.btn-icon
            .icon.icon-yes
          .column.col-7 我已有手機條碼
          .column.col-2
            i.icon.icon-arrow
      button.phonecode__btn(@click="onNextStep(false)")
        .columns
          .column.col-3.btn-icon
            .icon.icon-no
          .column.col-7 我沒有手機條碼
          .column.col-2
            i.icon.icon-arrow
      span.text-sm 發票手機條碼範例：/YLC＊CE7
</template>

<script>
import * as routePath from '@/constant/routePath';
import { sendMixpanel } from '@/helpers/unit';

export default {
  name: 'phonecodeIndex',
  mounted() {
    sendMixpanel('eReceipt_loginType_view');
  },
  methods: {
    onNextStep(hasPhonecode) {
      const path = hasPhonecode
        ? routePath.PHONECODE_SIGNIN
        : routePath.PHONECODE_SIGNUP;

      if (hasPhonecode) sendMixpanel('eReceipt_goto_login_button');
      else sendMixpanel('eReceipt_account_apply_button');

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

