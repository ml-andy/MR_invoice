<template lang="pug">
  section.phonecode.stepbarSpace
    .section__header
      h3.text-primary.text-center 綁定發票載具
    .section__main.footerSpace
      form
        .form-group
          .form-label(for="cardtype") 載具類別
          input#cardtype.form-input(
            type="text"
            value="信用卡/金融卡"
            disabled
          )
        .form-group
          .form-label(for="cardNumber") 卡片號碼
          input#cardNumber.form-input(
            type="text"
            value="************1234"
            disabled
          )
        .form-group
          .columns
            .column.col-6
              .form-label(for="cardNumber") 身分證末四碼
              input#cardNumber.form-input(
                type="text"
                value="1212"
                disabled
              )
            .column.col-6
              .form-label(for="cardNumber") 生日末四碼
              input#cardNumber.form-input(
                type="text"
                value="1212"
                disabled
              )
        .form-group
          .form-label(for="cardName") 載具名稱
          input#cardName.form-input(
            type="text"
            value="信用卡-Costco 聯名卡"
          )
        .form-group
          .form-label(for="code") 圖形驗證碼
          .columns
            .column.col-6
              input#code.form-input(
                type="text"
                placeholder="必填"
              )
            .column.col-6
                img.code(src="~@/assets/images/bind_code.jpg")
    .section__footer.columns
      button.btn.btn-submit.column.col-12(
        :disabled="!isNext"
        @click="onSubmit"
      ) 確認
</template>

<script>
import * as routePath from '@/constant/routePath';

export default {
  name: 'phonecodeBind',
  data() {
    return {
      isNext: true,
    };
  },
  methods: {
    onSubmit() {
      this.$router.push(routePath.PHONECODE_SUCCESS);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../style/variables";

.phonecode {
  padding-left: $space;
  padding-right: $space;

  .code {
    width: 100%;
    height: convertUnit(38);
  }
}
</style>

