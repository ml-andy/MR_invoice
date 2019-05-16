<template lang="pug">
  section.phonecode
    .section__header.footerSpace
      p.success.text-center
        i.icon.icon-success
      h3.text-primary.text-center 更新驗證碼成功！
    .section__footer.columns
      button.btn.btn-submit.column.col-12(
        @click="onSubmit"
      ) {{ submitText }}
</template>

<script>
import * as routePath from '@/constant/routePath';
import { mapState } from 'vuex';
import { sendMixpanel } from '@/helpers/unit';

export default {
  name: 'phonecodeUpdateSuccess',
  computed: {
    ...mapState({
      isIncluded: state => state.phonecode.included,
    }),
    submitText() {
      return this.isIncluded ? '查詢發票明細' : '前往綁定信用卡';
    },
  },
  mounted() {
    sendMixpanel('eReceipt_update_pwd_success_view');
  },
  methods: {
    onSubmit() {
      sendMixpanel('eReceipt_update_pwd_success_gotoList');
      if (this.isIncluded) {
        this.$router.push(routePath.INVOICE);
      } else {
        this.$router.push(routePath.PHONECODE_BIND);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../style/variables";

.phonecode {
  padding-left: $space;
  padding-right: $space;

  .success {
    font-size: convertUnit(110);
    line-height: convertUnit(110);
  }
}
</style>
