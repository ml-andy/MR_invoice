<template lang="pug">
  section.phonecode.stepbarSpace
    NoticeModal(
      :isNotice="isNotice"
      :onClose="()=> { onEditNoticeModal(false) }"
    )
    .section__header
      h3.text-primary.text-center 申請手機條碼
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
import FormGroupInput from '@/components/units/FormGroupInput';
import NoticeModal from '@/components/containers/phonecode/NoticeModal';
import { emailValidate, wordValidate, sendMixpanel } from '@/helpers/unit';

export default {
  name: 'phonecodeSignup',
  data() {
    return {
      isNotice: false,
      email: '',
      emailHint: '',
    };
  },
  computed: {
    ...mapState({
      phone: state => state.app.basicInfo.hiddenPhone,
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
    sendMixpanel('eReceipt_apply_view');
  },
  methods: {
    ...mapActions('phonecode', ['signup']),
    ...mapMutations('phonecode', ['initApiError', 'fetchState']),
    wordValidate,
    onEmailBlur(value) {
      this.emailHint = emailValidate('E-mail格式錯誤', value);
    },
    onEditNoticeModal(visible) {
      this.isNotice = visible;

      if (visible) sendMixpanel('eReceipt_apply_notification');
    },
    async onSubmit() {
      await this.signup();

      if (this.errorCode === '') {
        sendMixpanel('eReceipt_apply_now', {
          tag: 'success',
        });
        this.$router.push(routePath.PHONECODE_CONFIRM);
      } else {
        sendMixpanel('eReceipt_apply_now', {
          tag: this.message,
        });
      }
    },
  },
  components: {
    FormGroupInput,
    NoticeModal,
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

