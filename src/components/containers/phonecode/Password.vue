<template lang="pug">
  section.phonecode
    NoticeModal(
      :isNotice="isNotice"
      :onClose="()=> { onEditNoticeModal(false) }"
    )
    .section__header
      h3.text-primary.text-center 重新申請驗證碼
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
          .form-label(for="email") E-mail
          input#email.form-input(
            type="text"
            placeholder="dsW2@gmail.com"
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
  name: 'phonecodeSignin',
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
      this.$router.push(routePath.PHONECODE_SIGNIN);
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

