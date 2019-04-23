<template lang="pug">
  section.phonecode.stepbarSpace
    .section__header
      h3.text-primary.text-center 綁定發票載具
    .section__main.footerSpace
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
        FormGroupInput(
          label="載具名稱"
          type="text"
          v-model="cardName"
        )
        .columns
          .column.col-6
            FormGroupInput(
              label="圖形驗證碼"
              type="text"
              placeholder="必填"
              v-model="imagecode"
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
    .section__footer.columns
      button.btn.btn-submit.column.col-12(
        :disabled="!isNext"
        @click="onSubmit"
      ) 確認
</template>

<script>
import * as routePath from '@/constant/routePath';
import { mapState, mapActions, mapMutations } from 'vuex';
import FormGroupInput from '@/components/units/FormGroupInput';

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
      cardNumber: state => state.app.basicInfo.cardNumber,
      userId: state => state.app.basicInfo.id,
      birth: state => state.app.basicInfo.birth,
      carrierName: state => state.phonecode.carrierName,
      verifyCodeImage: state => state.phonecode.verifyCodeImage,
      errorCode: state => state.phonecode.apiError.errorCode,
    }),
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
    this.cardName = this.carrierName;
    this.fetchVerifyCodeImage();
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
    async onSubmit() {
      await this.editInclusion();
      if (this.errorCode !== '') return;
      this.$router.push(routePath.PHONECODE_SUCCESS);
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
}
</style>

