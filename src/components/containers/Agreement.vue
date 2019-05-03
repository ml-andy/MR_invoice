<template lang="pug">
  section.agreement.stepbarSpace
    .section__header
      h3.text-primary.text-center 「綁定發票載具」同意條款
    .section__main.footerSpace.text
      |本人同意貴公司為提供「國泰優惠APP」會員查詢消費明細、發票兌獎而綁定發票載具等目的，得蒐集、
      |處理及利用本人之個人資料（包括但不限於姓名、身分證統一編號、手機、E-mail、信用卡帳號、發票明細）。
      |（註：您若未能提供相關個人資料時，將可能無法獲得「國泰優惠APP」提供查詢消費明細、發票兌獎等相關服務
      |及資訊，敬請諒察）。
      |本人同意貴公司為提供「國泰優惠APP」會員查詢消費明細、發票兌獎而綁定發票載具等目的，得蒐集、
      |處理及利用本人之個人資料（包括但不限於姓名、身分證統一編號、手機、E-mail、信用卡帳號、發票明細）。
      |（註：您若未能提供相關個人資料時，將可能無法獲得「國泰優惠APP」提供查詢消費明細、發票兌獎等相關服務
      |及資訊，敬請諒察）。
      |本人同意貴公司為提供「國泰優惠APP」會員查詢消費明細、發票兌獎而綁定發票載具等目的，得蒐集、
      |處理及利用本人之個人資料（包括但不限於姓名、身分證統一編號、手機、E-mail、信用卡帳號、發票明細）。
      |（註：您若未能提供相關個人資料時，將可能無法獲得「國泰優惠APP」提供查詢消費明細、發票兌獎等相關服務
      |及資訊，敬請諒察）。
      |本人同意貴公司為提供「國泰優惠APP」會員查詢消費明細、發票兌獎而綁定發票載具等目的，得蒐集、
      |處理及利用本人之個人資料（包括但不限於姓名、身分證統一編號、手機、E-mail、信用卡帳號、發票明細）。
      |（註：您若未能提供相關個人資料時，將可能無法獲得「國泰優惠APP」提供查詢消費明細、發票兌獎等相關服務
      |及資訊，敬請諒察）。

    .section__footer.columns
      button.btn.btn-submit.column.col-12(
        @click="onAgree"
        :disabled="!isNext"
      ) 我同意上述條款

</template>

<script>
import * as routePath from '@/constant/routePath';
import { sendMixpanel } from '@/helpers/unit';
// import { isScrollEnd } from '@/helpers/unit';

export default {
  name: 'Agreement',
  data() {
    return {
      isNext: true,
    };
  },
  mounted() {
    // window.onscroll = this.onWindowScroll;
    // this.onWindowScroll();
    sendMixpanel('eReceipt_agreement_view');
  },
  // beforeDestroy() {
  //   window.onscroll = null;
  // },
  methods: {
    // onWindowScroll() {
    //   const {
    //     scrollTop,
    //     scrollHeight,
    //     clientHeight,
    //   } = document.documentElement;
    //   this.isNext = isScrollEnd(scrollTop, clientHeight, scrollHeight);
    // },
    onAgree() {
      sendMixpanel('eReceipt_agreement_agree');
      this.$router.push(routePath.PHONECODE);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/variables";

.agreement {
  padding-left: #{convertUnit(30)};
  padding-right: #{convertUnit(30)};

  .section__footer {
    width: 100%;
    left: 0;
    bottom: 0;
    padding: #{convertUnit(10)} $space;
    background-color: $light-color;
    box-shadow: 0 1px 4px rgba(0,0,0,0.5);
  }
}
</style>

