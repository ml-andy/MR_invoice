<template lang="pug">
  section.phonecode.stepbarSpace
    Modals(
      :active="isSuccess"
      :isCanClose="false"
      contentTextAlign="left"
    )
      template(slot="header") 提醒您
      template(slot="body")
        |請至Email信箱，收取財政部發送的「電子信箱驗證信」，如未完成驗證將無法使用「忘記驗證碼」！
      template(slot="footer")
        button(
          class="btn btn-submit btn-block btn-sm"
          @click="onSuccessModal"
        ) 知道了
    .section__header
      h3.text-primary.text-center 請輸入財政部發送的簡訊驗證碼
    .section__main.footerSpace
      form
        FormGroupInput(
          label="驗證碼"
          type="text"
          v-model="verifyCode"
          placeholder="必填"
          :onInput="wordValidate"
          :onFocus="onFocusInput"
          :onBlur="onBlurInput"
          :hint="verifyCodeHints"
        )
      p.text-sm
        |請輸入財政部發送之簡訊驗證碼(4碼)。若您未收到簡訊驗證碼，請聯繫財政部電子發票平台，0800-521-988。
    .section__footer.columns(:class="footerClass")
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
import { wordValidate, sendMixpanel } from '@/helpers/unit';
import { PASSWORD_ERROR } from '@/constant/apiErrorTypes';

export default {
  name: 'phonecodeComfirm',
  data() {
    return {
      verifyCode: '',
      isSuccess: false,
      footerClass: {
        hidden: false,
      },
    };
  },
  computed: {
    ...mapState({
      os: state => state.app.os,
      cardNo: state => state.phonecode.cardNo,
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
  },
  created() {
    this.initApiError();
  },
  mounted() {
    sendMixpanel('eReceipt_apply_pwd_view');
  },
  methods: {
    ...mapActions('phonecode', ['modifyCardno']),
    ...mapMutations('phonecode', ['initApiError', 'fetchState']),
    wordValidate,
    async onSubmit() {
      await this.modifyCardno();

      if (this.errorCode === '') {
        sendMixpanel('eReceipt_apply_pwd_confirm', {
          tag: 'success',
        });
        this.isSuccess = true;
        sendMixpanel('eReceipt_apply_success_view');
      } else {
        sendMixpanel('eReceipt_apply_pwd_confirm', {
          tag: this.message,
        });
      }
    },
    onSuccessModal() {
      sendMixpanel('eReceipt_apply_success_gotoCardSetup');
      this.$router.push(routePath.PHONECODE_BIND);
    },
    onFocusInput() {
      if (this.os.isAndroid) {
        this.footerClass.hidden = true;
      }
    },
    onBlurInput() {
      window.scrollTo(0, 0);
      this.footerClass.hidden = false;
    },
  },
  components: {
    Modals,
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
}
</style>

