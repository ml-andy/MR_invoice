<template lang="pug">
  section.phonecode.stepbarSpace
    Modals(
      :active="isSuccess"
      :isCanClose="false"
      contentTextAlign="left"
    )
      template(slot="header") 注意事項
      template(slot="body")
        |請至Email信箱，收取財政部發送的「電子信箱驗證信」，如未完成驗證將無法使用「忘記驗證碼」！
      template(slot="footer")
        button(
          class="btn btn-submit btn-block btn-sm"
          @click="onSuccessModal"
        ) 知道了
    .section__header
      h3.text-primary.text-center 請輸入財政部發送的簡訊驗證碼
    .section__main
      form
        .form-group
          .form-label(for="confirm") 驗證碼
          input#confirm.form-input(
            type="text"
            placeholder="必填"
          )
      p.text-sm
        |請輸入財政部發送之簡訊驗證碼(4碼)。若您未收到簡訊驗證碼，請聯繫財政部電子發票平台，0800-521-988。
    .section__footer.columns
      button.btn.btn-submit.column.col-12(
        :disabled="!isNext"
        @click="onSubmit"
      ) 送出
</template>

<script>
import * as routePath from '@/constant/routePath';
import Modals from '@/components/units/Modals';

export default {
  name: 'phonecodeComfirm',
  data() {
    return {
      isSuccess: false,
      isNext: true,
    };
  },
  methods: {
    onSubmit() {
      this.isSuccess = true;
    },
    onSuccessModal() {
      this.$router.push(routePath.PHONECODE_BIND);
    },
  },
  components: {
    Modals,
  },
};
</script>

<style lang="scss" scoped>
@import "../../../style/variables";

.phonecode {
  padding-left: $space;
  padding-right: $space;

  .subbtn {
    margin-bottom: convertUnit(20);
  }
}
</style>

