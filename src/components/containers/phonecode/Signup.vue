<template lang="pug">
  section.phonecode.stepbarSpace
    Modals(
      :active="isNotice"
      :isCanClose="false"
      contentTextAlign="left"
      @close="onEditNoticeModal(false)"
    )
      template(slot="header") 發票注意事項
      template(slot="body")
        |1.申請手機條碼之手機號碼，必須與註冊國泰優惠APP會員之手機號碼相同。
        br
        |2.如需修改您的Email請至財政部電子發票整合服務平台www.einvoice.nat.gov.tw
      template(slot="footer")
        button(
          class="btn btn-submit btn-block btn-sm"
          @click="onEditNoticeModal(false)"
        ) 確定
    .section__header
      h3.text-primary.text-center 申請手機條碼
    .section__main
      form
        .form-group
          .form-label(for="phone") 手機號碼
          input#phone.form-input(
            type="text"
            value="09XXXXXXXX"
            disabled
          )
        .form-group
          .form-label(for="email") E-mail
          input#email.form-input(
            type="text"
            placeholder="必填"
          )
    .section__footer.columns
      a.noticeBtn(
        href="javascript:;"
        @click="onEditNoticeModal(true)"
      )
        i.icon.icon-info
        |注意事項
      button.btn.btn-submit.column.col-12(
        :disabled="!isNext"
        @click="onSubmit"
      ) 確認
</template>

<script>
import * as routePath from '@/constant/routePath';
import Modals from '@/components/units/Modals';

export default {
  name: 'phonecodeIndex',
  data() {
    return {
      isNotice: false,
      isNext: true,
    };
  },
  methods: {
    onEditNoticeModal(visible) {
      this.isNotice = visible;
    },
    onSubmit() {
      this.$router.push(routePath.PHONECODE_CONFIRM);
    },
  },
  components: {
    Modals,
  },
};
</script>

<style lang="scss" scoped>
@import "../../../style/variables";

.phonecode {
  padding-left: $space;
  padding-right: $space;

  .noticeBtn {
    margin-bottom: convertUnit(20);
  }
}
</style>

