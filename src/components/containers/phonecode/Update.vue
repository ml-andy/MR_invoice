<template lang="pug">
  section.phonecode
    NoticeModal(
      :isNotice="isNotice"
      :onClose="()=> { onEditNoticeModal(false) }"
    )
    .section__header
      h3.text-primary.text-center 更新驗證碼
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
  name: 'phonecodeUpdate',
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
    sendMixpanel('eReceipt_update_pwd_view');
  },
  methods: {
    ...mapActions('phonecode', ['putCardno', 'getCarrierCheck']),
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
      if (this.os.isIos) {
        window.scrollTo(0, 0);
      }
      this.isFocus = false;
    },
    async onSubmit() {
      await this.putCardno();
      if (this.errorCode === '') {
        sendMixpanel('eReceipt_update_pwd_now', {
          tag: 'success',
        });
        await this.getCarrierCheck();
        if (this.errorCode === '') {
          this.$router.push(routePath.PHONECODE_UPDATESUCCESS);
        } else {
          sendMixpanel('eReceipt_update_pwd_now', { tag: this.message });
        }
      } else {
        sendMixpanel('eReceipt_update_pwd_now', { tag: this.message });
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

