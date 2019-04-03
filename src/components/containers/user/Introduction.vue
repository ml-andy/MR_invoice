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
      switch (this.step) {
        case 1:
          this.$router.push('/user/introduction/step2');
          break;
        case 2:
          this.$router.push('/user/introduction/step3');
          break;
        case 3:
          this.$router.push('/user/agreement');
          break;
        default:
          this.$router.push('/user/introduction/step1');
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../style/variables";

.introduction {
  padding: 0 $space;

  &__photo {
    position: relative;
    height: convertUnit(300);
    margin-bottom: convertUnit(6);
    background-image: url(~@/assets/images/intro_step1_bg.png);
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;

    .cell {
      position: absolute;
      width: convertUnit(89);
      height: convertUnit(181);
      left: convertUnit(100);
      top: convertUnit(53);
      background-image: url(~@/assets/images/intro_step1_cell.png);
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
      z-index: 1;
    }

    .glasses {
      position: absolute;
      width: convertUnit(126);
      height: convertUnit(132);
      left: convertUnit(111);
      top: convertUnit(102);
      background-image: url(~@/assets/images/intro_step1_glasses.png);
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
      z-index: 1;
    }

    .stars {
      position: absolute;
      width: convertUnit(210);
      height: convertUnit(157);
      left: convertUnit(37);
      top: convertUnit(79);
      background-image: url(~@/assets/images/intro_step1_stars.png);
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
      z-index: 0;
    }
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

