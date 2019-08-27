<template lang="pug">
  section.introduction
    .introduction__photo
      .introduction__photostage(:class="step1Class")
        .cell
        .glasses
        .stars.stars-v1
      .introduction__photostage(:class="step2Class")
        .id
        .credit
        .stars.stars-v2
      .introduction__photostage(:class="step3Class")
        .creditgroup
          .creditgroup__invoice.bg
          .creditgroup__card1.bg
          .creditgroup__card2.bg
          .creditgroup__card3.bg
        .stars.stars-v3
    .introduction__main.text-center.footerSpace
      .introduction__mainstage(:class="step1Class")
        h3.text-primary 發票一目瞭然
        p.text 完成設定，信用卡就可以存發票！
      .introduction__mainstage.step2(:class="step2Class")
        h3.text-primary 我要怎麼做？
        p.text
          |申請手機條碼與綁定載具
          br
          |比你想像更簡單！
      .introduction__mainstage.step3(:class="step3Class")
        h3.text-primary 綁定信用卡當載具
        p.text
          |發票存在信用卡
          br
          |妥善保存好環保
    .section__footer.columns
      button.btn.btn-submit.column.col-12(
        @click="onClickHandler"
      ) {{ submitBtn }}
</template>

<script>
import * as routePath from '@/constant/routePath';
import { mapState, mapMutations } from 'vuex';
import { getStepClass, sendMixpanel } from '@/helpers/unit';

