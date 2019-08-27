<template lang="pug">
  section.phonecode.stepbarSpace
    .section__header
      h3.text-primary.text-center 綁定發票載具
    .section__main
      form
        FormGroupInput(
          label="載具類別"
          type="text"
          value="信用卡/金融卡"
          :disabled="true"
        )
        FormGroupInput(
          label="卡片號碼"
          type="text"
          v-model="cardNumber"
          :disabled="true"
        )
        .columns
          .column.col-6
            FormGroupInput(
              label="身分證末四碼"
              type="text"
              v-model="userId"
              :disabled="true"
            )
          .column.col-6
            FormGroupInput(
              label="生日末四碼"
              type="text"
              v-model="birth"
              :disabled="true"
            )
        FormGroupInput#cardName(
          label="載具名稱"
          type="text"
          v-model="cardName"
          :onInput="onCardName"
          :onBlur="() => { onBlurInput('cardName'); }"
          :hint="cardNameHints"
        )
          span.text.text-primary 字數限制20字內
        .columns
          .column.col-6
            FormGroupInput#imagecode(
              label="圖形驗證碼"
              type="text"
              placeholder="必填"
              v-model="imagecode"
              :hint="imageCodeHints"
              :onBlur="() => { onBlurInput('imagecode'); }"
            )
          .column.col-6.imgageCode
            .columns
              .column.col-8.imgageCode__photo.text-center
                .loading(v-if="isLoadVerifyCodeImage")
                img.code(
                  v-else-if="verifyCodeImage && !isLoadVerifyCodeImage"
                  :src="`data:image/jpeg;base64,${verifyCodeImage}`"
                )
                span.text.text-dark(v-else) 請重新載入
              .column.col-4.text-center
                a.refreshBtn(
                  href="javascript:;"
                  @click="onRefresh"
                )
                  i.icon.icon-refresh
    .footer.columns
      button.btn.btn-submit.column.col-12(
        :disabled="!isNext"
        @click="onSubmit"
      ) 確認
</template>

<script>
import * as routePath from '@/constant/routePath';
import { mapState, mapActions, mapMutations } from 'vuex';
import FormGroupInput from '@/components/units/FormGroupInput';
import {
  ES_CARRIER_NAME_OVER_LIMIT_ERROR,
  IMAGE_VERIFY_ERROR,
} from '@/constant/apiErrorTypes';
import { textLen, sendMixpanel } from '@/helpers/unit';

export default {
  name: 'phonecodeBind',
  data() {
    return {
      cardName: '',
      imagecode: '',
      isLoadVerifyCodeImage: false,
    };
  },
  computed: {
    ...mapState({
      os: state => state.app.os,
      cardNumber: state => state.app.basicInfo.cardNumber,
      userId: state => state.app.basicInfo.id,
      birth: state => state.app.basicInfo.birth,
      carrierName: state => state.phonecode.carrierName,
      verifyCodeImage: state => state.phonecode.verifyCodeImage,
      errorCode: state => state.phonecode.apiError.errorCode,
      message: state => state.phonecode.apiError.message,
    }),
    imageCodeHints() {
      const errors = [IMAGE_VERIFY_ERROR.errorCode];
      const isApiError = errors.indexOf(this.errorCode) !== -1;
      return isApiError ? IMAGE_VERIFY_ERROR.message : '';
    },
    cardNameHints() {
      const errors = [ES_CARRIER_NAME_OVER_LIMIT_ERROR.errorCode];
      const isApiError = errors.indexOf(this.errorCode) !== -1;
      return isApiError ? ES_CARRIER_NAME_OVER_LIMIT_ERROR.message : '';
    },
    isNext() {
      return (
        this.cardName !== ''
        && this.imagecode !== ''
        && this.verifyCodeImage !== ''
      );
    },
  },
  created() {
    this.initApiError();
    this.cardName = textLen(this.carrierName, 20);
    this.fetchVerifyCodeImage();
  },
  mounted() {
    sendMixpanel('eReceipt_cardSetup_Info_view');
  },
  methods: {
    ...mapActions('phonecode', ['getVerifyCodeImage', 'editInclusion']),
    ...mapMutations('phonecode', ['initApiError', 'fetchState']),
    async fetchVerifyCodeImage() {
      this.isLoadVerifyCodeImage = true;
      await this.getVerifyCodeImage();
      this.isLoadVerifyCodeImage = false;
    },
    onRefresh() {
      this.fetchVerifyCodeImage();
    },
    onCardName(value) {
      return textLen(value, 20, '');
    },
    async onSubmit() {
      await this.editInclusion();
      if (this.errorCode === '') {
        sendMixpanel('eReceipt_cardSetup_Info_button', {
          tag: 'success',
        });
        this.$router.push(routePath.PHONECODE_SUCCESS);
      } else {
        sendMixpanel('eReceipt_cardSetup_Info_button', {
          tag: this.message,
        });
      }
    },
    onBlurInput(dom) {
      if (this.os.isIos) {
        const element = document.getElementById(dom);
        window.scrollTo(0, element.offsetTop);
      }
    },
  },
  components: {
    FormGroupInput,
  },
  watch: {
    cardName(value) {
      this.fetchState({
        key: 'carrierName',
        value,
      });
    },
    imagecode(value) {
      this.fetchState({
        key: 'imageCode',
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

  .imgageCode {
    padding-top: convertUnit(28);

    &__photo {
      padding: 0;
      background-color: $gray-color;

      .loading {
        transform: translateY(#{convertUnit(14)});
      }

      .code {
        width: 100%;
        height: convertUnit(39);
        display: block;
      }

      .text {
        padding-top: convertUnit(6);
        display: inline-block;
      }
    }
  }

  .refreshBtn {
    font-size: convertUnit(32);
    padding-top: convertUnit(3);
    padding-bottom: convertUnit(3);
    display: inline-block;
    vertical-align: top;
  }

  .footer {
    margin-bottom: $space;
  }
}
</style>

