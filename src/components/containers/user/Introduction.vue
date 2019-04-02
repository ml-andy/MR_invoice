<template lang="pug">
  section.introduction
    template(v-if="step === 1")
      .introduction__photo
        .cell
        .glasses
        .stars
      .introduction__main.text-center
        h3.text-primary 發票一目瞭然
        p.text 完成設定，信用卡就可以存發票！
      .introduction__footer.columns
        button.btn.btn-submit.column.col-12(
          @click="onClickHandler"
        ) 下一步
    template(v-if="step === 2")
      .introduction__photo
        .cell
        .glasses
        .stars
      .introduction__main.text-center
        h3.text-primary 我要怎麼做？
        p.text
          |申請手機條碼與綁定載具
          br
          |比你想像更簡單！
      .introduction__footer.columns
        button.btn.btn-submit.column.col-12(
          @click="onClickHandler"
        ) 下一步
    template(v-if="step === 3")
      .introduction__photo
        .cell
        .glasses
        .stars
      .introduction__main.text-center
        h3.text-primary 綁定信用卡當載具
        p.text
          |發票存在信用卡
          br
          |妥善保存好環保
      .introduction__footer.columns
        button.btn.btn-submit.column.col-12(
          @click="onClickHandler"
        ) 開始綁定

</template>

<script>
export default {
  name: 'Step1',
  props: {
    step: Number,
  },
  methods: {
    onClickHandler() {
      console.log('next');
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../style/variables";

.introduction {
  padding: 0 $space;

  &__photo {
    height: convertUnit(300);
    margin-bottom: convertUnit(6);
  }
  h3 {
    margin-bottom: convertUnit(10);
  }
  &__footer {
    position: fixed;
    width: calc(100% - #{$space * 2});
    left: $space;
    bottom: $space;
    margin: 0;
    z-index: 1;
  }
}
</style>

