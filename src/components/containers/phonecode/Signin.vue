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
          :hint="verifyCodeHints"
        )
          a.forgotpassword(
            href="javascript:;"
            @click="onForgotpassword"
          )
            i.icon.icon-help.icon-margin-right
            |忘記驗證碼
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
import FormGroupInput from '@/components/units/FormGroupInput';
import NoticeModal from '@/components/containers/phonecode/NoticeModal';
import { wordValidate } from '@/helpers/unit';
import { PASSWORD_ERROR } from '@/constant/apiErrorTypes';

export default {
  name: 'phonecodeSignin',
  data() {
    return {
      isNotice: false,
      verifyCode: '',
    };
  },
  computed: {
    ...mapState({
      phone: state => state.app.basicInfo.hiddenPhone,
      cardNo: state => state.phonecode.cardNo,
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
  },
  created() {
    this.initApiError();
  },
  methods: {
    ...mapActions('phonecode', ['getCarrierCheck', 'modifyCardno']),
    ...mapMutations('phonecode', ['initApiError', 'fetchState']),
    wordValidate,
    onForgotpassword() {
      this.$router.push(routePath.PHONECODE_PWD);
    },
    onEditNoticeModal(visible) {
      this.isNotice = visible;
    },
    async onSubmit() {
      await this.modifyCardno();
      if (this.errorCode !== '') return;

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

