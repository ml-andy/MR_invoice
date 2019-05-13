<template lang="pug">
  section.phonecode
    NoticeModal(
      :isNotice="isNotice"
      :onClose="()=> { onEditNoticeModal(false) }"
    )
    Modals(
      :active="isSuccess"
      :isCanClose="false"
    )
      template(slot="body") 請至您的Email收取新驗證碼
      template(slot="footer")
        button(
          class="btn btn-submit btn-block btn-sm"
          @click="onSuccessModal"
        ) 確定
    .section__header
      h3.text-primary.text-center 重新申請驗證碼
    .section__main.footerSpace
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
      ) 確認
</template>

<script>
import * as routePath from '@/constant/routePath';
import { mapState, mapActions, mapMutations } from 'vuex';
import Modals from '@/components/units/Modals';
import FormGroupInput from '@/components/units/FormGroupInput';
import NoticeModal from '@/components/containers/phonecode/NoticeModal';
import { emailValidate, wordValidate, sendMixpanel } from '@/helpers/unit';

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
      phone: state => state.app.basicInfo.hiddenPhone,
      phoneForApi: state => state.app.basicInfo.phone,
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
  mounted() {
    sendMixpanel('eReceipt_reset_pwd_view');
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
      await this.forgetVerifyCode(this.phoneForApi);
      if (this.errorCode === '') {
        sendMixpanel('eReceipt_reset_pwd_now', {
          tag: 'success',
        });
        this.isSuccess = true;
        sendMixpanel('eReceipt_reset_pwd_checkemail');
      } else {
        sendMixpanel('eReceipt_reset_pwd_now', {
          tag: this.message,
        });
      }
    },
    onSuccessModal() {
      sendMixpanel('eReceipt_reset_pwd_checkemail_button');
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

