<template lang="pug">
  section.phonecode
    NoticeModal(
      :isNotice="isNotice"
      :onClose="()=> { onEditNoticeModal(false) }"
    )
    .section__header
      h3.text-primary.text-center 更新驗證碼
    .section__main
      form
        .form-group
          .form-label(for="phone") 手機號碼
          input#phone.form-input(
            type="tel"
            value="09XXXXXXXX"
            disabled
          )
        .form-group
          .form-label(for="password")
            .columns
              .column.col-6
                |手機條碼驗證碼
              .column.col-6.text-sm.text-right
                a.forgotpassword(
                  href="javascript:;"
                  @click="onForgotpassword"
                )
                  i.icon.icon-help.icon-margin-right
                  |忘記驗證碼
          input#password.form-input(
            type="text"
            placeholder="必填"
          )
    .section__footer.columns
      a.noticeBtn(
        href="javascript:;"
        @click="onEditNoticeModal(true)"
      )
        i.icon.icon-info.icon-margin-right
        |注意事項
      button.btn.btn-submit.column.col-12(
        :disabled="!isNext"
        @click="onSubmit"
      ) 送出
</template>

<script>
import * as routePath from '@/constant/routePath';
import NoticeModal from '@/components/containers/phonecode/NoticeModal';

export default {
  name: 'phonecodeUpdate',
  data() {
    return {
      isNotice: false,
      isNext: true,
    };
  },
  methods: {
    onForgotpassword() {
      this.$router.push(routePath.PHONECODE_PWD);
    },
    onEditNoticeModal(visible) {
      this.isNotice = visible;
    },
    onSubmit() {
      this.$router.push(routePath.PHONECODE_UPDATESUCCESS);
    },
  },
  components: {
    NoticeModal,
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
