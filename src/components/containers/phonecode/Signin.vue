<template lang="pug">
  section.phonecode.stepbarSpace
    NoticeModal(
      :isNotice="isNotice"
      :onClose="()=> { onEditNoticeModal(false) }"
    )
    .section__header
      h3.text-primary.text-center 登入手機條碼
    .section__main.footerSpace
      form
        FormGroupInput(
          label="手機號碼"
          type="tel"
          v-model="phone"
          :disabled="true"
        )
        FormGroupInput(
          label="手機條碼驗證碼"
          type="text"
          v-model="verifyCode"
          placeholder="必填"
          :onInput="wordValidate"
          :onFocus="onFocusInput"
          :onBlur="onBlurInput"
          :hint="verifyCodeHints"
        )
          a.forgotpassword(
            href="javascript:;"
            @click="onForgotpassword"
          )
            i.icon.icon-help.icon-margin-right
            |忘記驗證碼
    .section__footer.columns(:class="footerClass")
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
import FormGroupInput from '@/components/units/FormGroupInput';
import NoticeModal from '@/components/containers/phonecode/NoticeModal';
import { wordValidate, sendMixpanel } from '@/helpers/unit';
import { PASSWORD_ERROR } from '@/constant/apiErrorTypes';

export default {
  name: 'phonecodeSignin',
  data() {
    return {
      isNotice: false,
      verifyCode: '',
      isFocus: false,
    };
  },
  computed: {
    ...mapState({
      os: state => state.app.os,
      windowOriginHeight: state => state.app.windowOriginHeight,
      windowHeight: state => state.app.windowHeight,
      phone: state => state.app.basicInfo.hiddenPhone,
      cardNo: state => state.phonecode.cardNo,
      isBound: state => state.phonecode.isBound,
      isIncluded: state => state.phonecode.included,
      errorCode: state => state.phonecode.apiError.errorCode,
      message: state => state.phonecode.apiError.message,
    }),
    verifyCodeHints() {
      const errors = [PASSWORD_ERROR.errorCode];
      const isApiError = errors.indexOf(this.errorCode) !== -1;
      return isApiError ? PASSWORD_ERROR.message : '';
    },
    isNext() {
      return this.verifyCode !== '' && this.verifyCodeHints === '';
    },
    footerClass() {
      const hidden = this.isFocus && this.windowHeight !== this.windowOriginHeight;
      return {
        hidden,
      };
    },
  },
  created() {
    this.initApiError();
  },
  mounted() {
    sendMixpanel('eReceipt_login_view');
  },
  methods: {
    ...mapActions('phonecode', ['getCarrierCheck', 'putCardno', 'modifyCardno']),
    ...mapMutations('phonecode', ['initApiError', 'fetchState']),
    wordValidate,
    onForgotpassword() {
      sendMixpanel('eReceipt_forgot_pwd_button');
      this.$router.push(routePath.PHONECODE_PWD);
    },
    onEditNoticeModal(visible) {
      this.isNotice = visible;
    },
    onFocusInput() {
      if (this.os.isAndroid) {
        this.isFocus = true;
      }
    },
    onBlurInput() {
      window.scrollTo(0, 0);
      this.isFocus = false;
    },
    async onSubmit() {
      if (this.isBound) {
        await this.putCardno();
      } else {
        await this.modifyCardno();
      }

      if (this.errorCode === '') {
        sendMixpanel('eReceipt_login_now_button', {
          tag: 'success',
        });
      } else {
        sendMixpanel('eReceipt_login_now_button', {
          tag: this.message,
        });
        return;
      }

      await this.getCarrierCheck();
      if (this.isIncluded) {
        this.$router.push(routePath.INVOICE);
      } else if (this.isIncluded === false) {
        this.$router.push(routePath.PHONECODE_BIND);
      }
    },
  },
  components: {
    NoticeModal,
    FormGroupInput,
  },
  watch: {
    verifyCode(value) {
      this.fetchState({
        key: 'verifyCode',
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

