<template lang="pug">
  section.phonecode
    .section__header.footerSpace
      p.success.text-center
        i.icon.icon-success
      h3.text-primary.text-center 更新驗證碼成功！
    .section__footer.columns
      button.btn.btn-submit.column.col-12(
        @click="onSubmit"
      ) 查詢發票明細
</template>

<script>
import * as routePath from '@/constant/routePath';
import { sendMixpanel } from '@/helpers/unit';

export default {
  name: 'phonecodeUpdateSuccess',
  mounted() {
    sendMixpanel('eReceipt_update_pwd_success_view');
  },
  methods: {
    onSubmit() {
      sendMixpanel('eReceipt_update_pwd_success_gotoList');
      this.$router.push(routePath.INVOICE);
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
