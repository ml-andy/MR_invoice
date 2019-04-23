<template lang="pug">
  section.phonecode
    NoticeModal(
      :isNotice="isNotice"
      :onClose="()=> { onEditNoticeModal(false) }"
    )
    Modals(
      :active="isSuccess"
      :isCanClose="false"
      contentTextAlign="left"
    )
      template(slot="header") 重新申請驗證碼
      template(slot="body")
        |已寄送信件至電子信箱，請依信件說明重設驗證碼
      template(slot="footer")
        button(
          class="btn btn-submit btn-block btn-sm"
          @click="onSuccessModal"
        ) 確定
    .section__header
      h3.text-primary.text-center 重新申請驗證碼
    .section__main
      form
        FormGroupInput(
          label="手機號碼"
          type="tel"
          v-model="phone"
          :disabled="true"
        )
        FormGroupInput(
          label="E-mail"
          type="text"
          v-model="email"
          placeholder="必填"
          :onInput="wordValidate"
          :onBlur="onEmailBlur"
          :hint="emailHints"
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
import { mapState, mapActions, mapMutations } from 'vuex';
import Modals from '@/components/units/Modals';
import FormGroupInput from '@/components/units/FormGroupInput';
import NoticeModal from '@/components/containers/phonecode/NoticeModal';
import { emailValidate, wordValidate } from '@/helpers/unit';

export default {
  name: 'phonecodeSignin',
  data() {
    return {
      isNotice: false,
      isSuccess: false,
      email: '',
      emailHint: '',
    };
  },
  computed: {
    ...mapState({
      phone: state => state.app.basicInfo.phone,
      errorCode: state => state.phonecode.apiError.errorCode,
      message: state => state.phonecode.apiError.message,
      cardNo: state => state.phonecode.cardNo,
    }),
    emailHints() {
      const errors = ['ES_F_906_ERROR'];
      const isApiError = errors.indexOf(this.errorCode) !== -1;
      return isApiError ? this.message : this.emailHint;
    },
    isNext() {
      return this.email !== '' && this.emailHints === '';
    },
  },
  created() {
    this.initApiError();
  },
  methods: {
    ...mapActions('phonecode', ['forgetVerifyCode']),
    ...mapMutations('phonecode', ['initApiError', 'fetchState']),
    wordValidate,
    onEmailBlur(value) {
      this.emailHint = emailValidate('E-mail格式錯誤', value);
    },
    onEditNoticeModal(visible) {
      this.isNotice = visible;
    },
    async onSubmit() {
      await this.forgetVerifyCode(this.phone);
      if (this.errorCode !== '') return;
      this.isSuccess = true;
    },
    onSuccessModal() {
      this.$router.push(routePath.PHONECODE_SIGNIN);
    },
  },
  components: {
    FormGroupInput,
    NoticeModal,
    Modals,
  },
  watch: {
    email(value) {
      this.fetchState({
        key: 'email',
        value,
      });
    },
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