export default {
  name: 'Introduction_Index',
  data() {
    return {};
  },
  computed: {
    ...mapState({
      prevStep: state => state.introduction.prevStep,
      step: state => state.introduction.step,
    }),
    step1Class() {
      return getStepClass(this.step, this.prevStep, 1);
    },
    step2Class() {
      return getStepClass(this.step, this.prevStep, 2);
    },
    step3Class() {
      return {
        active: this.step === 3,
      };
    },
    submitBtn() {
      return this.$route.params.step === '3' ? '開始綁定' : '下一步';
    },
  },
  mounted() {
    sendMixpanel('eReceipt_setup_instruction1');
    this.fetchState({
      key: 'step',
      value: this.$route.params.step * 1,
    });
  },
  methods: {
    ...mapMutations('introduction', ['fetchState']),
    onClickHandler() {
      switch (this.step) {
        case 1:
          this.$router.push(`${routePath.INTRODUCTION}/2`);
          break;
        case 2:
          this.$router.push(`${routePath.INTRODUCTION}/3`);
          break;
        case 3:
          sendMixpanel('eReceipt_setup_start_button');
          this.$router.push(routePath.AGREEMENT);
          break;
        default:
          this.$router.push(`${routePath.INTRODUCTION}/1`);
          break;
      }
    },
  },
  watch: {
    $route(to, from) {
      const step = to.params.step * 1;
      const prevStep = from.params.step * 1;

      this.fetchState({
        key: 'step',
        value: step,
      });
      this.fetchState({
        key: 'prevStep',
        value: prevStep,
      });
      sendMixpanel(`eReceipt_setup_instruction${step}`);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/variables";

.introduction {
  width: 100%;
  height: 100%;
  overflow: hidden;
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

      &-v2 {
        width: convertUnit(210);
        height: convertUnit(210);
        left: convertUnit(40);
        top: convertUnit(40);
        background-image: url(~@/assets/images/intro_step2_stars.png);
      }
      &-v3 {
        width: convertUnit(233);
        height: convertUnit(200);
        left: convertUnit(30);
        top: convertUnit(50);
        background-image: url(~@/assets/images/intro_step3_stars.png);
      }
    }

    .id {
      position: absolute;
      width: convertUnit(123);
      height: convertUnit(105);
      left: convertUnit(88);
      top: convertUnit(60);
      background-image: url(~@/assets/images/intro_step2_id.png);
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
      z-index: 1;
    }

    .credit {
      position: absolute;
      width: convertUnit(114);
      height: convertUnit(101);
      left: convertUnit(138);
      top: convertUnit(130);
      background-image: url(~@/assets/images/intro_step2_credit.png);
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
      z-index: 1;
    }

    .creditgroup {
      position: absolute;
      top: convertUnit(96);
      left: convertUnit(67);
      z-index: 1;

      .bg {
        position: absolute;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
      }

      &__invoice {
        width: convertUnit(96);
        height: convertUnit(114);
        left: convertUnit(62);
        top: convertUnit(-6);
        background-image: url(~@/assets/images/intro_step3_invoice.png);
        z-index: 3;
      }
      &__card1 {
        width: convertUnit(146);
        height: convertUnit(91);
        left: convertUnit(30);
        top: convertUnit(0);
        background-image: url(~@/assets/images/intro_step3_asiaCard.png);
        z-index: 0;
      }
      &__card2 {
        width: convertUnit(146);
        height: convertUnit(91);
        left: convertUnit(10);
        top: convertUnit(14);
        background-image: url(~@/assets/images/intro_step3_kokoCard.png);
        z-index: 1;
      }
      &__card3 {
        width: convertUnit(146);
        height: convertUnit(91);
        left: convertUnit(0);
        top: convertUnit(30);
        background-image: url(~@/assets/images/intro_step3_costcoCard.png);
        z-index: 2;
      }
    }
  }
  &__main {
    position: relative;
  }

  h3 {
    margin-bottom: convertUnit(10);
  }

  &__photostage {
    * {
      transform: translate(100%, 0);
      opacity: 0;
    }

    &.active {
      .cell {
        transform: translate(0, 0);
        opacity: 1;
      }
      .glasses {
        animation: glasses .8s 1 forwards;
        @keyframes glasses {
          0%{
            transform: translate(30%, 0);
            opacity: 0;
          }
          20% {
            transform: translate(-5%, 0);
            opacity: 1;
          }
          40% {
            transform: translate(5%, 0);
            opacity: 1;
          }
          60% {
            transform: translate(-2%, 0);
            opacity: 1;
          }
          80% {
            transform: translate(2%, 0);
            opacity: 1;
          }
          100%{
            transform: translate(0, 0);
            opacity: 1;
          }
        }
      }
      .id {
        animation: id 1s 1 forwards;
        @keyframes id {
          0%{
            transform: translate(100%, 0);
            opacity: 0;
          }
          30% {
            transform: translate(-25%, 0);
            opacity: 1;
          }
          60% {
            transform: translate(5%, 0);
            opacity: 1;
          }
          90% {
            transform: translate(-2%, 0);
            opacity: 1;
          }
          100%{
            transform: translate(0, 0);
            opacity: 1;
          }
        }
      }
      .credit {
        animation: credit 1s .1s 1 forwards;
        @keyframes credit {
          0%{
            transform: translate(100%, 0) rotateZ(0deg);
            opacity: 0;
          }
          35% {
            transform: translate(-15%, 0) rotateZ(-2deg);
            opacity: 1;
          }
          75% {
            transform: translate(2%, 0) rotateZ(1deg);
            opacity: 1;
          }
          100%{
            transform: translate(0, 0) rotateZ(0deg);
            opacity: 1;
          }
        }
      }
      .creditgroup {
        transform: translate(0, 0);
        opacity: 1;

        &__invoice {
          animation: creditgroup__invoice .8s 1 forwards;
          @keyframes creditgroup__invoice {
            0%{
              transform: translate(100%, 0);
              opacity: 0;
            }
            20% {
              transform: translate(-15%, 0);
              opacity: 1;
            }
            40% {
              transform: translate(10%, 0);
              opacity: 1;
            }
            60% {
              transform: translate(-5%, 0);
              opacity: 1;
            }
            80% {
              transform: translate(2%, 0);
              opacity: 1;
            }
            100%{
              transform: translate(0, 0);
              opacity: 1;
            }
          }
        }
        &__card1 {
          animation: creditgroup__card1 .8s 1 forwards;
          @keyframes creditgroup__card1 {
            0%{
              transform: translate(110%, 0);
              opacity: 0;
            }
            20% {
              transform: translate(-5%, 0);
              opacity: 1;
            }
            40% {
              transform: translate(20%, 0);
              opacity: 1;
            }
            60% {
              transform: translate(-10%, 0);
              opacity: 1;
            }
            80% {
              transform: translate(5%, 0);
              opacity: 1;
            }
            100%{
              transform: translate(0, 0);
              opacity: 1;
            }
          }
        }
        &__card2 {
          animation: creditgroup__card2 .8s 1 forwards;
          @keyframes creditgroup__card2 {
            0%{
              transform: translate(100%, 0);
              opacity: 0;
            }
            20% {
              transform: translate(-15%, 0);
              opacity: 1;
            }
            40% {
              transform: translate(10%, 0);
              opacity: 1;
            }
            60% {
              transform: translate(-5%, 0);
              opacity: 1;
            }
            80% {
              transform: translate(2%, 0);
              opacity: 1;
            }
            100%{
              transform: translate(0, 0);
              opacity: 1;
            }
          }
        }
        &__card3 {
          animation: creditgroup__card3 .8s 1 forwards;
          @keyframes creditgroup__card3 {
            0%{
              transform: translate(90%, 0);
              opacity: 0;
            }
            20% {
              transform: translate(-25%, 0);
              opacity: 1;
            }
            40% {
              transform: translate(5%, 0);
              opacity: 1;
            }
            60% {
              transform: translate(-5%, 0);
              opacity: 1;
            }
            80% {
              transform: translate(2%, 0);
              opacity: 1;
            }
            100%{
              transform: translate(0, 0);
              opacity: 1;
            }
          }
        }
      }
    }

    &.afterActive {
      .cell {
        animation: fadeOut .3s 1 forwards;
      }
      .glasses {
        animation: fadeOut .3s 1 forwards;
      }
      .id {
        animation: fadeOut .3s 1 forwards;
      }
      .credit {
        animation: fadeOut .3s 1 forwards;
      }
      @keyframes fadeOut {
        0%{
          transform: translate(0, 0);
          opacity: 1;
        }
        100%{
          transform: translate(-200%, 0);
          opacity: 0;
        }
      }
    }

    &.prevActive {
      * {
        transform: translate(-100%, 0);
        opacity: 0;
      }
      .cell {
        animation: cellprev .4s 1 forwards;
        @keyframes cellprev {
          0%{
            transform: translate(-100%, 0);
            opacity: 0;
          }
          100%{
            transform: translate(0, 0);
            opacity: 1;
          }
        }
      }
      .glasses {
        animation: glassesprev .8s .1s 1 forwards;
        @keyframes glassesprev {
          0%{
            transform: translate(-100%, 0);
            opacity: 0;
          }
          20% {
            transform: translate(5%, 0);
            opacity: 1;
          }
          40% {
            transform: translate(-5%, 0);
            opacity: 1;
          }
          60% {
            transform: translate(2%, 0);
            opacity: 1;
          }
          80% {
            transform: translate(-2%, 0);
            opacity: 1;
          }
          100%{
            transform: translate(0, 0);
            opacity: 1;
          }
        }
      }
      .id {
        animation: idprev 1s 1 forwards;
        @keyframes idprev {
          0%{
            transform: translate(-100%, 0);
            opacity: 0;
          }
          30% {
            transform: translate(25%, 0);
            opacity: 1;
          }
          60% {
            transform: translate(-5%, 0);
            opacity: 1;
          }
          90% {
            transform: translate(2%, 0);
            opacity: 1;
          }
          100%{
            transform: translate(0, 0);
            opacity: 1;
          }
        }
      }
      .credit {
        animation: creditprev 1s .1s 1 forwards;
        @keyframes creditprev {
          0%{
            transform: translate(-100%, 0) rotateZ(0deg);
            opacity: 0;
          }
          35% {
            transform: translate(15%, 0) rotateZ(-2deg);
            opacity: 1;
          }
          75% {
            transform: translate(-2%, 0) rotateZ(1deg);
            opacity: 1;
          }
          100%{
            transform: translate(0, 0) rotateZ(0deg);
            opacity: 1;
          }
        }
      }
      .creditgroup {
        transform: translate(0, 0);
        opacity: 1;

        &__invoice {
          animation: creditgroup__invoice .8s 1 forwards;
          @keyframes creditgroup__invoice {
            0%{
              transform: translate(100%, 0);
              opacity: 0;
            }
            20% {
              transform: translate(-15%, 0);
              opacity: 1;
            }
            40% {
              transform: translate(10%, 0);
              opacity: 1;
            }
            60% {
              transform: translate(-5%, 0);
              opacity: 1;
            }
            80% {
              transform: translate(2%, 0);
              opacity: 1;
            }
            100%{
              transform: translate(0, 0);
              opacity: 1;
            }
          }
        }
        &__card1 {
          animation: creditgroup__card1 .8s 1 forwards;
          @keyframes creditgroup__card1 {
            0%{
              transform: translate(110%, 0);
              opacity: 0;
            }
            20% {
              transform: translate(-5%, 0);
              opacity: 1;
            }
            40% {
              transform: translate(20%, 0);
              opacity: 1;
            }
            60% {
              transform: translate(-10%, 0);
              opacity: 1;
            }
            80% {
              transform: translate(5%, 0);
              opacity: 1;
            }
            100%{
              transform: translate(0, 0);
              opacity: 1;
            }
          }
        }
        &__card2 {
          animation: creditgroup__card2 .8s 1 forwards;
          @keyframes creditgroup__card2 {
            0%{
              transform: translate(100%, 0);
              opacity: 0;
            }
            20% {
              transform: translate(-15%, 0);
              opacity: 1;
            }
            40% {
              transform: translate(10%, 0);
              opacity: 1;
            }
            60% {
              transform: translate(-5%, 0);
              opacity: 1;
            }
            80% {
              transform: translate(2%, 0);
              opacity: 1;
            }
            100%{
              transform: translate(0, 0);
              opacity: 1;
            }
          }
        }
        &__card3 {
          animation: creditgroup__card3 .8s 1 forwards;
          @keyframes creditgroup__card3 {
            0%{
              transform: translate(90%, 0);
              opacity: 0;
            }
            20% {
              transform: translate(-25%, 0);
              opacity: 1;
            }
            40% {
              transform: translate(5%, 0);
              opacity: 1;
            }
            60% {
              transform: translate(-5%, 0);
              opacity: 1;
            }
            80% {
              transform: translate(2%, 0);
              opacity: 1;
            }
            100%{
              transform: translate(0, 0);
              opacity: 1;
            }
          }
        }
      }
    }

    &.active, &.prevActive {
      .stars-v1 {
        animation: stars 0.3s 1 forwards;
      }
      .stars-v2 {
        animation: stars 0.3s .3s 1 forwards;
      }
      .stars-v3 {
        animation: stars 0.3s .3s 1 forwards;
      }
      @keyframes stars {
        0%{
          transform: translate(0, 0);
          opacity: 0;
        }
        100%{
          transform: translate(0, 0);
          opacity: 1;
        }
      }
    }
  }
  &__mainstage {
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;

    * {
      opacity: 0;
    }

    &.active {
      h3 {
        animation: fadeIn .3s 1 forwards;
      }
      p.text {
        animation: fadeIn .3s .1s 1 forwards;
      }

      &.step2 {
        h3 {
          animation: fadeIn .3s .3s 1 forwards;
        }
        p.text {
          animation: fadeIn .3s .4s 1 forwards;
        }
      }
      &.step3 {
        h3 {
          animation: moveToFadeIn .6s .1s 1 forwards;
        }
        p.text {
          animation: moveToFadeIn .6s .1s 1 forwards;
        }
      }
    }
    &.afterActive {
      h3 {
        animation: moveToFadeOut .3s 1 forwards;
      }
      p.text {
        animation: moveToFadeOut .3s .1s 1 forwards;
      }
    }
    &.prevActive {
      h3 {
        animation: moveToFadeInprev .3s 1 forwards;
      }
      p.text {
        animation: moveToFadeInprev .3s .1s 1 forwards;
      }
    }
    @keyframes fadeIn {
      0%{
        opacity: 0;
      }
      100%{
        opacity: 1;
      }
    }
    @keyframes moveToFadeIn {
      0%{
        transform: translate(90%, 0);
        opacity: 0;
      }
      20% {
        transform: translate(-10%, 0);
        opacity: 1;
      }
      40% {
        transform: translate(5%, 0);
        opacity: 1;
      }
      60% {
        transform: translate(-5%, 0);
        opacity: 1;
      }
      80% {
        transform: translate(2%, 0);
        opacity: 1;
      }
      100%{
        transform: translate(0, 0);
        opacity: 1;
      }
    }
    @keyframes moveToFadeOut {
      0%{
        transform: translate(0, 0);
        opacity: 1;
      }
      100%{
        transform: translate(-100%, 0);
        opacity: 0;
      }
    }
    @keyframes moveToFadeInprev {
      0%{
        transform: translate(-100%, 0);
        opacity: 0;
      }
      100%{
        transform: translate(0, 0);
        opacity: 1;
      }
    }
  }
}
</style>

